import axios from "axios";

const API_URL = "http://localhost:5010/api/transactions";

export const getTransactions = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar transações:", error);
        return [];
    }
};
