chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.element === "members") {
      $('.list-card-members').toggle()
    }

    // sendResponse({farewell: 'foo'})
});
