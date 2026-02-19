
export interface DollarRate {
    fecha: string;
    promedio: number;
}

export class CurrencyService {
    private static API_URL = 'https://ve.dolarapi.com/v1/dolares/oficial';

    static async getDollarRate(): Promise<DollarRate> {
        try {
            const response = await fetch(this.API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch dollar rate');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching dollar rate:', error);
            throw error;
        }
    }
}
