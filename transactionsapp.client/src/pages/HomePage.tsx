import React from "react";
import SymbolList from "../components/SymbolList";
import WatchList from "../components/WatchList";

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Binance WebSocket Tracker</h1>
            <SymbolList />
            <WatchList />
        </div>
    );
};

export default HomePage;
