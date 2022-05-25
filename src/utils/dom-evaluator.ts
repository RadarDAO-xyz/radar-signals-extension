// var port = chrome.runtime.connect({name: "knockknock"});

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       console.log(sender.tab ?
//                   "from a content script:" + sender.tab.url :
//                   "from the extension");
//       if (request.greeting === "hello")
//         sendResponse({farewell: "goodbye"});
//     }
//   );

// const listenerff  = (request, sender, sendResponse)=> {
//     console.log(sender.tab ?
//                 "from a content script:" + sender.tab.url :
//                 "from the extension");
//     if (request.greeting === "hello")
//       sendResponse({farewell: "goodbye"});
//   };

// chrome.runtime.onConnect.addListener(function(port) {
//     port.onMessage.addListener(function(msg) {
//         console.log(msg)
//     //     if (msg.type === "LOGIN") {
//     //         port.postMessage({farewell: "goodbye"});
//     //     }
//     //     console.log("message received");
//     //     console.log(msg);
//         port.postMessage({farewell: "goodbye"});
//       });
// })

// var port = chrome.runtime.connect();

// window.addEventListener("message", (event) => {
//   // We only accept messages from ourselves
//   if (event.source !== window) {
//     return;
//   }

//   if (event.data.type && (event.data.type === "FROM_PAGE")) {
//     console.log("Content script received: " + event.data.text);
//     port.postMessage(event.data.text);
//   }
// }, false);

// const main = () => {
//     console.log('[content.ts] Main')
//     /**
//      * Fired when a message is sent from either an extension process or a content script.
//      */
//     chrome.runtime.onMessage.addListener(listenerff);
// }
// main();
 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request, sender, sendResponse);
    sendResponse("我收到你的消息了：" + request.greeting);
});