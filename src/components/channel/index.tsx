import { FC, ReactFragment, ReactPortal } from "react";
import styled from "styled-components";

import channelData from "../../data/.test.channels.json";

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

export const Channel: FC = () => {
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
  ) => <p className='help is-danger'>{message}</p>;

  return (
    <Wrapper>
      <h2>Why is this signal interesting?</h2>
      <textarea placeholder='Write a comment...' />
      <button type='button'>Select Channel ↓</button>
      <button className='btn-send' type='button'>
        SEND
      </button>
    </Wrapper>
  );
};

// TODO - Move to ./style as SC
const Wrapper = styled.div`
  textarea {
    background: #fff;
    padding: 22px;
    border: 1px solid #000;
    width: 269px;
    height: 100px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    resize: none;
    &:active {
      box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
    }
  }
`;
