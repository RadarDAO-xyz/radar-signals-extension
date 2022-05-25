import { useState, useEffect } from "react";
import styled from "styled-components";

export const Home = ({ nextStage }: { nextStage: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [authorizing, setAuthorization] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");
    if (token) {
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
            nextStage();
          } else {
            console.log("login failed", response);
          }
        }
      );
    }
  }, [nextStage]);

  const handleDiscordLogin = async () => {
    setAuthorization(true);
    chrome.runtime.sendMessage({ message: "LOGIN" }, function (response) {
      setAuthorization(false);
      if (response.type === "success") {
        localStorage.setItem("AUTH_TOKEN", response.data.token);
        localStorage.setItem("AUTH_USER", JSON.stringify({
          username: response.data.username,
          avatar: response.data.avatar,
          channels: response.data.channels,
        }));
        nextStage();
      } else {
        console.log("login failed", response);
      }
    });
  };

  return (
    <Wrapper>
      {loading ? (
        <div>Loading...</div>
      ) : (
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
      )}
    </Wrapper>
  );
};

// TODO - Move to ./style as SC
const Wrapper = styled.div``;
