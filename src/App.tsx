import styled from "styled-components";
import { Share } from "./components/Share";

import radarLogo from "./assets/images/logo.radar.black.svg";

function App() {
  return (
    <StyledApp>
      <header id="header">
        <h1 className="logo">Radar</h1>
        <Share />
      </header>
    </StyledApp>
  );
}

const StyledApp = styled.div`

  text-align: center;

  .logo {
    pointer-events: none;
    width: 100px;
    height: 0;
    padding-top: 18px;
    background-image: url(${radarLogo});
    background-size: 100px;
    background-repeat: no-repeat;
    display: inline-block;
    position: relative;
    overflow: hidden;
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
`;

export default App;
