
function save_options() {
  var target_language = document.getElementById("target_language").value;
  var source_language = document.getElementById("source_language").value;
  
  chrome.storage.sync.set({target_language: target_language, source_language:source_language}, function(items) {
      // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved!';
        setTimeout(function() {
          status.textContent = '';
        }, 1500);
  });
}

function restore_options() {
  chrome.storage.sync.get(["target_language", "source_language"], function(data) {
    console.log(data);
    if(data.source_language) {
      document.getElementById("source_language").value = data.source_language;
    }
    if(data.target_language) {
      document.getElementById("target_language").value = data.target_language;
    }
  });
}

document.addEventListener("DOMContentLoaded", restore_options);
  
document.getElementById('save').addEventListener('click', save_options);