import axios from "axios";
import { SymbolData, TickerUpdate } from "../types";

const API_URL = "https://api.binance.com/api/v3/exchangeInfo";
const WS_URL = "wss://data-stream.binance.com/stream?streams=";

export const fetchSymbols = async (): Promise<SymbolData[]> => {
    const response = await axios.get(API_URL);
    return response.data.symbols.map((s: any) => ({
        symbol: s.symbol,
        baseAsset: s.baseAsset,
        quoteAsset: s.quoteAsset,
    }));
};

export const connectWebSocket = (symbols: string[], onMessage: (data: TickerUpdate) => void) => {
    const streamNames = symbols.map((s) => `${s.toLowerCase()}@ticker`).join("/");
    const ws = new WebSocket(`${WS_URL}${streamNames}`);

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.data) {
            onMessage(message.data);
        }
    };

    return ws;
};
