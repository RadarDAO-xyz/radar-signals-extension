import React, { useEffect } from 'react';
import styled from 'styled-components';
import channelSelectedIcon from '../../assets/images/channelSelectedIcon.svg';

interface PropTypes {
    nextStage: () => void;
    selectedChannel: any;
    jumpStage: (_stageName: string) => void;
    signalComment: string;
    setsignalComment: any;
}

export const Compose = ({
    nextStage,
    selectedChannel,
    jumpStage,
    signalComment,
    setsignalComment
}: PropTypes) => {
    const [user, setUser] = React.useState<any>(null);

    const handleSendSignal = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');

        chrome.runtime.sendMessage(
            {
                message: 'SEND_SIGNAL',
                token,
                signalMessage: signalComment,
                channelId: selectedChannel.value,
                url: window.location.href
            },
            function (response) {
                if (response === 'fail') {
                    console.log('signal send failed', response);
                } else {
                    console.log('signal send response', response);
                    jumpStage('success');
                }
            }
        );
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('AUTH_USER') as string) || null;
        setUser(user);
    }, []);

    return (
        <Wrapper>
            <h2 className="head">Why is this signal interesting?</h2>
            <div className="signal-comment">
                <textarea
                    className="text-area"
                    placeholder="Write a comment..."
                    value={signalComment}
                    onChange={e => {
                        if (e.target.value.length <= 500) {
                            setsignalComment(e.target.value);
                        }
                    }}
                />

                <div className="counter">
                    {selectedChannel?.label && signalComment.length < 10 && (
                        <p className="requiredText">Minimum 10 characters</p>
                    )}
                    <p></p>
                    {signalComment.length > 0 && <p>{signalComment.length}/500</p>}
                </div>
            </div>
            <div style={{ display: selectedChannel?.label ? 'none' : 'block', cursor: 'pointer' }}>
                <button type="button" onClick={nextStage} className="button btn-select">
                    Select Channel ↓
                </button>
            </div>

            <div
                className="box box-selected"
                style={{ display: selectedChannel?.label ? 'block' : 'none', cursor: 'pointer' }}
                onClick={nextStage}
            >
                <p className="channel-selected-msg">
                    Channel selected
                    <img
                        src={channelSelectedIcon}
                        alt="Done"
                        style={{
                            width: '16px',
                            marginLeft: '8px'
                        }}
                    />
                </p>
                <p className="selected-channel-value">{selectedChannel?.label}</p>
            </div>

            <button
                className="button btn-send"
                type="button"
                disabled={!selectedChannel?.label || signalComment.length < 10}
                onClick={() => {
                    handleSendSignal();
                }}
            >
                SEND
            </button>
            <div className="user">
                <img src={user?.avatar} alt="Discord Profile Avatar" />
                <p>{user?.username}</p>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .box-selected {
        height: 68px !important;
    }
    .selected-channel-value {
        font-family: 'PostGrotesk';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 19px;
        color: #000;
        text-align: center;
        margin: 2px auto;
    }
    .channel-selected-msg {
        font-family: 'PostGrotesk';
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 24px;
        margin: 2px auto;
    }
    .btn-select {
        font-family: 'PostGrotesk';
        font-style: normal;
        font-weight: 300;
        font-size: 18px;
        line-height: 24px;
    }
    .head {
        font-family: 'PostGrotesk';
        font-style: normal;
        font-weight: 700;
        font-size: 16px;
        line-height: 21px;
        text-align: center;
    }
    .text-area {
        font-family: 'PostGrotesk';
        font-style: normal;
        font-weight: 300;
        font-size: 14px;
        line-height: 19px;
        padding: 12px;
        width: 269px;
        height: 128px;
        background: #ffffff;
        border: 0.903246px solid #000000;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        resize: none;
        padding-bottom: 20px;
        &:active {
            box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
        }
    }
    .box {
        background: #fff;
        padding: 7.15px;
        border: 0.903246px solid #000000;
        width: 269px;
        height: 100px;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        resize: none;
        margin: 18px 5px 0px 5px;
        display: 'flex';
        flex-direction: 'column';
    }
    .user {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 8px;
        img {
            width: 27px;
            height: 27px;
            border-radius: 50%;
            margin-right: 10px;
        }
        p {
            font-family: 'PostGrotesk';
            font-style: bold;
            font-weight: 900;
            font-size: 16px;
        }
    }
    .button {
        font-family: 'PostGrotesk';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        margin-top: 18px;
        width: 100%;
        height: 100px;
        background: #fff;
        padding: 22px 0;
        background: #ffffff;
        border: 0.965581px solid #000000;
        cursor: pointer;
        width: 80%;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        height: 68px;
        width: 269px;
        &:active {
            box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
        }
    }

    .btn-send {
        background: #000;
        color: #fff;
        margin-top: 18px;
        font-family: 'MicrogrammaExtdD' !important;
        font-size: 18px;
        font-weight: 500;
        line-height: 23px;
        letter-spacing: 0em;
        text-align: center;
    }

    .button:disabled {
        background: #7c7a7a;
        cursor: not-allowed;
        border: none;
    }

    .signal-comment {
        position: relative;
        .counter {
            display: flex;
            justify-content: space-between;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            margin-left: 15px;
            margin-right: 15px;
            text-align: right;
            .requiredText {
                font-family: 'PostGrotesk';
                color: red;
                font-style: normal;
                font-weight: 500;
            }
        }
    }
`;
