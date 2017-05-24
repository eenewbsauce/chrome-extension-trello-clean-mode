chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {

    if (request.element === "members") {
      if (request.isChecked) {
        $('.list-card-members').hide();
      } else {
        $('.list-card-members').show();
      }
    }

    sendResponse({farewell: 'foo'})
});
