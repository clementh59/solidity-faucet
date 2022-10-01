import React from "react";
import {Route, Routes} from 'react-router-dom';
import FaucetPage from "./pages/FaucetPage";
import LoadingPage from "./pages/LoadingPage";

const App = () => {

    return (
        <Routes>
            <Route path="/loading" element={<LoadingPage/>}/>
            <Route path="/" element={<FaucetPage/>}/>
        </Routes>
    );
}

export default App;
