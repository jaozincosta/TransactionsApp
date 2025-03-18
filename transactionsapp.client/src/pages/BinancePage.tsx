import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Watchlist from "../components/Watchlist";

const Container = styled.div`
    display: flex;
    max-width: 900px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Panel = styled.div`
    flex: 1;
    padding: 20px;
    border: 1px solid #ddd;
    background: #fff;
    border-radius: 8px;
`;

const Title = styled.h2`
    text-align: center;
    color: #2c3e50;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const SymbolList = styled.ul`
    list-style: none;
    padding: 0;
    max-height: 300px;
    overflow-y: auto;
`;

const SymbolItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #ddd;
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background: #3498db;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;

    &:hover {
        background: #2980b9;
    }
`;

interface SymbolData {
    symbol: string;
}

const BinancePage: React.FC = () => {
    const [symbols, setSymbols] = useState<SymbolData[]>([]);
    const [search, setSearch] = useState("");
    const [watchlist, setWatchlist] = useState<string[]>([]);

    // 🔹 Obtendo os símbolos disponíveis na Binance
    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const response = await axios.get(
                    "https://api.binance.com/api/v3/exchangeInfo"
                );
                console.log("🔹 Símbolos recebidos da Binance:", response.data.symbols);
                setSymbols(response.data.symbols.map((s: any) => ({ symbol: s.symbol })));
            } catch (error) {
                console.error("❌ Erro ao buscar símbolos:", error);
            }
        };
        fetchSymbols();
    }, []);

    // 🔹 Manipula a adição e remoção de símbolos na Watchlist
    const toggleSymbol = (symbol: string) => {
        setWatchlist((prev) =>
            prev.includes(symbol)
                ? prev.filter((s) => s !== symbol)
                : [...prev, symbol]
        );
    };

    return (
        <Container>
            {/* 🔹 Painel Esquerdo: Lista de Símbolos */}
            <Panel>
                <Title>Available Symbols</Title>
                <SearchInput
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value.toUpperCase())}
                />
                <SymbolList>
                    {symbols
                        .filter((s) => s.symbol.includes(search))
                        .map((s) => (
                            <SymbolItem key={s.symbol}>
                                <Checkbox
                                    type="checkbox"
                                    checked={watchlist.includes(s.symbol)}
                                    onChange={() => toggleSymbol(s.symbol)}
                                />
                                {s.symbol}
                            </SymbolItem>
                        ))}
                </SymbolList>
                <Button onClick={() => console.log("Watchlist Atualizada:", watchlist)}>Update List</Button>
            </Panel>

            {/* 🔹 Painel Direito: Watchlist */}
            <Panel>
                <Watchlist symbols={watchlist} onRemoveSymbol={toggleSymbol} />
            </Panel>
        </Container>
    );
};

export default BinancePage;
