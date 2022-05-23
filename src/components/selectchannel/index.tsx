import React, { FC, ReactFragment, ReactPortal } from "react";
import styled from "styled-components";
import Select, {
  components,
  ControlProps,
  GroupProps,
  StylesConfig,
  GroupBase,
} from "react-select";
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

const customSelectStyles: StylesConfig<unknown, boolean, GroupBase<unknown>> = {
  input: (styles) => ({
    ...styles,
    fontFamily: "PostGrotesk",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "12.2273px",
    lineHeight: "16px",
  }),
  control: (styles) => ({
    ...styles,
    paddingLeft: "10px",
  }),
  placeholder: (styles) => ({
    ...styles,
    textAlign: "left",
    fontFamily: "PostGrotesk",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "12.2273px",
    lineHeight: "16px",
  }),
  menu: (styles) => ({
    ...styles,
    fontFamily: "PostGrotesk",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "0em",
  }),
  option: (styles) => ({
    ...styles,
    background: "#FFF",
    textAlign: "left",
    ":hover": {
      background: "#8F00FF",
      color: "#fff",
    },
  }),
  groupHeading: (styles) => ({
    ...styles,
    background: "#FFF",
    fontFamily: "PostGrotesk",
    color: "#000",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "19px",
    textAlign: "left",
    textTransform: "none",
  }),
  group: (styles) => ({
    ...styles,
    color: "#000",
    fontFamily: "PostGrotesk",
    fontWeight: 100,
    fontSize: "12.2273px",
    lineHeight: "16px",
  }),
};

const Group = (props: GroupProps<any | any, false>) => (
  <div>
    <components.Group {...props} />
  </div>
);

const Control = ({ children, ...props }: ControlProps<any, false>) => {
  // @ts-ignore

  return (
    <components.Control {...props}>
      <svg
        width="13"
        height="14"
        viewBox="0 0 13 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.2316 12.4567L9.57216 9.79726M11.0089 6.34306C11.0089 9.04423 8.81913 11.234 6.11796 11.234C3.41679 11.234 1.22705 9.04423 1.22705 6.34306C1.22705 3.64188 3.41679 1.45215 6.11796 1.45215C8.81913 1.45215 11.0089 3.64188 11.0089 6.34306Z"
          stroke="#9E9C9C"
          strokeWidth="1.22273"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {children}
    </components.Control>
  );
};

export const SelectChannel = ({
  nextStage,
  prevStage,
  setselectedChannel,
}: {
  nextStage: () => void;
  prevStage: () => void;
  setselectedChannel: any;
}) => {
  const [openMenu, setopenMenu] = React.useState(true);

  const handleChannelSelect = (value: any) => {
    setselectedChannel(value);
    prevStage();
  };
  return (
    <>
      <Wrapper>
        <h2 className="select-channel-head">Select Channel</h2>
        <Select
          options={channels}
          onChange={handleChannelSelect}
          placeholder={"Search channel name here"}
          components={{
            Control,
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            Group,
          }}
          isSearchable
          styles={customSelectStyles}
          onFocus={() => setopenMenu(true)}
          menuIsOpen={openMenu}
        />
      </Wrapper>
    </>
  );
};

// TODO - Move to ./style as SC
const Wrapper = styled.div`
  .select-channel-head {
    margin-top: -40px;
  }
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
