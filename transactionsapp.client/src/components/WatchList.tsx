import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const Th = styled.th`
    background: #3498db;
    color: white;
    padding: 10px;
`;

const Td = styled.td`
    padding: 10px;
    text-align: center;
`;

interface WatchlistProps {
    symbols: string[];
    onRemoveSymbol: (symbol: string) => void;
}

interface PriceData {
    lastPrice: string;
    bestBid: string;
    bestAsk: string;
    changePercent: string;
}

const Watchlist: React.FC<WatchlistProps> = ({ symbols, onRemoveSymbol }) => {
    const [prices, setPrices] = useState<{ [key: string]: PriceData }>({});

    // 🔹 Conectando ao WebSocket da Binance para atualização em tempo real
    useEffect(() => {
        if (symbols.length === 0) return;

        const streams = symbols.map((symbol) => `${symbol.toLowerCase()}@ticker`).join("/");
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${streams}`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("📢 Dados recebidos do WebSocket:", data);

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
    }, [symbols]);

    return (
        <>
            <h2>Watchlist</h2>
            <Table>
                <thead>
                    <tr>
                        <Th>Symbol</Th>
                        <Th>Last Price</Th>
                        <Th>Bid Price</Th>
                        <Th>Ask Price</Th>
                        <Th>Price Change (%)</Th>
                    </tr>
                </thead>
                <tbody>
                    {symbols.map((symbol) => (
                        <tr key={symbol}>
                            <Td>{symbol}</Td>
                            <Td>{prices[symbol]?.lastPrice || "Loading..."}</Td>
                            <Td>{prices[symbol]?.bestBid || "Loading..."}</Td>
                            <Td>{prices[symbol]?.bestAsk || "Loading..."}</Td>
                            <Td
                                style={{
                                    color: Number(prices[symbol]?.changePercent) >= 0 ? "green" : "red",
                                }}
                            >
                                {prices[symbol]?.changePercent ? `${prices[symbol]?.changePercent}%` : "Loading..."}
                            </Td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default Watchlist;
