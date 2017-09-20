const getBaseConfig = require("./karma.config");

module.exports = function (config) {
    const base = getBaseConfig(config);

    const currentConfig = Object.assign({}, base, {
        autoWatch: true,
        singleRun: false
    });

    config.set(currentConfig);
}