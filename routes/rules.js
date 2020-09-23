const {authentication, adminAuth} = require('../middleware/authentication');
const ServicesRules               = require('../services/rules');
const NSErrors         = require('../utils/errors/NSErrors');

module.exports = function (app) {
    app.post('/v2/rules', listRules);
    app.post('/v2/rule', queryRule);
    app.put('/v2/rule', authentication, adminAuth, setRule);
    app.delete('/v2/rule/:_id', authentication, adminAuth, deleteRule);
    app.post('/v2/rules/testUser', authentication, adminAuth, testUser);
    app.post('/v2/rules/execRule', authentication, adminAuth, execRules);
};

async function listRules(req, res, next) {
    try {
        return res.json(await ServicesRules.listRules(req.body.PostBody));
    } catch (error) {
        next(error);
    }
}

async function queryRule(req, res, next) {
    try {
        return res.json(await ServicesRules.queryRule(req.body.PostBody));
    } catch (error) {
        next(error);
    }
}

async function deleteRule(req, res, next) {
    try {
        return res.json(await ServicesRules.deleteRule(req.params._id));
    } catch (error) {
        return next(error);
    }
}

async function setRule(req, res, next) {
    try {
        return res.json(await ServicesRules.setRule(req.body));
    } catch (error) {
        return next(error);
    }
}

async function testUser(req, res, next) {
    try {
        const result = await ServicesRules.testUser(req.body);
        return res.json(result);
    } catch (error) {
        return next(error);
    }
}

async function execRules(req, res, next) {
    try {
        if (!(['picto', 'category']).includes(req.body.type)) throw NSErrors.BadRequest;
        const result = await ServicesRules.execRules(req.body.type, req.body.products);
        return res.json(result);
    } catch (error) {
        return next(error);
    }
}
