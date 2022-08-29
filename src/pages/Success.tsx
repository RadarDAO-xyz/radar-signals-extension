import React from 'react';
import '../styles/minimal.css';
import { GuildID } from '../constants';
import browser from 'webextension-polyfill'
// let browser: any;

type SuccessProps = {
    channelName: string;
    channelId: string;
};

class Success extends React.Component<SuccessProps> {
    constructor(props: SuccessProps) {
        super(props);

        this.handleShare = this.handleShare.bind(this);
        this.handleTake = this.handleTake.bind(this);
    }

    handleShare(e: React.MouseEvent<HTMLButtonElement>) {}

    handleTake(e: React.MouseEvent<HTMLButtonElement>) {
        browser.tabs.create({
            url: `https://discord.com/channels/${GuildID}/${this.props.channelId}`
        });
    }

    render() {
        return (
            <div className="button-back">
                <span className="title">SUBMITTED SUCCESSFULLY</span>

                <div className="button-div">
                    <button className="login-button" onClick={this.handleShare}>
                        Share another signal
                    </button>
                    <button className="login-button" onClick={this.handleTake}>
                        Take me to #{this.props.channelName}
                    </button>
                </div>
            </div>
        );
    }
}

export default Success;
