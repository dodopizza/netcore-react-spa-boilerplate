module.exports = {
    'Demo test Google' : function (browser) {
    browser
        .url('http://www.google.com')
        .waitForElementVisible('body', 1000)
        .setValue('input[type=text]', 'nightwatch')
        .waitForElementVisible('input.lsb', 1000)
        .click('input.lsb')
        .pause(1000)
        .assert.containsText('#main', 'Night Watch')
        .end();
    }
};