

const AuthSaveKey = "DiscordAuthAccessToken"
const RequiredScopes = ['identify', 'guilds'];

const DISCORD_URI_ENDPOINT = 'https://discord.com/api/oauth2/authorize';
const CLIENT_ID = encodeURIComponent('1006558827828740137');
const RESPONSE_TYPE = encodeURIComponent('token');
const REDIRECT_URI = encodeURIComponent(
    'https://momakcjgjolagailhapkaoljgelegkkl.chromiumapp.org/'
);
const SCOPE = encodeURIComponent(RequiredScopes.join(' '));

// eslint-disable-next-line no-undef
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        // eslint-disable-next-line no-undef
        chrome.identity.launchWebAuthFlow(
            {
                url: `${DISCORD_URI_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`,
                interactive: true
            },
            function (redirect_uri) {
                // eslint-disable-next-line no-undef
                if (chrome.runtime.lastError || redirect_uri.includes('access_denied')) {
                    console.log('Could not authenticate.');
                    sendResponse('fail');
                } else {
                    const params = new URLSearchParams(new URL(redirect_uri).hash.substring(1));
                    // eslint-disable-next-line no-undef
                    chrome.storage.sync.set({
                        [AuthSaveKey]: {
                            token: `${params.get('token_type')} ${params.get('access_token')}`,
                            expires_at: Date.now() + parseInt(params.get('expires_in')) * 1000,
                            scopes: params.get('scope').split(' ')
                        }
                    });
                    sendResponse('success');
                }
            }
        );
        return true;
    } else if (request.message === 'logout') {
        sendResponse('success');
    }
});
