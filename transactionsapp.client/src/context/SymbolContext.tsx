import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchSymbols, connectWebSocket } from "../services/binanceService";
import { SymbolData, TickerUpdate } from "../types";

interface SymbolContextType {
    symbols: SymbolData[];
    watchList: string[];
    tickerData: Record<string, TickerUpdate>;
    addToWatchList: (symbol: string) => void;
}

const SymbolContext = createContext<SymbolContextType | undefined>(undefined);

export const SymbolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [symbols, setSymbols] = useState<SymbolData[]>([]);
    const [watchList, setWatchList] = useState<string[]>([]);
    const [tickerData, setTickerData] = useState<Record<string, TickerUpdate>>({});

    useEffect(() => {
        fetchSymbols().then(setSymbols);
    }, []);

    useEffect(() => {
        if (watchList.length > 0) {
            const ws = connectWebSocket(watchList, (data) => {
                setTickerData((prev) => ({ ...prev, [data.s]: data }));
            });

            return () => ws.close();
        }
    }, [watchList]);

    const addToWatchList = (symbol: string) => {
        if (!watchList.includes(symbol)) {
            setWatchList([...watchList, symbol]);
        }
    };

    return (
        <SymbolContext.Provider value={{ symbols, watchList, tickerData, addToWatchList }}>
            {children}
        </SymbolContext.Provider>
    );
};

export const useSymbolContext = () => {
    const context = useContext(SymbolContext);
    if (!context) throw new Error("useSymbolContext must be used within a SymbolProvider");
    return context;
};
