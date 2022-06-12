
const DISCORD_URI_ENDPOINT = 'https://discord.com/api/oauth2/authorize';
const CLIENT_ID = encodeURIComponent('977622655626797096');
const RESPONSE_TYPE = encodeURIComponent('code');
const REDIRECT_URI = encodeURIComponent(chrome.identity.getRedirectURL());
const SCOPE = encodeURIComponent('identify guilds');
const BASE_URL = "https://radar-signal-be.herokuapp.com";


function create_auth_endpoint() {
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    let endpoint_url = `${DISCORD_URI_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}index.html&response_type=${RESPONSE_TYPE}&scope=${SCOPE}&nonce=${nonce}`;
    return endpoint_url;
}

const submitSignal = async (token:string, signalMessage: string, channelId:string, url: string) => {
    console.log(signalMessage, channelId)
    chrome.tabs.query({
        active: true,
        currentWindow: true
      }, async function(tabs) {
        var tab = tabs[0];
        var fiurl = tab.url;

    const response = await fetch(`${BASE_URL}/submitSignal`, {
        method: 'POST',
        body: JSON.stringify({
            message: `${signalMessage}`,
            channelId,
            url: fiurl
        }),
        mode: "cors", 
        'credentials': 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
        }
    });

    const json = await response.json();
    return json;
});
}


const getProfile = async (token: string) => {
    const response = await fetch(`${BASE_URL}/profile`, {
        method: 'GET',
        'credentials': 'include',
        mode: "cors",      
        headers: {
            'Authorization': `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*'
        }
    });
    const json = await response.json();
    console.log(json);
    return json
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    if (request.message === 'LOGIN') {
        console.log(chrome.identity.getRedirectURL())

        chrome.identity.launchWebAuthFlow({
            url: create_auth_endpoint(),
            interactive: true
        }, function (redirect_uri) {
            sendResponse({ redirect_uri });
        });
    }

    if(request.message === 'AUTHENTICATE') {
        getProfile(request.token).then(json => {
            console.log(json);
            sendResponse({ type: "success", data: json });
        }).catch(err => {
            console.log(err);
            sendResponse({type: 'failed' });
        });
    }

    if (request.message === 'SEND_SIGNAL') { 
        submitSignal(request.token,request.signalMessage,request.channelId, request.url).then(json=>{
            console.log(json);
            sendResponse('success');
        }).catch(err => {
            console.log(err);
            sendResponse('fail');
        });

    }
    return true;
});



const extensionIconClickListener = (event) => {
    // console.log(`chrome-extension://${chrome.runtime.id}/index.html` === event.url)
    // if(event.url !== `chrome-extension://${chrome.runtime.id}/index.html`) {
    //     console.log("not the same")
    //     
    // }

    const isLoggedIn = false;
    if(isLoggedIn) chrome.action.setPopup({popup: 'index.html'});
    // else chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/index.html` });
 };
         
 chrome.action.onClicked.addListener(extensionIconClickListener);
