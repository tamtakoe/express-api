var glob = require('glob');

/**
 * @param {String} apiPath
 *
 * @returns {Object}
 */
module.exports = function(apiPath) {
    var apiRouters = {}, apiVersion, router;

    var routersFilesPaths = glob.sync(apiPath + '/**/routers/**/*.js');

    routersFilesPaths.forEach(function(routerFilePath) {
        apiVersion = routerFilePath.match(/\/(v\d+)\//)[1];
        if (!apiRouters[apiVersion]) {
            apiRouters[apiVersion] = [];
        }

        router = require(routerFilePath);
        apiRouters[apiVersion].push(router);
    });

    return apiRouters;
};
