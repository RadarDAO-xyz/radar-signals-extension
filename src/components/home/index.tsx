import { useState, useEffect } from "react";
import styled from "styled-components";
import { createTextSpanFromBounds } from "typescript";

export const Home = ({ nextStage }: { nextStage: () => void }) => {
  const [authorizing, setAuthorization] = useState(false);


  const handleDiscordLogin = async () => {
    setAuthorization(true);
    // window.postMessage({ type: "LOGIN" });
    // chrome.runtime.sendMessage({ message: "LOGIN" }, function (response) {
    //   setAuthorization(false);
    //   if (response.type === "success") {
    //     nextStage();
    //     localStorage.setItem("AUTH_TOKEN", response.data.token);
    //     localStorage.setItem("AUTH_USER", JSON.stringify({
    //       username: response.data.username,
    //       avatar: response.data.avatar,
    //       channels: response.data.channels,
    //     }));
    //   } else {
    //     console.log("login failed", response);
    //   }
    // });
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.connect(tabs[0].id || 0, { name: "content" });
    });
    // window.postMessage({ type: "FROM_PAGE", text: "Hello from the webpage!" }, "*");
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
