
import { useState, useEffect } from 'react';
import { CurrencyService, type DollarRate } from '../services/CurrencyService';

export const useCurrencyConversion = (amountInUsd: number) => {
    const [rate, setRate] = useState<number | null>(null);
    const [amountInBs, setAmountInBs] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<string | null>(null);

    useEffect(() => {
        const fetchRate = async () => {
            try {
                const data: DollarRate = await CurrencyService.getDollarRate();
                setRate(data.promedio);
                setLastUpdate(data.fecha);

                // Calculate amount in Bs
                const calculatedAmount = amountInUsd * data.promedio;
                // Format directly to locale string with 2 decimals
                setAmountInBs(calculatedAmount.toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
            } catch (err) {
                setError('No se pudo obtener la tasa de cambio');
                // Fallback or manual handling could be added here
            } finally {
                setLoading(false);
            }
        };

        fetchRate();
    }, [amountInUsd]);

    return { rate, amountInBs, loading, error, lastUpdate };
};
