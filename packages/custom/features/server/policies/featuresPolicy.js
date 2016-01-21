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
            resources: '/api/features',
            permissions: '*'
        }, {
            resources: '/api/features/:featureId',
            permissions: '*'
        }]
    }, {
        roles: ['owner'],
        allows: [{
            resources: '/api/features',
            permissions: ['get', 'post']
        }, {
            resources: '/api/features/:featureId',
            permissions: ['get']
        }]
    }, {
        roles: ['guest'],
        allows: [{
            resources: '/api/features',
            permissions: ['get']
        }, {
            resources: '/api/features/:featureId',
            permissions: ['get']
        }]
    }]);
};
exports.isAllowed = function (req, res, next) {
    var roles = (req.user) ? req.user.roles : ['guest'];
    if (req.modelName && req.user) {
        if (req.modelName.user === req.user.username) {
            return next();
        } else {
            return res.status(403).json({
                message: 'User is not authorized'
            })
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
