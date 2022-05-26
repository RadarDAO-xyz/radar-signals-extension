import { useState } from "react";
import styled from "styled-components";
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
  console.log(response);
  const json = await response.json();
  console.log(json);
  return json;
}

export const Home = ({ nextStage }: { nextStage: () => void }) => {
  const [authorizing, setAuthorization] = useState(false);


  const handleDiscordLogin = async () => {
    setAuthorization(true);
    chrome.runtime.sendMessage({ message: "LOGIN" }, function (response) {
      const  redirect_uri= response.redirect_uri;
      console.log(redirect_uri);
      if (chrome.runtime.lastError || redirect_uri?.includes('access_denied')) {
        console.log("Could not authenticate.");
    } else {
      getAccessToken(redirect_uri).then(json => {
        if(json) {
          localStorage.setItem("AUTH_TOKEN", json.token);
          localStorage.setItem("AUTH_USER", JSON.stringify({
            username: json.username,
            avatar: json.avatar,
            channels: json.channels,
          }));
          nextStage();
        }else {
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
      <>
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
      </>
    </Wrapper>
  );
};

// TODO - Move to ./style as SC
const Wrapper = styled.div``;
