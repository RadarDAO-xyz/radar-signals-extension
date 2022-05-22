import react, { useState } from "react";
import styled from "styled-components";

import bg1 from "./assets/images/loginbg.png";
import bg2 from "./assets/images/bg-image-select-channel.png";
import radarLogo from "./assets/images/logo.radar.black.svg";
import backButton from "./assets/images/back.svg";
import { Home } from "./components/home";
import { Share } from "./components/share";
import { SelectChannel } from "./components/selectchannel";
import { string } from "yup";

function App() {
  const [selectedChannel, setselectedChannel] = useState<any>({});
  const [stage, setStage] = useState("home");
  const stages = ["home", "share", "select-channel"];

  const nextStage = () => {
    setStage(stages[(stages.indexOf(stage) + 1) % stages.length]);
  };

  const prevStage = () => {
    setStage(
      stages[
        stages.indexOf(stage) - 1 >= 0
          ? stages.indexOf(stage) - 1
          : stages.length - 1
      ]
    );
  };

  const renderStage = () => {
    switch (stage) {
      case "home":
        return <Home nextStage={nextStage} />;
      case "share":
        return (
          <Share nextStage={nextStage} selectedChannel={selectedChannel} />
        );
      case "select-channel":
        return (
          <SelectChannel
            nextStage={nextStage}
            prevStage={prevStage}
            setselectedChannel={setselectedChannel}
          />
        );
      default:
        return <Home nextStage={nextStage} />;
    }
  };

  return (
    <StyledApp>
      <div
        className="wrapper"
        style={{
          backgroundImage: stage === "home" ? `url(${bg1})` : `url(${bg2})`,
        }}
      >
        <div className="container">
          <div className="title">
            {stage === "select-channel" && (
              <img
                className="logo"
                src={backButton}
                alt="back"
                style={{
                  height: "14px",
                  width: "14px",
                  float: "left",
                  cursor: "pointer",
                }}
                onClick={prevStage}
              />
            )}

            <img className="logo" src={radarLogo} alt="RADAR" />
            {stage === "home" && (
              <div style={{ fontFamily: "WonderType", fontSize: "20px" }}>
                THE FUTURE OF FUTURES
              </div>
            )}
          </div>
          {renderStage()}
        </div>
      </div>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  @font-face {
    font-family: "WonderType";
    src: url("/assets/fonts/WonderType-Regular.otf");
  }
  @font-face {
    font-family: "PostGrotesk";
    src: url("/assets/fonts/PostGrotesk.otf");
  }
  @font-face {
    font-family: "MicrogrammaExtdD";
    src: url("/assets/fonts/MicrogrammaExtdD.otf");
  }

  width: 350px;
  height: 500px;
  margin: 0 auto;

  .title {
    .logo {
      width: 135px;
      height: 29px;
    }
    margin-bottom: 60px;
  }

  h2 {
    font-size: 16px;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  #header {
    background-color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 1vmin);
    color: black;
  }
  .button {
    font-family: 'Post Grotesk';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    margin-top:18px;
    width: 269px;
    height: 100px;
    background: #fff;
    padding: 22px 0;
    background: #FFFFFF;
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
    font-family: "MicrogrammaExtdD"!important;
    font-size: 18px;
    font-weight: 500;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
  }

  .button:disabled{
    background: #7C7A7A;
    cursor : not-allowed;
    border:none;
  }
  .wrapper {
    background-size: cover;
    padding: 20px;
    height: 100%;
    text-align: center;
    width: 320px;
   
  
    }
  }
`;

export default App;
