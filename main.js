chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {
        file: 'navigation-handler.js'
    });
}, {
    url: [{
        // Runs on example.com, example.net, but also example.foo.com
        hostContains: '.aws.amazon.'
    }],
});