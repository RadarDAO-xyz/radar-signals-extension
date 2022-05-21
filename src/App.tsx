import react, { useState } from "react";
import styled from "styled-components";
import { Login } from "./components/Share";

import bg1 from "./assets/images/loginbg.png";
import bg2 from "./assets/images/bg-image-select-channel.png";
import radarLogo from "./assets/images/logo.radar.black.svg";
import { Channel } from "./components/channel";

function App() {
  const [stage, setStage] = useState("login");
  const stages = ["login", "share"];

  const nextStage = () => {
    setStage(stages[(stages.indexOf(stage) + 1) % stages.length]);
  };

  const renderStage = () => {
    switch (stage) {
      case "login":
        return <Login nextStage={nextStage} />;
      case "share":
        return <Channel />;
      default:
        return null;
    }
  };

  return (
    <StyledApp>
      <div
        className='wrapper'
        style={{
          backgroundImage: stage === "login" ? `url(${bg1})` : `url(${bg2})`,
        }}
      >
        <div className='container'>
          <div className='title'>
            <img className='logo' src={radarLogo} alt='radar logo' />
            {stage === "login" && (
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

  .wrapper {
    background-size: cover;
    padding: 20px;
    height: 100%;
    text-align: center;
    width: 320px;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      &.container {
        padding-top: 20px;
      }
      button {
        background: #fff;
        padding: 22px 0;
        border: 1px solid #000;
        cursor: pointer;
        width: 80%;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
        height: 68px;
        width: 269px;
        &:active {
          box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
        }
        &.btn-send {
          background: #000;
          color: #fff;
        }
      }
    }
  }
`;

export default App;
