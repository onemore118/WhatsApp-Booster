


function translate(text, sourceLanguage, targetLanguage, callback) {
  
  const url = `https://translate.google.com/translate_a/single?client=gtx&sl=${sourceLanguage}&tl=${targetLanguage}&dt=t&q=${encodeURI(text)}`;
  fetch(url)
    .then(response => response.json())
    .then(function(result) {
        let message_list = result[0];
        let translate_message = '';
        for(const message of message_list) {
          translate_message += message[0];
        }
        callback(translate_message);
    }
    )
    .catch(error => console.log(error));
}

// // 监听来自content.js的消息
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   // 如果消息类型为translate，则执行翻译函数
//   if (request.type === "translate") {
//     translate(request.text, request.sourceLanguage, request.targetLanguage, function(translatedText) {
//       // 将翻译后的文本作为响应发送回content.js
//       sendResponse({ text: translatedText });
//     });
//     // 告诉Chrome，需要异步处理sendResponse
//     return true;
//   }
// });



chrome.runtime.onConnect.addListener(function(port) {
  if (port.name === "translate") {
    port.onMessage.addListener(function(message) {
      if (message.action === "translate") {
        translate(message.text, message.sourceLanguage, message.targetLanguage, function(translatedText) {
          // 将翻译后的文本作为响应发送回content.js
          port.postMessage({ text: translatedText });
        });
      }
    });
  }
});
