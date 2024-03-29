import React from 'react';
import DropInput from '../components/DropInput';
import TagInput from '../components/TagInput';
import TextInput from '../components/TextInput';
import { AuthSaveKey, BackendURL } from '../constants';
import '../styles/webflow.css';
import Success from './Success';
import browser from 'webextension-polyfill';
// let browser: any;

type SubmitProps = {};

type SubmitState = {
    url: string;
    title: string;
    tags: string[];
    channelId: string;
    comment: string;
    submitting: boolean;
    submitted: boolean;
    failed: boolean;
    buttonText: string;
};
class Submit extends React.Component<SubmitProps, SubmitState> {
    public channels: { id: string; name: string }[];
    constructor(props: SubmitProps) {
        super(props);

        this.state = {
            url: '',
            title: '',
            channelId: '',
            tags: [],
            comment: '',
            submitting: false,
            submitted: false,
            failed: false,
            buttonText: ''
        };

        this.channels = [];

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChannelChange = this.handleChannelChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    componentDidMount() {
        Promise.all([this.resolveTab(), this.fetchChannels()])
            .then(() => this.setState({})) // Can't run checkInputs because it replaces error text from fetchChannels
            .catch(() => this.setState({ buttonText: 'Error occurred' }));
    }

    resolveTab() {
        return new Promise(async res => {
            if (window.isExtension) {
                const tabs = await browser.tabs.query({ active: true, currentWindow: true });
                // since only one tab should be active and in the current window at once
                // the return variable should only have one entry
                var activeTab = tabs[0];
                this.setState({
                    url: activeTab.url as string,
                    title: activeTab.title as string
                });
                res(activeTab);
            } else {
                this.setState({ url: 'https://google.com', title: 'Google' });
            }
        });
    }

    handleTitleChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({ title: (e.target as HTMLInputElement).value }, () => this.checkInputs());
    }

    handleTagChange(tags: string[]) {
        this.setState({ tags }, () => this.checkInputs());
    }

    handleChannelChange(e: React.FormEvent<HTMLSelectElement>) {
        this.setState({ channelId: (e.target as HTMLSelectElement).value }, () =>
            this.checkInputs()
        );
    }

    handleCommentChange(e: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({ comment: (e.target as HTMLTextAreaElement).value }, () =>
            this.checkInputs()
        );
    }

    checkInputs() {
        if (!this.state.title) return this.setState({ buttonText: 'Title is missing' });
        if (!this.state.channelId) return this.setState({ buttonText: 'Channel is missing' });
        if (!this.state.url) return this.setState({ buttonText: 'URL is missing' });

        this.setState({ buttonText: '' });
        return true;
    }

    async getAuth() {
        return window.isExtension
            ? await browser.storage.sync
                  .get(AuthSaveKey)
                  .then((x: Record<string, any>) => x[AuthSaveKey].token)
            : 'browsermode';
    }

    async fetchChannels() {
        if (window.isExtension) {
            let auth = await this.getAuth();

            const headers = new Headers();
            headers.set('Authorization', auth);
            return fetch(`${BackendURL}/channels`, {
                headers
            })
                .then(async x => {
                    if (x.ok) {
                        console.log('Success');
                        const channels = await x.json();
                        this.channels = channels;
                        return channels;
                    } else {
                        const text = await x.text();
                        this.setState({ failed: true, buttonText: text });
                        console.error(text);
                    }
                })
                .catch(e => {
                    this.setState({ failed: true });
                    console.error(e);
                });
        } else {
            this.channels = [{ id: '000000000000000000', name: 'channel' }];
        }
    }

    getChannelName() {
        return this.channels.find(c => c.id === this.state.channelId)?.name;
    }

    async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (this.state.submitting || this.state.submitted || this.state.failed) return;
        if (!this.checkInputs()) return;
        console.log('Submitted');
        if (window.isExtension) {
            this.setState({ submitting: true });
            let auth = await this.getAuth();

            const headers = new Headers();
            headers.set('Content-Type', 'application/json');
            headers.set('Authorization', auth);
            fetch(`${BackendURL}/submit`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    title: this.state.title,
                    tags: this.state.tags,
                    url: this.state.url,
                    channelId: this.state.channelId,
                    comment: this.state.comment
                })
            })
                .then(async x => {
                    if (x.ok) {
                        this.setState({ submitting: false, submitted: true });
                        console.log('Success');
                    } else {
                        this.setState({ submitting: false, failed: true });
                        console.error(await x.text());
                    }
                })
                .catch(e => {
                    this.setState({ submitting: false, failed: true });
                    console.error(e);
                });
        } else {
            this.setState({ submitted: true });
        }
    }

    render() {
        if (!this.state.url.startsWith('https://'))
            return <div>You cannot share this type of page</div>;
        else if (this.state.submitted)
            return (
                <Success
                    channelId={this.state.channelId}
                    channelName={this.getChannelName() as string}
                />
            );
        else
            return (
                // Some of this html was generated using webflow
                <form onSubmit={this.handleSubmit} className="div-block">
                    <div className="div-block-5"></div>
                    <div className="div-block-2">
                        <img
                            src="HeaderLogo.png"
                            loading="lazy"
                            alt=""
                            className="image"
                            width="173"
                        />
                    </div>
                    <TextInput
                        id="title"
                        title="What do you want to name this thread?"
                        placeholder="Add a title"
                        onChange={this.handleTitleChange} // Each change is sent back to this Submit form page
                        value={this.state.title}
                    ></TextInput>
                    <TagInput
                        title="What tags do you want to give it?"
                        placeholder="#add your hashtags"
                        onChange={this.handleTagChange} // Each change is sent back to this Submit form page
                    ></TagInput>
                    <DropInput
                        title="What channel do you want to post it to?"
                        placeholder="↓ Select Channel ↓"
                        onChange={this.handleChannelChange}
                        options={this.channels.sort((a, b) => a.name.localeCompare(b.name))}
                    ></DropInput>
                    <div className="div-block-3">
                        <label className="text-block">
                            Why Is this Signal &amp; Thread interesting?
                        </label>
                        <textarea
                            style={{ resize: 'none' }}
                            className="div-block-4 comment"
                            placeholder="Write a comment"
                            onChange={this.handleCommentChange}
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="button text-block-3"
                        disabled={this.state.submitted}
                    >
                        {this.state.buttonText ||
                            (this.state.submitting
                                ? 'SENDING...'
                                : this.state.failed
                                ? 'ERROR OCCURRED'
                                : this.state.submitted
                                ? 'SUBMITTED'
                                : 'SEND')}
                    </button>
                </form>
            );
    }
}

export default Submit;
