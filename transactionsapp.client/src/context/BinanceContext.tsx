import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface SymbolData {
    symbol: string;
}

interface PriceData {
    lastPrice: string;
    bestBid: string;
    bestAsk: string;
    changePercent: string;
}

interface BinanceContextProps {
    symbols: SymbolData[];
    watchlist: string[];
    prices: { [key: string]: PriceData };
    toggleSymbol: (symbol: string) => void;
}

export const BinanceContext = createContext<BinanceContextProps | undefined>(undefined);

export const BinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [symbols, setSymbols] = useState<SymbolData[]>([]);
    const [watchlist, setWatchlist] = useState<string[]>([]);
    const [prices, setPrices] = useState<{ [key: string]: PriceData }>({});

    // 🔹 Obtendo os símbolos disponíveis na Binance
    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const response = await axios.get("https://api.binance.com/api/v3/exchangeInfo");
                setSymbols(response.data.symbols.map((s: any) => ({ symbol: s.symbol })));
            } catch (error) {
                console.error("Erro ao buscar símbolos:", error);
            }
        };
        fetchSymbols();
    }, []);

    // 🔹 Alternar a presença de um símbolo na lista de observação
    const toggleSymbol = (symbol: string) => {
        setWatchlist((prev) =>
            prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
        );
    };

    // 🔹 Conectando ao WebSocket da Binance para atualização em tempo real
    useEffect(() => {
        if (watchlist.length === 0) return;

        const streams = watchlist.map((symbol) => `${symbol.toLowerCase()}@ticker`).join("/");
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setPrices((prevPrices) => ({
                ...prevPrices,
                [data.s]: {
                    lastPrice: data.c,
                    bestBid: data.b,
                    bestAsk: data.a,
                    changePercent: data.P,
                },
            }));
        };

        return () => ws.close();
    }, [watchlist]);

    return (
        <BinanceContext.Provider value={{ symbols, watchlist, prices, toggleSymbol }}>
            {children}
        </BinanceContext.Provider>
    );
};
