import httpService from "@/lib/httpService";
import API_CONSTANTS from "../constants/api.constants";
import { Customer } from "../interfaces/customer";
import { formCustomerSchema } from "@/schemas/forms/customer.schema";
import { z } from "zod";

const {
    customers,
    exports
} = API_CONSTANTS;

const CUSTOMERS_API = {
    async createCustomer(payload: z.infer<typeof formCustomerSchema>) {
        try {
            const { data, status } = await httpService.post<Customer>(customers, payload);
            return { data, status };
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async updateCustomer(id: number, values: z.infer<typeof formCustomerSchema>) {
        try {
            const { data, status } = await httpService.put<Customer>(`${customers}/${id}`, values);
            return { data, status };
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async getCustomers() {
        try {
            const { data } = await httpService.get<Customer[]>(customers);
            return data;
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async getCustomersWithNegativeBenefit() {
        try {
            const { data } = await httpService.get<Customer[]>(`${customers}/with-negative-benefit`);
            return data;
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async downloadCustomersExcel() {
        try {
            const { data } = await httpService.get<Blob>(`${exports}/customers`, {
                responseType: "blob"
            });
            return data;
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async getCustomerById(id: number) {
        try {
            const { data } = await httpService.get<Customer>(`${customers}/${id}`);
            return data;
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async deleteCustomer(id: number) {
        try {
            const { status } = await httpService.delete(`${customers}/${id}`);
            return { status };
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    }
}

export default CUSTOMERS_API;