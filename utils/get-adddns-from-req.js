function getAddonsFromReq(req) {
const {cookieBase, cookieAddons} = req.cookies;
return cookieAddons ? JSON.parse(cookieAddons) : [];
}

module.exports = {
    getAddonsFromReq,
}