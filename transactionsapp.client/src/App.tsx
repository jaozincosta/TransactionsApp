import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TransactionsPage from "./pages/TransactionsPage";
import BinancePage from "./pages/BinancePage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<TransactionsPage />} />
                <Route path="/binance" element={<BinancePage />} />
            </Routes>
        </Router>
    );
};

export default App;
