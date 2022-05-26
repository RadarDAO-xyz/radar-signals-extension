import { useState, useEffect } from "react";
import styled from "styled-components";

import bg1 from "./assets/images/loginbg.png";
import bg2 from "./assets/images/bg-image-select-channel.png";
import bgSuccess from "./assets/images/success-bg.png";
import sendAnother from "./assets/images/Send_button.png";
import loaderGif from "./assets/images/loader.gif";


import radarLogoBlack from "./assets/images/logo.radar.black.svg";
import radarLogoWhite from "./assets/images/logo.radar.white.svg";
import backButton from "./assets/images/back.svg";
import { Home } from "./components/home";
import { Compose } from "./components/compose";
import { SelectChannel } from "./components/selectchannel";
import { SuccessPage } from "./components/success";


function App() {
  const [selectedChannel, setselectedChannel] = useState<any>({});
  const [stage, setStage] = useState("home");
  const stages = ["home", "compose", "select-channel", "success"];
  const [loading, setLoading] = useState(false);
  const [token, _] = useState(localStorage.getItem("AUTH_TOKEN"));

  const nextStage = () => {
    setStage(stages[(stages.indexOf(stage) + 1) % stages.length]);
  };

  const jumpStage = (_stageName: string) => {
    setStage(stages[stages.indexOf(_stageName)]);
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
      case "compose":
        return (
          <Compose
            nextStage={nextStage}
            selectedChannel={selectedChannel}
            jumpStage={jumpStage}
          />
        );
      case "select-channel":
        return (
          <SelectChannel
            nextStage={nextStage}
            prevStage={prevStage}
            setselectedChannel={setselectedChannel}
          />
        );
      case "success":
        return <SuccessPage jumpStage={jumpStage} />;
      default:
        return <Home nextStage={nextStage} />;
    }
  };

  useEffect(() => {
    if (token === "") {
      setLoading(true);
      chrome.runtime.sendMessage(
        { message: "AUTHENTICATE", token },
        function (response) {
          setLoading(false);
          if (response.type === "success") {
            localStorage.setItem("AUTH_USER", JSON.stringify({
              username: response.data.username,
              avatar: response.data.avatar,
              channels: response.data.channels,
            }));
            setStage("compose");
          } else {
            setStage("home");
            console.log("login failed", response);
          }
        }
      );
    }
  }, [token]);

  return (
    <StyledApp>
      <div
        className="wrapper"
        style={{
          backgroundImage:
            stage === "home"
              ? `url(${bg1})`
              : stage === "success"
              ? `url(${bgSuccess})`
              : `url(${bg2})`,
        }}
      >
        {
          loading ? (<div className="loader">
            <img src={loaderGif} alt="radar logo" />
          </div>) : (
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

            <img
              className="logo"
              src={stage === "success" ? radarLogoWhite : radarLogoBlack}
              alt="RADAR"
            />
            {stage === "home" && (
              <div style={{ fontFamily: "WonderType", fontSize: "20px" }}>
                THE FUTURE OF FUTURES
              </div>
            )}
          </div>
          {renderStage()}
        </div>
          )
        }
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
    margin-bottom: 46.56px;
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
    font-family: 'PostGrotesk';
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

  .btn-send-another:hover {
    background: url(${sendAnother});
    border: 0.903246px solid #000000;
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
  .success-head {
    font-family:  "MicrogrammaExtdD"!important;
    font-style: normal;
    font-weight: 700;
    font-size: 20.7864px;
    line-height: 27px;
    text-align: center;
    color: #000000;
  }

  .success-message {
    font-family: 'WonderType';
    font-style: normal;
    font-weight: 400;
    font-size: 15.2841px;
    line-height: 135.5%;
    text-align: center;
    text-transform: uppercase;
    color: #000000;
  }

  .box-selected {
    height: 68px !important;
  }
  .box-success{
    height: 184.63px!important;
  }
  .selected-channel-value {
    font-family: "PostGrotesk";
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 19px;
    color: #000;
    text-align: center;
    margin: 2px auto;
  }
  .channel-selected-msg {
    font-family: "PostGrotesk";
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;
    margin: 2px auto;
  }
  .btn-select {
    font-family: "PostGrotesk";
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 24px;
  }
  .head {
    font-family: "PostGrotesk";
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 21px;
    text-align: center;
  }
  .text-area {
    font-family: "PostGrotesk";
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 19px;
    padding: 12px 0px 0px 14px;
    width: 269px;
    height: 128px;
    background: #ffffff;
    border: 0.903246px solid #000000;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    resize: none;
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
    display: "flex";
    flex-direction: "column";
  }

  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 60px;
      height: 60px;
    }
  }
  
`;

export default App;
