const express = require('express');
const {getAddonsFromReq} = require("../utils/get-adddns-from-req");

const configuratorRouter = express.Router();

configuratorRouter
    .get('/select-base/:baseName', (req, res) => {
        const {baseName} = req.params;
        res
            .cookie('cookieBase', baseName)
            .render('configurator/base-selected', {
                baseName,
            });
    })

    .get('/add-addon/:addonName', (req, res) => {
        const {addonName} = req.params;
        const {cookieAddons} = req.cookies;

        const addons = getAddonsFromReq(req);
        addons.push(addonName);

        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/added', {
                addonName,
            });
    })
    .get('/delete-addon/:addonName', (req, res) => {
        const {addonName} = req.params;
        const {cookieAddons} = req.cookies;

        const addons = getAddonsFromReq(req).filter(addon => addon !== addonName)

        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/deleted', {
                addonName,
            });
    });


module.exports = {
    configuratorRouter,
};