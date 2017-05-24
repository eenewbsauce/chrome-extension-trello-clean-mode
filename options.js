window.addEventListener('load', function (evt) {
  $('#members-checkbox').on('click', toggle);
  $('#labels-checkbox').on('click', toggle);
  $('#stickers-checkbox').on('click', toggle);
  $('#badges-checkbox').on('click', toggle);
  $('#cover-images-checkbox').on('click', toggle);
  
  $('#clear').on('click', clearStorage);
});

setupOptions();

function clearStorage() {
  chrome.storage.sync.clear();
}

function toggle() {
  var $elem = $(this);
  var selector = $elem.attr('data-selector');
  var isChecked = $elem.prop('checked');

  sendToggleMessage({
    element: $elem.attr('name'),
    isChecked: isChecked,
    selector: selector
  }, true);
}

function sendToggleMessage(message, saveToStorage) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, message, function(response) {
      if (saveToStorage) {
        chrome.storage.sync.set({
          [message.element]: {
            name: message.element,
            isChecked: message.isChecked,
            selector: message.selector
          }
        }, function() {});
      }
    });
  });
}

function setupOptions() {
  chrome.storage.sync.get(function(options) {
    for (var key in options) {
      $(`#${key}-checkbox`).prop('checked', options[key].isChecked);
      sendToggleMessage(createMessageFromStorage(options[key]), false);
    }
  });
}

function createMessageFromStorage(storageItem) {
  return { element: storageItem.name, isChecked: storageItem.isChecked, selector: storageItem.selector };
}
