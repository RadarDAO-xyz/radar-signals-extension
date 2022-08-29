import React from 'react';
import { AuthSaveKey, RequiredScopes } from '../constants';
import '../styles/minimal.css';
import Submit from './Submit';
import browser from 'webextension-polyfill';
// let browser: any;

type LoginProps = {};

type LoginState = {
    finished: boolean;
    started: boolean;
    failed: boolean;
};

type AuthSave = {
    expires_at: number;
    scopes: string[];
    token: string;
};

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            finished: false,
            started: false,
            failed: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        if (window.isExtension) {
            const authSave = (await browser.storage.sync
                .get(AuthSaveKey)
                .then((x: Record<string, any>) => x[AuthSaveKey])) as AuthSave;
            console.log(authSave);
            if (authSave) {
                console.log(
                    authSave.expires_at > Date.now(),
                    authSave.scopes.join(' ') === RequiredScopes.join(' ')
                );
                if (
                    // Check if old auth is still valid (right scopes and not expired)
                    // I think browser has some sort of automatic feature but
                    // i couldn't figure out how to use it
                    authSave.expires_at > Date.now() &&
                    authSave.scopes.sort((a, b) => a.localeCompare(b)).join(' ') === // Sort both alphabetically so it compares right
                        RequiredScopes.sort((a, b) => a.localeCompare(b)).join(' ')
                ) {
                    this.setState({ finished: true });
                } else {
                    await browser.storage.sync.remove(AuthSaveKey);
                    this.setState({ finished: false });
                }
            }
        }
    }

    async handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (this.state.finished || this.state.started || this.state.failed) return;
        if (window.isExtension) {
            this.setState({ started: true });
            const response = await browser.runtime.sendMessage(undefined, 'login');
            console.log('done');
            if (response === 'success') this.setState({ started: false, finished: true });
            else this.setState({ failed: true, started: false });
        } else {
            this.setState({ started: false, finished: true });
        }
    }

    render() {
        return this.state.finished ? (
            <Submit></Submit>
        ) : (
            <div className="button-back">
                <img
                    src="HeaderLogo.png"
                    loading="lazy"
                    alt=""
                    className="login-image"
                    width="173"
                />
                <span className="header-text top">SIGNALS EXTENSION</span>
                <span className="header-text sub">Connect your discord to begin</span>

                <button className="login-button" onClick={this.handleClick}>
                    {this.state.started
                        ? 'Opening login page...'
                        : this.state.failed
                        ? 'Could not login'
                        : 'Login with Discord'}
                </button>
            </div>
        );
    }
}

export default Login;
