import React from 'react';
import Submit from './pages/Submit';

declare global {
    interface Window {
        isExtension: boolean;
        backendUrl: string;
    }
}

function App() {
    try {
        window.isExtension = chrome && true;
    } catch {
        window.isExtension = false;
    }
    window.backendUrl = 'http://localhost:4000'
    return (
        <div className="App">
            <Submit></Submit>
        </div>
    );
}

export default App;
