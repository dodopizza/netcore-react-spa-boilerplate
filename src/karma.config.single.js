const getBaseConfig = require("./karma.config");

module.exports = function (config) {
    const currentConfig = getBaseConfig(config);

    config.set(currentConfig);
}