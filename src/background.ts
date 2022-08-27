import browser from 'webextension-polyfill';

const AuthSaveKey = 'DiscordAuthAccessToken';
const RequiredScopes = ['identify', 'guilds'];

const DISCORD_URI_ENDPOINT = 'https://discord.com/api/oauth2/authorize';
const CLIENT_ID = encodeURIComponent('1006558827828740137');
const RESPONSE_TYPE = encodeURIComponent('token');
const REDIRECT_URI = encodeURIComponent(browser.identity.getRedirectURL());
const SCOPE = encodeURIComponent(RequiredScopes.join(' '));

browser.runtime.onMessage.addListener(async (message, sender) => {
    if (message === 'login') {
        const redirect_urit = await browser.identity.launchWebAuthFlow({
            url: `${DISCORD_URI_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`,
            interactive: true
        });
        if (browser.runtime.lastError || redirect_urit.includes('access_denied')) {
            console.log('Could not authenticate.');
            return 'fail';
        } else {
            const params = new URLSearchParams(new URL(redirect_urit).hash.substring(1));
            browser.storage.sync.set({
                [AuthSaveKey]: {
                    token: `${params.get('token_type')} ${params.get('access_token')}`,
                    expires_at: Date.now() + parseInt(params.get('expires_in') as string) * 1000,
                    scopes: (params.get('scope') as string).split(' ')
                }
            });
            return 'success';
        }
    } else if (message === 'logout') {
        return 'success';
    }
});
