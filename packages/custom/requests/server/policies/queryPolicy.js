'use strict';

var acl = require('acl');
acl = new acl(new acl.memoryBackend());
var modelName = '';

exports.setModelName = function(mName) {
    modelName = mName;
};

exports.invokeRolesPolicies = function () {
    acl.allow([{
        roles: ['admin'],
            allows: [{
            resources: '/api/query/',
            permissions: '*'
        }, {
            resources: '/api/query/:queryId',
            permissions: '*'
        }]
    }, {
        roles: ['owner'],
        allows: [{
            resources: '/api/query/',
            permissions: ['get']
        }, {
            resources: '/api/query/:queryId',
            permissions: ['get']
        }]
    }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/query/',
            permissions: ['get']
        }, {
            resources: '/api/query/:queryId',
            permissions: ['get']
        }]
    }]);
};
exports.isConnectionAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];

    if(req.body.user === req.user) {
        return next();
    } else if(req.body.secondaryOwner && req.user){
        if (req.body.secondaryOwner.indexOf(req.user.username) !== -1) {
            return next();
        }
    }

    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err) {
            return res.status(500).send('Unexpected authorization error');
        } else {
            if (isAllowed) {
                return next();
            } else {
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
        }
    });
};

exports.isQueryAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];
    var connectionString = JSON.parse(req.body.connectionString);

    if(connectionString.user === req.user) {
        return next();
    }
    else if (connectionString.secondaryOwner && req.user) {
        if (connectionString.secondaryOwner.indexOf(req.user.username) !== -1) {
            return next();
        }
    }

    acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
        if (err) {
            return res.status(500).send('Unexpected authorization error');
        } else {
            if (isAllowed) {
                return next();
            } else {
                return res.status(403).json({
                    message: 'User is not authorized'
                });
            }
        }
    });
};

