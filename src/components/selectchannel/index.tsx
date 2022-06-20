import React, { useEffect } from "react";
import styled from "styled-components";
import Select, {
  components,
  ControlProps,
  GroupProps,
  StylesConfig,
  GroupBase,
} from "react-select";

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
    paddingLeft: "28px",
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
  const [channels, setChannels] = React.useState<any>(null);

  const handleChannelSelect = (value: any) => {
    setselectedChannel(value);
    prevStage();
  };

  const fallBackOptions = [
    {
      label: "Category1",
      options: [
        {
          label: "Channel1",
          value: "Channel1",
        },
        {
          label: "Channel2",
          value: "Channel2",
        },
      ],
    },
    {
      label: "Category2",
      options: [
        {
          label: "Channel1",
          value: "Channel1",
        },
        {
          label: "Channel2",
          value: "Channel2",
        },
      ],
    },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("AUTH_USER") as string) || null;
    const _channels = user?.channels || null;
    const list = _channels?.map((channel: any) => ({
      label: `#${channel.name}`,
      value: channel.id,
    }));
    setChannels(list);
    console.log(user?.channels);
  }, []);

  return (
    <Wrapper>
      <h2 className="select-channel-head">Select Channel</h2>
      <Select
        options={channels || fallBackOptions}
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
  );
};

const Wrapper = styled.div`
  width: 100%;
  .select-channel-head {
    margin-top: -40px;
    font-family: "PostGrotesk";
  }
`;
