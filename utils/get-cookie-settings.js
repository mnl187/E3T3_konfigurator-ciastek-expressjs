import {getAddonsFromReq} from "./get-adddns-from-req";
import {handlebarsHelpers} from "./handlebars-helpers";
import {COOKIE_ADDONS, COOKIE_BASES} from "../data/cookies-data";

export function getCookieSettings(req) {

    const {cookieBase, cookieAddons} = req.cookies;

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