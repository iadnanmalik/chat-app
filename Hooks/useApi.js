import { useState, useCallback } from 'react'
import { SERVER_URL } from "../server";
import axios from "axios";
export const useApi = () => {

    const [result, setResult] = useState()
    const authenticate = async ({ url, values }) => {
        const body = JSON.stringify(values);
        console.log("Body from hook: ", body);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post(`${SERVER_URL}${url}`, body, config);
            setResult(res);
        } catch (error) {
            setResult(error);
        }
    }
    return [result, authenticate];
}

