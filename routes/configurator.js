const express = require('express');
const {getAddonsFromReq} = require("../utils/get-adddns-from-req");
const {COOKIE_BASES, COOKIE_ADDONS} = require("../data/cookies-data");
const {response} = require("express");

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

        if (!COOKIE_ADDONS[addonName])
            return res.render('error', {
                description: `There is no such addon as ${addonName}.`,
            });



        const addons = getAddonsFromReq(req)

        if (addons.includes(addonName)) {
            return res.render('error', {
                description: `${addonName} is already on your cookie. You cannot add it twice`,
            })
        }
        addons.push(addonName)
        res
            .cookie('cookieAddons', JSON.stringify(addons))
            .render('configurator/deleted', {
                addonName,
            });
    });


module.exports = {
    configuratorRouter,
};