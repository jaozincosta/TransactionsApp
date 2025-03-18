import styled from "styled-components";

export const Container = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
    text-align: center;
    color: #2c3e50;
`;

export const SymbolList = styled.ul`
    list-style: none;
    padding: 0;
`;

export const SymbolItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ddd;
`;

export const Button = styled.button`
    background: #3498db;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background: #2980b9;
    }
`;
