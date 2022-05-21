import React, { FC, ReactFragment, ReactPortal } from "react";
import styled from "styled-components";
import channelData from "../../data/.test.channels.json";
import channelSelectedIcon from "../../assets/images/channelSelectedIcon.svg";
import { channel } from "diagnostics_channel";

// interface IRadarChannelItem {
//   name: string;
//   category: string;
//   id: string;
//   webhook: string; //URL;
// }

// interface IRadarChannels {
//   channels: IRadarChannelItem[];
// }
interface IFormValues {
  username: string;
  url: string;
  comment: string;
  radarChannel: string;
  date: string;
}

const { channels } = channelData;

interface PropTypes {
  nextStage: () => void;
  selectedChannel: any;
}

export const Share = ({ nextStage, selectedChannel }: PropTypes) => {
  const [signalComment, setsignalComment] = React.useState("");

  const initialValues: IFormValues = {
    username: "",
    url: "",
    radarChannel: "", // channels: [], // Question: can you post to multiple channels?
    comment: "",
    date: `${new Date()}`,
  };

  const sendFormDataHook = (formData: {
    username: string;
    url: string;
    comment: string;
    date: string;
    name: string;
    category: string;
    id: string;
    webhook: string;
  }) => {
    const { username, url, comment, date, name, category, id, webhook } =
      formData;

    function listener(this: any) {
      console.log("Web Hook Repsonse", this.responseText);
    }
    const xhrRequest = new XMLHttpRequest();
    xhrRequest.addEventListener("load", listener);
    xhrRequest.open("POST", webhook);
    xhrRequest.setRequestHeader(
      "Content-Type",
      "application/json;charset=UTF-8"
    );
    xhrRequest.send(
      JSON.stringify({
        username: username,
        avatar_url: "",
        content: `URL: ${url}\n\nComment: ${comment}\n\nDate: ${date}`,
      })
    );
  };

  const renderError = (
    message: boolean | ReactFragment | ReactPortal | null | undefined
  ) => <p className="help is-danger">{message}</p>;

  return (
    <>
      <Wrapper>
        <h2>Why is this signal interesting?</h2>
        <textarea
          className="text-area"
          placeholder="Write a comment..."
          onChange={(e) => setsignalComment(e.target.value)}
        />
        <div style={{ display: selectedChannel?.label ? "none" : "block" }}>
          <button type="button" onClick={nextStage} className="button">
            Select Channel ↓
          </button>
        </div>

        <div
          className="box"
          style={{ display: selectedChannel?.label ? "block" : "none" }}
        >
          <p>
            Channel selected{" "}
            <img
              src={channelSelectedIcon}
              alt="Done"
              style={{
                width: "16px",
              }}
            />
          </p>
          <p style={{ fontWeight: 500 }}>{selectedChannel?.label}</p>
        </div>

        <button
          className="button btn-send"
          type="button"
          disabled={!selectedChannel?.label || !signalComment}
        >
          SEND
        </button>
      </Wrapper>
    </>
  );
};

// TODO - Move to ./style as SC
const Wrapper = styled.div`
  .text-area {
    background: #fff;
    padding: 12px 0px 0px 14px;
    border: 1px solid #000;
    width: 269px;
    height: 100px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    resize: none;
    &:active {
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
    }
  }
  .box {
    background: #fff;
    padding: 7.15px;
    border: 1px solid #000;
    width: 269px;
    height: 100px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    resize: none;
    margin: 5px;
    display: "flex";
    flex-direction: "column";
  }
  .btn-send {
    margin-top: 5px;
  }
`;
