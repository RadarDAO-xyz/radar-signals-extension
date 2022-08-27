import React from 'react';
import DropInput from '../components/DropInput';
import TagInput from '../components/TagInput';
import TextInput from '../components/TextInput';
import { AuthSaveKey, BackendURL } from '../constants';
import './Submit.css';
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
            failed: false
        };

        this.channels = [];

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChannelChange = this.handleChannelChange.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
    }

    componentDidMount() {
        Promise.all([this.resolveTab(), this.fetchChannels()]).then(() => this.setState({}));
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
        this.setState({ title: (e.target as HTMLInputElement).value });
    }

    handleTagChange(tags: string[]) {
        this.setState({ tags });
    }

    handleChannelChange(e: React.FormEvent<HTMLSelectElement>) {
        this.setState({ channelId: (e.target as HTMLSelectElement).value });
    }

    handleCommentChange(e: React.FormEvent<HTMLTextAreaElement>) {
        this.setState({ comment: (e.target as HTMLTextAreaElement).value });
    }

    async getAuth() {
        return window.isExtension
            ? await browser.storage.sync
                  .get(AuthSaveKey)
                  .then((x: Record<string, any>) => x[AuthSaveKey].token)
            : 'browsermode';
    }

    async fetchChannels() {
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
                    console.error(await x.text());
                }
            })
            .catch(e => console.error(e));
    }

    async handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        if (this.state.submitting || this.state.submitted) return;
        this.setState({ submitting: true });
        console.log('Submitted');
        e.preventDefault();

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
            .catch(e => console.error(e));
    }

    render() {
        if (!this.state.url.startsWith('https://'))
            return <div>You cannot share this type of page</div>;
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
                        options={this.channels}
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
                        {this.state.submitting
                            ? 'SENDING...'
                            : this.state.failed
                            ? 'ERROR OCCURRED'
                            : this.state.submitted
                            ? 'SUBMITTED'
                            : 'SEND'}
                    </button>
                </form>
            );
    }
}

export default Submit;
