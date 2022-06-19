import { useState } from "react";
import styled from "styled-components";
import homeBg from "../../assets/images/home-bg.svg";
import radarLogoBlack from "../../assets/images/logo.radar.black.svg";
const BASE_URL = "https://radar-signal-be.herokuapp.com";

const getAccessToken = async (redirect_uri: string) => {
  const response = await fetch(`${BASE_URL}/authorize`, {
      method: 'POST',
      body: JSON.stringify({
          redirect_uri
      }),
      mode: "cors", 
      'credentials': 'include',
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
      }
  });
  const json = await response.json();
  console.log(json);
  return json;
}

interface Profile {
  username: string;
  avatar: string;
}

const AuthPage = () => {
  const [authorizing, setAuthorization] = useState(false);
  const hasToken = localStorage.getItem("AUTH_TOKEN") !== null;
  const profile: Profile = localStorage.getItem("AUTH_USER") !== null ? JSON.parse(localStorage.getItem("AUTH_USER") as string) : null;

  const handleDiscordLogin = async () => {
    setAuthorization(true);
    chrome.runtime.sendMessage({ message: "LOGIN" }, function (response) {
      const  redirect_uri= response.redirect_uri;
      if (chrome.runtime.lastError || redirect_uri?.includes('access_denied')) {
        console.log("Could not authenticate.");
    } else {
      getAccessToken(redirect_uri).then(json => {
        if(json) {
          localStorage.setItem("AUTH_TOKEN", json.token);
          chrome.storage.local.set({"AUTH_TOKEN": JSON.stringify(json)}, function() {
            console.log('Value is set to ' + json);
          });
          localStorage.setItem("AUTH_USER", JSON.stringify({
            username: json.username,
            avatar: json.avatar,
            channels: json.channels,
          }));
          setAuthorization(false);
          chrome.action.setPopup({popup: 'main.html'});
        } else {
          console.log("Could not get token.");
        }
      }).catch(err => {
          console.log(err);
      });
    }
    });
  };

  return (
    <Wrapper>
      <div className="title">
        <img
          className="logo"
          src={radarLogoBlack}
          alt="RADAR"
        />
        <div style={{ fontFamily: "WonderType", fontSize: "20px" }}>
          THE FUTURE OF FUTURES
        </div>
      </div>
      {
        hasToken ? (
          <div id="auth">

            <div id="instructions">
              <p>Next Steps</p>
              <ul>
                <li>Click on this icon to open the extension</li>
                <li>Click on the "Settings" tab</li>
                <li>Click on the "Add Channels" button</li>
                <li>Click on the "Add" button</li>
              </ul>
            </div>

           <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center"}}>
              <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                Logged in to Discord as:
              </p>
              <div className="profile">
                <img src={profile.avatar} alt="user's avatar"/>
                <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                  {profile?.username}
                </p>
              </div>
           </div>

          </div>
        ) : (
          <div>
            <div className="btn-group">
              <button
                disabled={authorizing}
                type="button"
                onClick={handleDiscordLogin}
                className="button"
              >
                <strong>Connect your Discord →</strong>
              </button>
              <button className="button">
                <strong>
                  <a
                    href="https://mirror.xyz/0x149D46eC060e75AE188876AdB6b24024637003C7/UksB2j5ldUAFifjle3w1cGDQCMyHMHCW_9RDSmAhHmw"
                    target="_blank"
                    rel="noopener noreferrer"
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
                    rel="noopener noreferrer"
                  >
                    How to use this plugin →
                  </a>
                </strong>
              </button>
            </div>
          </div>
        )
      }

    </Wrapper>
  );
};

const Wrapper = styled.div`
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

  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: url(${homeBg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    text-align: center;
    .logo {
      width: 165px;
      height: 59px;
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

  .button:disabled{
    background: #7C7A7A;
    cursor : not-allowed;
    border:none;
  }
  .btn-group {
    display: flex;
    flex-direction: column;
  }
  #auth {
    display: flex;
    flex-direction: column;
    margin-top: -2rem;
    img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 6px;
      border: 1px solid #E2E2E2;
    }
  }
  .profile {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #E2E2E2;
    border-radius: 2rem;
    width: max-content;
    padding-left: 6px;
    padding-right: 15px;
    font-size: 14px;
    background-color: #EAEEEE;
    align-self: center;
    p {
      margin: 12px 0;
    }
  }
  #instructions {
    p {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    li{
      font-size: 13px;
      margin-bottom: 5px;
    }
  }
`;

export default AuthPage;