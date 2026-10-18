/**
 * The repo root doubles as the static root, so internal files must be refused explicitly:
 * dot-folders (.cursor holds lead data), notes, server code and data exports.
 */
const PRIVATE_PATH = /(^|\/)\.|^\/(server\.js|chat\.txt|package(-lock)?\.json|vercel\.json|node_modules|tests|content|components)(\/|$)|\.(md|backup|csv|xlsx|zip|code-workspace)$/i;

function isPrivatePath(pathname) {
    let decoded;
    try { decoded = decodeURIComponent(pathname); } catch { return true; }
    return PRIVATE_PATH.test(decoded);
}

module.exports = { isPrivatePath };
