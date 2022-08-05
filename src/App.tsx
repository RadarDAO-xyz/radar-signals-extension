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
import { Compose } from "./components/compose";
import { SelectChannel } from "./components/selectchannel";
import { SuccessPage } from "./components/success";


function App() {
  const [selectedChannel, setselectedChannel] = useState<any>(null);
  const [signalComment, setsignalComment] = useState<string>("");
  const [stage, setStage] = useState("compose");
  const stages = ["compose", "select-channel", "success"];
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
      case "compose":
        return (
          <Compose
            nextStage={nextStage}
            selectedChannel={selectedChannel}
            jumpStage={jumpStage}
            signalComment={signalComment}
            setsignalComment={setsignalComment}
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
        return (
          <SuccessPage 
            jumpStage={jumpStage} 
            setsignalComment={setsignalComment}
            setselectedChannel={setselectedChannel}
          />
        );
      default:
        return (
          <Compose
            nextStage={nextStage}
            selectedChannel={selectedChannel}
            jumpStage={jumpStage}
            signalComment={signalComment}
            setsignalComment={setsignalComment}
          />
        )
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
            stage === "success"
              ? `url(${bgSuccess})`
              : `url(${bg2})`,
        }}
      >
        <div className="container">
          <div className="title">
            {stage === "select-channel" && (
              <div className="back-button" onClick={prevStage}>
                <img
                src={backButton}
                alt="back"
                style={{
                  height: "14px",
                  width: "14px",
                }}
              />
              </div>
            )}

            <img
              className="logo"
              src={stage === "success" ? radarLogoWhite : radarLogoBlack}
              alt="RADAR"
            />
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
  margin: 0 auto;
  width: 320px;
  height: 516px;
  .wrapper {
    background-size: cover;
    padding: 20px;
    height: 100%;
    text-align: center;
    width: 100%;
  }
  .title {
    .logo {
      width: 135px;
      height: 29px;
    }
    margin-bottom: 46.56px;
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
  .back-button {
    position: absolute;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    cursor: pointer;
    padding: 1.1rem;
    margin-top: -5px;
    &:hover {
      background-color: rgba(221, 223, 223, 0.54);
    }
  }
  .container {
    margin: 0 auto;
    width: 100%
  }
`;

export default App;
