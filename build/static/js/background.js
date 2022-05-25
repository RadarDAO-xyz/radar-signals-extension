chrome.tabs.query({active:!0,currentWindow:!0},(function(e){chrome.tabs.sendMessage(e[0].id,{greeting:"hello"},(function(e){console.log(e)}))}));
//# sourceMappingURL=background.js.map