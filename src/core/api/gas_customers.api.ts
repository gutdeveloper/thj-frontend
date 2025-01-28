import httpService from "@/lib/httpService";
import API_CONSTANTS from "../constants/api.constants";
import { GasCustomer } from "../interfaces/gas_customer";

const {
    gas_customers
} = API_CONSTANTS;

const GAS_CUSTOMERS = {
    async getCustomersWithNegativeBenefit() {
        try {
            const { data } = await httpService.get<number>(`${gas_customers}/negative-benefit`);
            return data;
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async createGasCustomer(customerId: number, gasVendorId: number, salePrice: number) {
        try {
            const values = {
                customer_id: customerId,
                gas_vendor_id: gasVendorId,
                sale_price: salePrice
            }
            const { data, status } = await httpService.post<GasCustomer>(gas_customers, values);
            return { data, status };
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async getGasCustomer(customerId: number) {
        try {
            const { data } = await httpService.get<GasCustomer>(`${gas_customers}/${customerId}`);
            return data;
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async gasCustomerUpdate(customerId: number, gasVendorId: number, salePrice: number) {
        try {
            const values = {
                customer_id: customerId,
                gas_vendor_id: gasVendorId,
                sale_price: salePrice
            }
            const { data, status } = await httpService.put<GasCustomer>(`${gas_customers}/${customerId}`, values);
            return { data, status };
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    }
}

export default GAS_CUSTOMERS;

