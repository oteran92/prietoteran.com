import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import contact from '../lib/contact-submission.js';

test('attribution is bounded, allowlisted, escaped, and strips URL query data', () => {
    const normalized = contact.normalizeAttribution({
        utm_campaign: '<img src=x onerror=alert(1)>', utm_source: 'a'.repeat(300),
        landing_path: '/blog/article.html?email=private@example.com#secret',
        referrer_origin: 'https://example.com/private?token=secret',
        cta_id: 'hero', locale: 'es', email: 'private@example.com'
    });
    assert.equal(normalized.utm_source.length, 160);
    assert.equal(normalized.landing_path, '/blog/article.html');
    assert.equal(normalized.referrer_origin, 'https://example.com');
    assert.equal(normalized.email, undefined);
    const html = contact.renderAttribution(normalized);
    assert.ok(html.includes('&lt;img'));
    assert.ok(!html.includes('<img'));
    assert.deepEqual(contact.normalizeAttribution({cta_id:'untrusted',locale:'constructor',landing_path:'//external.com',referrer_origin:'javascript:alert(1)'}), {});
    assert.equal(contact.buildContactSubmission(null).ok, false);
});

function fixture(response, options = {}) {
    const events = [], handlers = {}, requests = [];
    let resets = 0;
    const elements = Object.fromEntries(['name','email','company','message'].map(key => [key,{value:key === 'email' ? 'private@example.com' : 'Private content'}]));
    const text = {hidden:false}, loading = {hidden:true};
    const button = {disabled:false,querySelector:s=>s==='.btn-text'?text:loading};
    const status = {textContent:'',dataset:{},focus(){}};
    const form = {elements,reportValidity:()=>true,querySelector:()=>button,addEventListener:(name,fn)=>handlers[name]=fn,setAttribute(){},removeAttribute(){},reset(){resets++;}};
    const context = {document:{getElementById:id=>id==='contactForm'?form:status},window:{i18n:{t:key=>key},contactAttribution:{get:()=>({cta_id:'hero',utm_campaign:'test'}),track:(name,data)=>events.push({name,data})}},AbortController,clearTimeout:()=>{},setTimeout:fn=>{if(options.timeout) fn();return 1;},fetch:async(url,request)=>{requests.push(JSON.parse(request.body));if(options.timeout) throw Object.assign(new Error('Timed out'),{name:'AbortError'});return response;}};
    vm.runInNewContext(readFileSync(new URL('../lib/contact-form.js',import.meta.url),'utf8'), context);
    return {events,handlers,requests,status,button,text,loading,get resets(){return resets;}};
}

for (const scenario of [
    {name:'confirmed success',ok:true,body:{success:true},success:true},
    {name:'HTTP error even when JSON says success',ok:false,body:{success:true}},
    {name:'rejected submission',ok:true,body:{success:false}},
    {name:'non-JSON server error',ok:false,invalid:true},
    {name:'request timeout',timeout:true}
]) test(`form handles ${scenario.name} without false conversions or losing failed input`, async () => {
    const fixtureData = fixture({ok:scenario.ok,json:async()=>{if(scenario.invalid) throw new SyntaxError();return scenario.body;}},scenario);
    await fixtureData.handlers.submit({preventDefault(){}});
    assert.equal(fixtureData.events.filter(e=>e.name==='contact_form_submit').length,scenario.success?1:0);
    assert.equal(fixtureData.resets,scenario.success?1:0);
    assert.equal(fixtureData.status.dataset.state,scenario.success?'success':'error');
    assert.equal(fixtureData.button.disabled,false);
    assert.equal(fixtureData.loading.hidden,true);
    assert.ok(!JSON.stringify(fixtureData.events).includes('private@example.com'));
    assert.equal(fixtureData.requests[0].attribution.cta_id,'hero');
    if(scenario.timeout) assert.equal(fixtureData.status.textContent,'form.timeout');
});

test('a second click while sending cannot submit twice',async()=>{
    let finish;
    const pending = new Promise(resolve=>finish=resolve);
    const data = fixture({ok:true,json:()=>pending});
    const first = data.handlers.submit({preventDefault(){}});
    await data.handlers.submit({preventDefault(){}});
    assert.equal(data.requests.length,1);
    finish({success:true});
    await first;
});

test('session attribution survives article to home navigation and storage denial', () => {
    const source = readFileSync(new URL('../lib/contact-attribution.js',import.meta.url),'utf8');
    let storage;
    const sessionStorage = {getItem:()=>storage,setItem:(_key,value)=>storage=value};
    function load(href, denied=false) {
        let listener;
        const context={URL,location:new URL(href),document:{referrer:'https://google.com/search?q=private',documentElement:{lang:'en'},addEventListener:(_name,fn)=>listener=fn},sessionStorage:denied?{getItem(){throw Error()},setItem(){throw Error()}}:sessionStorage,window:{}};
        vm.runInNewContext(source,context);
        return {data:context.window.contactAttribution,click:id=>listener({target:{closest:()=>({dataset:{contactCta:id}})}})};
    }
    const article=load('https://www.prietoteran.com/blog/article.html?utm_source=email&utm_campaign=audit');
    article.click('article-integration');
    const home=load('https://www.prietoteran.com/?lang=en#contact').data.get();
    assert.equal(home.utm_source,'email');
    assert.equal(home.cta_id,'article-integration');
    assert.equal(home.landing_path,'/blog/article.html');
    assert.equal(home.referrer_origin,'https://google.com');
    assert.equal(load('https://www.prietoteran.com/?utm_source=linkedin',true).data.get().utm_source,'linkedin');
});
