import React from 'react';
import './Submit.css';

function Submit() {
    return (
        // Most of this html was generated using webflow
        <div className="div-block">
            <div className="div-block-5"></div>
            <div className="div-block-2">
                <img src="HeaderLogo.png" loading="lazy" alt="" className="image" width="173" />
            </div>
            <div className="div-block-3">
                <label className="text-block">What do you want to name this thread?</label>
                <input type="text" className="div-block-4" placeholder="Add a title"></input>
            </div>
            <div className="tags">
                <div className="text-block">What tags do you want to give it?</div>
                <div className="div-block-4 tags2">
                    <input
                        type="text"
                        className="div-block-4 tags2 text-block2 comment"
                        placeholder="#add your hashtags"
                    ></input>
                    {/* <div className="text-block-2 comment">#add your hashtags</div> */}
                    <div className="tag tag-text">#techno</div>
                    <div className="tag tag-text">#bio-lighting</div>
                    <div className="tag tag-text">#craft</div>
                </div>
            </div>
            <div className="channel">
                <div className="text-block">What channel do you want to post it to?</div>
                <div className="div-block-4 channel">
                    <div className="text-block-2">↓ Select Channel ↓</div>
                </div>
            </div>
            <div className="div-block-3">
                <label className="text-block">Why Is this Signal &amp; Thread interesting?</label>
                <textarea className="div-block-4 comment" placeholder="Write a comment"></textarea>
            </div>
            <button className="button text-block-3">SEND</button>
        </div>
    );
}

export default Submit;
