
function save_options() {
  var language = document.getElementById("language").value;
  
  chrome.storage.sync.set({language: language}, function(items) {
      // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved!';
        setTimeout(function() {
          status.textContent = '';
        }, 1500);
  });
}

function restore_options() {
  chrome.storage.sync.get("language", function(data) {
    console.log(data);
    document.getElementById("language").value = data.language;
  });
}

document.addEventListener("DOMContentLoaded", restore_options);
  
document.getElementById('save').addEventListener('click', save_options);