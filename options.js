window.addEventListener('load', function (evt) {
  $('#members-checkbox').on('click', toggle);
  $('#labels-checkbox').on('click', toggle);
  $('#stickers-checkbox').on('click', toggle);
  $('#badges-checkbox').on('click', toggle);
  $('#cover-images-checkbox').on('click', toggle);

  $('#clear').on('click', clearStorage);
});

function getInitialSettings() {
  var baseSettings = {
    members: {
      selector: '.list-card-members'
    },
    labels: {
      selector: '.list-card-labels'
    },
    stickers: {
      selector: '.list-card-stickers-area'
    },
    badges: {
      selector: '.badges'
    },
    "cover-images": {
      selector: '.list-card-cover'
    }
  }

  for(var key in baseSettings) {
    var setting = baseSettings[key];
    setting.isChecked = true;
  }

  return baseSettings;
}

setupOptions();

function clearStorage() {
  chrome.storage.sync.clear();
  setupOptions();
  // $('input[type="checkbox"]').each((i, elem) => {
  //   $(elem).prop('checked', true);
  // })
}

function toggle() {
  var $elem = $(this);
  var selector = $elem.attr('data-selector');
  var isChecked = $elem.prop('checked');

  sendToggleMessage({
    name: $elem.attr('name'),
    isChecked: isChecked,
    selector: selector
  }, true);
}

function sendToggleMessage(message, saveToStorage) {
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, message, function(response) {
      if (saveToStorage) {
        chrome.storage.sync.set({
          [message.name]: {
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
    if (Object.keys(options).length === 0) {
      options = getInitialSettings();
      chrome.storage.sync.set(options, () => {})
    }

    for (var key in options) {
      $(`#${key}-checkbox`).prop('checked', options[key].isChecked);
      sendToggleMessage(createMessageFromStorage(options[key]), false);
    }
  });
}

function createMessageFromStorage(storageItem) {
  return { isChecked: storageItem.isChecked, selector: storageItem.selector };
}
