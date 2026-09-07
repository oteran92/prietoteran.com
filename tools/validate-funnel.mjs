#!/usr/bin/env node

/**
 * Validate the marketing funnel strategy and its connection to content sources.
 *
 * This keeps weekly content tied to commercial intent: every generated post
 * should know its funnel stage, pillar, buyer roles, objective, and next step.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const strategyPath = path.join(rootDir, 'content', 'marketing', 'funnel-strategy.json');
const supportedLocales = ['en', 'de', 'es'];
const failures = [];

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function loadStrategy() {
  assert(fs.existsSync(strategyPath), 'Missing content/marketing/funnel-strategy.json');
  if (!fs.existsSync(strategyPath)) {
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(strategyPath, 'utf8'));
  } catch (error) {
    failures.push(`Invalid funnel strategy JSON: ${error.message}`);
    return null;
  }
}

async function loadPost(postId) {
  const sourcePath = path.join(rootDir, 'content', 'blog', 'posts', `${postId}.mjs`);
  assert(fs.existsSync(sourcePath), `Missing content source for post: ${postId}`);
  if (!fs.existsSync(sourcePath)) {
    return null;
  }
  const module = await import(pathToFileURL(sourcePath));
  return module.default;
}

function validateStrategyShape(strategy) {
  assert(strategy.version, 'Funnel strategy missing version');
  assert(strategy.updated, 'Funnel strategy missing updated date');
  assert(strategy.positioning?.audience, 'Funnel strategy missing audience');
  assert(strategy.positioning?.primaryConversion, 'Funnel strategy missing primary conversion');

  for (const horizon of ['shortTerm', 'mediumTerm', 'longTerm']) {
    assert(strategy.timeHorizons?.[horizon]?.objective, `Funnel strategy missing ${horizon} objective`);
    assert(Array.isArray(strategy.timeHorizons?.[horizon]?.successSignals), `Funnel strategy missing ${horizon} success signals`);
  }

  for (const stage of ['awareness', 'diagnosis', 'consideration', 'conversion']) {
    assert(strategy.funnelStages?.[stage]?.purpose, `Funnel strategy missing ${stage} purpose`);
    assert(strategy.funnelStages?.[stage]?.readerQuestion, `Funnel strategy missing ${stage} reader question`);
  }

  assert(Object.keys(strategy.contentPillars || {}).length >= 4, 'Funnel strategy should define at least four content pillars');
  assert(strategy.weeklyContentPackage?.blog?.count === 1, 'Weekly package should define exactly one blog');
  assert(strategy.weeklyContentPackage?.linkedin?.count === 5, 'Weekly package should define exactly five LinkedIn drafts');
  assert(strategy.weeklyContentPackage?.linkedin?.distribution?.blogShare === 1, 'Weekly package should define exactly one LinkedIn blog share');
  assert(strategy.weeklyContentPackage?.images?.blogCovers === 1, 'Weekly package should define exactly one blog cover');
  assert(strategy.weeklyContentPackage?.images?.linkedinImages === 5, 'Weekly package should define exactly five LinkedIn images');
  for (const stage of ['awareness', 'diagnosis', 'consideration', 'conversion']) {
    assert(Array.isArray(strategy.measurement?.[stage]) && strategy.measurement[stage].length > 0, `Funnel strategy missing ${stage} measurements`);
  }
  assert(Array.isArray(strategy.rotationRules) && strategy.rotationRules.length > 0, 'Funnel strategy missing rotation rules');
}

function validatePostFunnel(post, strategy) {
  assert(post.funnel, `${post.id} missing funnel mapping`);
  if (!post.funnel) {
    return;
  }

  assert(strategy.funnelStages[post.funnel.stage], `${post.id} has unknown funnel stage: ${post.funnel.stage}`);
  assert(strategy.contentPillars[post.funnel.pillar], `${post.id} has unknown content pillar: ${post.funnel.pillar}`);
  assert(strategy.timeHorizons[post.funnel.timeHorizon], `${post.id} has unknown time horizon: ${post.funnel.timeHorizon}`);
  assert(post.funnel.businessObjective?.length > 20, `${post.id} needs a specific business objective`);
  assert(post.funnel.nextStep?.length > 20, `${post.id} needs a specific next step`);
  assert(Array.isArray(post.funnel.buyerRoles) && post.funnel.buyerRoles.length >= 3, `${post.id} should map to at least three buyer roles`);

  for (const locale of supportedLocales) {
    assert(post.locales?.[locale]?.title, `${post.id} missing ${locale} title`);
    assert(post.slugs?.[locale], `${post.id} missing ${locale} slug`);
  }

  const stagePurpose = strategy.funnelStages[post.funnel.stage]?.purpose?.toLowerCase() || '';
  const objective = post.funnel.businessObjective.toLowerCase();
  assert(objective.includes('leader') || objective.includes('buyer') || objective.includes('company'), `${post.id} objective should name the commercial audience`);
  assert(stagePurpose.length > 0, `${post.id} stage should have strategy purpose`);

  const drafts = post.linkedinDrafts || [];
  const linkedInStrategy = strategy.weeklyContentPackage.linkedin;
  assert(drafts.length === linkedInStrategy.count, `${post.id} should follow the weekly LinkedIn count`);

  const blogShares = drafts.filter((draft) => draft.type === 'blogShare');
  const standaloneDrafts = drafts.filter((draft) => draft.type === 'standalone');
  assert(blogShares.length === linkedInStrategy.distribution.blogShare, `${post.id} should follow the weekly blog-share count`);
  assert(standaloneDrafts.length === linkedInStrategy.count - linkedInStrategy.distribution.blogShare, `${post.id} should have four standalone LinkedIn drafts`);

  for (const draft of drafts) {
    assert(strategy.funnelStages[draft.funnel?.stage], `${post.id} ${draft.day} has unknown LinkedIn funnel stage`);
    assert(strategy.contentPillars[draft.funnel?.pillar], `${post.id} ${draft.day} has unknown LinkedIn content pillar`);
    assert(draft.funnel?.objective?.length > 20, `${post.id} ${draft.day} needs a specific LinkedIn objective`);
  }

  for (const stage of ['awareness', 'diagnosis', 'consideration']) {
    const actualCount = standaloneDrafts.filter((draft) => draft.funnel?.stage === stage).length;
    assert(actualCount === linkedInStrategy.distribution[stage], `${post.id} should have ${linkedInStrategy.distribution[stage]} standalone ${stage} LinkedIn draft(s)`);
  }

  for (const draft of blogShares) {
    assert(draft.funnel?.stage === post.funnel.stage, `${post.id} blog-share stage should match the weekly blog`);
    assert(draft.funnel?.pillar === post.funnel.pillar, `${post.id} blog-share pillar should match the weekly blog`);
  }
}

async function main() {
  const strategy = loadStrategy();
  if (!strategy) {
    console.error(failures.join('\n'));
    process.exit(1);
  }

  validateStrategyShape(strategy);

  const postIds = process.argv.slice(2);
  if (postIds.length === 0) {
    console.error('Usage: node tools/validate-funnel.mjs <post-id> [post-id...]');
    process.exit(1);
  }

  for (const postId of postIds) {
    const post = await loadPost(postId);
    if (post) {
      validatePostFunnel(post, strategy);
    }
  }

  if (failures.length > 0) {
    console.error(failures.join('\n'));
    process.exit(1);
  }

  console.log(`Funnel validation passed for ${postIds.join(', ')}`);
}

await main();
