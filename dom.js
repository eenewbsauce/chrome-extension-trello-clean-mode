chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.element === "members") {
      if (request.isChecked) {
        $('.list-card-members').show();
      } else {
        $('.list-card-members').hide();
      }
    }

    sendResponse({farewell: 'foo'})
});
