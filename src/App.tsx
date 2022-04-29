import styled from "styled-components";
import { Share } from "./components/Share";

function App() {
  return (
    <StyledApp className="App">
      <header className="App-header">
        <h1>Radar</h1>
        <Share />
      </header>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  text-align: center;

  .App-logo {
    height: 40vmin;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }

  .App-header {
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
