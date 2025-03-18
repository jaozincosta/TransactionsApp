import React, { useContext, useState } from "react";
import styled from "styled-components";
import { BinanceContext } from "../contexts/BinanceContext";

const Container = styled.div`
    width: 40%;
    padding: 20px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
`;

const SymbolItem = styled.label`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #ddd;
`;

const SymbolList: React.FC = () => {
    const { symbols, watchlist, toggleSymbol } = useContext(BinanceContext)!;
    const [search, setSearch] = useState("");

    return (
        <Container>
            <h2>Available Symbols</h2>
            <Input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value.toUpperCase())}
            />
            <ul>
                {symbols
                    .filter((s) => s.symbol.includes(search))
                    .map((s) => (
                        <SymbolItem key={s.symbol}>
                            <input
                                type="checkbox"
                                checked={watchlist.includes(s.symbol)}
                                onChange={() => toggleSymbol(s.symbol)}
                            />
                            {s.symbol}
                        </SymbolItem>
                    ))}
            </ul>
        </Container>
    );
};

export default SymbolList;
