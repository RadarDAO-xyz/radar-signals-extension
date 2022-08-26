import React from 'react';
import { AuthSaveKey, RequiredScopes } from '../constants';
import Submit from './Submit';

type LoginProps = {};

type LoginState = {
    finished: boolean;
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
            finished: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        const authSave = (await chrome.storage.sync
            .get(AuthSaveKey)
            .then(x => x[AuthSaveKey])) as AuthSave;
        console.log(authSave);
        if (authSave) {
            console.log(
                authSave.expires_at > Date.now(),
                authSave.scopes.join(' ') === RequiredScopes.join(' ')
            );
            if (
                // Check if old auth is still valid (right scopes and not expired)
                // I think chrome has some sort of automatic feature but
                // i couldn't figure out how to use it
                authSave.expires_at > Date.now() &&
                authSave.scopes.sort((a, b) => a.localeCompare(b)).join(' ') === // Sort both alphabetically so it compares right
                    RequiredScopes.sort((a, b) => a.localeCompare(b)).join(' ')
            ) {
                this.setState({ finished: true });
            } else {
                await chrome.storage.sync.remove(AuthSaveKey);
                this.setState({ finished: false });
            }
        }
    }

    handleClick(e: React.MouseEvent<HTMLButtonElement>) {
        if (window.isExtension) {
            chrome.runtime.sendMessage({ message: 'login' }, response => {
                console.log('done');
                if (response === 'success') this.setState({ finished: true });
            });
        } else {
            this.setState({ finished: true });
        }
    }

    render() {
        return this.state.finished ? (
            <Submit></Submit>
        ) : (
            <button onClick={this.handleClick}>Login</button>
        );
    }
}

export default Login;
