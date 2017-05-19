// Inject the payload.js script into the current tab after the popout has loaded
window.addEventListener('load', function (evt) {
  $('#member-checkbox').on('click', toggle);

  function toggle(option) {
    chrome.runtime.sendMessage({element: "hello"}, function(response) {
      console.log(response.farewell);
    });
  }
});







//
//
// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting === "hello")
//       toggle();
//   });
