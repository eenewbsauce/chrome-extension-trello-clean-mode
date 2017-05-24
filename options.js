window.addEventListener('load', function (evt) {
  $('#member-checkbox').on('click', toggle);

  function toggle() {
    var isChecked = $(this).prop('checked');
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendMessage(tab.id, {element: 'members', isChecked: isChecked}, function(response) {
        console.log(response);

        // chrome.storage.sync.set({'members': isChecked});
      });
    });
  }
});
