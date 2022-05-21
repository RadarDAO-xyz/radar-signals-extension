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

export const Home = ({ nextStage }: { nextStage: () => void }) => {
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
    <Wrapper>
      <button type="button" onClick={nextStage} className="button">
        <strong>Connect your Discord →</strong>
      </button>
      <button className="button">
        <strong>
          <a
            href="https://mirror.xyz/0x149D46eC060e75AE188876AdB6b24024637003C7/UksB2j5ldUAFifjle3w1cGDQCMyHMHCW_9RDSmAhHmw"
            target="_blank"
          >
            Learn more about RADAR →
          </a>
        </strong>
      </button>
      <button className="button">
        <strong>
          <a
            href="https://discord.com/channels/@me/976638042754408458/977035100791406662"
            target="_blank"
          >
            How to use this plugin →
          </a>
        </strong>
      </button>
    </Wrapper>
  );
};

// TODO - Move to ./style as SC
const Wrapper = styled.div``;
