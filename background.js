


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
