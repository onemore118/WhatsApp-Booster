
document.addEventListener("DOMContentLoaded", function() {
    var select = document.getElementById("language");
    select.addEventListener("change", function() {
      var language = select.value;
      select[select.selectedIndex].selected = true;
      chrome.storage.sync.set({language: language});
    });
  });
  