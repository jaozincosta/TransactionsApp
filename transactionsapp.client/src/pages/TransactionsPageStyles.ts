import styled from "styled-components";

export const Container = styled.div`
    max-width: 1000px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
    text-align: center;
    color: #2c3e50;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
`;

export const Th = styled.th`
    background: #3498db;
    color: white;
    padding: 10px;
`;

export const Td = styled.td`
    padding: 8px;
    border-bottom: 1px solid #ddd;
    text-align: center;
`;

export const Tr = styled.tr`
    &:nth-child(even) {
        background: #f2f2f2;
    }
`;
