/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

function useApiCall(apiFunction, deps = [], initialData = []) {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const response = await apiFunction();
                setData(response);
                setError(null);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        setTimeout(() => {
            fetchData();
        }, 500);
    }, deps);

    return [data, loading, error];
}

export default useApiCall;