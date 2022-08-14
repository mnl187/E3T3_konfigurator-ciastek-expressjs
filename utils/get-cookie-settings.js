const {handlebarsHelpers} = require("./handlebars-helpers");
const {COOKIE_ADDONS, COOKIE_BASES} = require("../data/cookies-data");
const {getAddonsFromReq} = require("./get-adddns-from-req");

function getCookieSettings(req) {
    const {cookieBase} = req.cookies;

    const addons = getAddonsFromReq(req);

    const allBases = Object.entries(COOKIE_BASES);
    const allAddons = Object.entries(COOKIE_ADDONS);

    const sum = (cookieBase ? handlebarsHelpers.findPrice(allBases, cookieBase) : 0) + addons.reduce((prev, curr) => (
        prev + handlebarsHelpers.findPrice(allAddons, curr)
    ), 0);
    return {
        // selected stuff
        cookieBase,
        addons,
        // calculations
        sum,
        // all possibilities
        allAddons,
        allBases,
    };
}

module.exports = {
  getCookieSettings,
}