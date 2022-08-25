import React from 'react';
import Submit from './pages/Submit';

declare global {
    interface Window {
        isExtension: boolean;
    }
}

function App() {
    try {
        window.isExtension = chrome && true;
    } catch {
        window.isExtension = false;
    }
    return (
        <div className="App">
            <Submit></Submit>
        </div>
    );
}

export default App;
