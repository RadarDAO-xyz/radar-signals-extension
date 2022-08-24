import React from 'react';
import TagInput from '../components/TagInput';
import TextInput from '../components/TextInput';
import './Submit.css';

type SubmitProps = {};

class Submit extends React.Component<SubmitProps> {

    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        fetch("") // Need to post thread using browser fetch api
    }

    render() {
        return (
            // Some of this html was generated using webflow
            <form onSubmit={this.handleSubmit} className="div-block">
                <div className="div-block-5"></div>
                <div className="div-block-2">
                    <img src="HeaderLogo.png" loading="lazy" alt="" className="image" width="173" />
                </div>
                <TextInput
                    id="title"
                    title="What do you want to name this thread?"
                    placeholder="Add a title"
                ></TextInput>
                <TagInput
                    title="What tags do you want to give it?"
                    placeholder="#add your hashtags"
                ></TagInput>
                <div className="channel">
                    <div className="text-block">What channel do you want to post it to?</div>
                    <div className="div-block-4 channel">
                        <div className="text-block-2">↓ Select Channel ↓</div>
                    </div>
                </div>
                <div className="div-block-3">
                    <label className="text-block">
                        Why Is this Signal &amp; Thread interesting?
                    </label>
                    <textarea
                        style={{ resize: 'none' }}
                        className="div-block-4 comment"
                        placeholder="Write a comment"
                    ></textarea>
                </div>
                <button type="submit" className="button text-block-3">
                    SEND
                </button>
            </form>
        );
    }
}

export default Submit;
