import React from 'react';
import Login from './pages/Login';

declare global {
    interface Window {
        isExtension: boolean;
    }
}

function App() {
    try {
        window.isExtension = chrome && true;
    } catch {
        try {
            // @ts-ignore
            window.isExtension = browser && true;
        } catch {
            window.isExtension = false;
        }
    }
    return (
        <div className="App">
            <Login />
        </div>
    );
}

export default App;
