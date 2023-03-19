chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.text) {
      translateText(request.text, function(translation) {
        sendResponse(translation);
      });
      return true;  // 保证 sendResponse 在异步调用中得以正确执行
    }
  });
  