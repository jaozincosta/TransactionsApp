import React, { useEffect, useState } from "react";
import { getTransactions } from "../services/transactionsService";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Container = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    text-align: center;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
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

const Button = styled.button`
    background: #3498db;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 20px;
    font-size: 16px;

    &:hover {
        background: #2980b9;
    }
`;

const size = {
    mobile: '768px',
    tablet: '1024px',
};

export const device = {
    mobile: `(max-width: ${size.mobile})`,
    tablet: `(min-width: ${size.mobile}) and (max-width: ${size.tablet})`,
    desktop: `(min-width: ${size.tablet})`,
};


interface Transaction {
    transactionID: number;
    accountID: number;
    transactionAmount: number;
    transactionCurrencyCode: string;
    transactionDateTime: string;
}

const TransactionsPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions();
                console.log("Dados da API:", data);
                setTransactions(data);
            } catch (error) {
                console.error("Erro ao buscar transações:", error);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <Container>
            <h1>Transactions</h1>

            <Table>
                <thead>
                    <tr>
                        <Th>ID</Th>
                        <Th>Account ID</Th>
                        <Th>Amount</Th>
                        <Th>Currency</Th>
                        <Th>Date</Th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.transactionID}>
                            <Td>{transaction.transactionID}</Td>
                            <Td>{transaction.accountID}</Td>
                            <Td>${transaction.transactionAmount.toFixed(2)}</Td>
                            <Td>{transaction.transactionCurrencyCode}</Td>
                            <Td>{transaction.transactionDateTime}</Td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Link to="/binance">
                <Button>Ir para Binance</Button>
            </Link>
        </Container>
    );
};

export default TransactionsPage;
