window.addEventListener('load', function (evt) {
  setupOptions();

  $('#member-checkbox').on('click', toggle);
});

function toggle() {
  var $elem = $(this);
  var isChecked = $elem.prop('checked');
  sendToggleMessage({ element: $elem.attr('name'), isChecked: isChecked }, true);
}

function sendToggleMessage(message, saveToStorage) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, message, function(response) {
      if (saveToStorage) {
        chrome.storage.sync.set({ [message.element]: message.isChecked }, function() {});
      }
    });
  });
}

function setupOptions() {
  chrome.storage.sync.get(function(options) {
    if (typeof options.members !== 'undefined') {
      $('#member-checkbox').prop('checked', options.members);
      sendToggleMessage({ element: 'members', isChecked: options.members }, false);
    }
  });
}
