chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {
        file: 'navigation-handler.js'
    });
}, {
    url: [{
        hostContains: '.trello.'
    }],
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
  	// 	file: 'dom.js'
  	// });
    //

    chrome.tabs.executeScript(request.tabId, {
        file: 'dom.js'
    });

    // chrome.tabs.getCurrent(function() {
    //   if (request.element === "hello") {
    //     $('.list-card-members').toggle()
    //   }
    // })


    // if (request.element === "hello") {
    //   $('.list-card-members').toggle()
    // }

    sendResponse({farewell: 'foo'})
  });
