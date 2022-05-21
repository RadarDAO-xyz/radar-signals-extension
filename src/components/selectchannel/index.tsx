import React, { FC, ReactFragment, ReactPortal } from "react";
import styled from "styled-components";
import Select from "react-select";
import channelData from "../../data/.test.channels.json";
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

export const SelectChannel = ({
  nextStage,
  prevStage,
  setselectedChannel,
}: {
  nextStage: () => void;
  prevStage: () => void;
  setselectedChannel: any;
}) => {
  const channelOptions = channels.map((_channel: any) => ({
    value: _channel.id,
    label: _channel.name,
  }));

  const handleChannelSelect = (value: any) => {
    setselectedChannel(value);
    prevStage();
  };
  return (
    <>
      <Wrapper>
        <h2>Select Channel</h2>
        <Select options={channelOptions} onChange={handleChannelSelect} />
      </Wrapper>
    </>
  );
};

// TODO - Move to ./style as SC
const Wrapper = styled.div`
  .text-area {
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
  .box {
    background: #fff;
    padding: 22px;
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
