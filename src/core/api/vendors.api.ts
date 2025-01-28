import httpService from "@/lib/httpService";
import API_CONSTANTS from "../constants/api.constants";
import { Vendor } from "../interfaces/vendor";
import { formVendorSchema } from "@/schemas/forms/vendor.schema";
import { z } from "zod";

const {
    vendors,
    exports
} = API_CONSTANTS;

const VENDORS_API = {
    async getVendors() {
        try {
            const { data } = await httpService.get<Vendor[]>(vendors);
            return data;
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async getVendorById(id: number) {
        try {
            const { data } = await httpService.get<Vendor>(`${vendors}/${id}`);
            return data;
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async createVendor(payload: z.infer<typeof formVendorSchema>) {
        try {
            const { data, status } = await httpService.post<Vendor>(vendors, payload);
            return { data, status };
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async updateVendor(id: number, values: z.infer<typeof formVendorSchema>) {
        try {
            const { data, status } = await httpService.put<Vendor>(`${vendors}/${id}`, values);
            return { data, status };
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async deleteVendor(id: number) {
        try {
            const { status } = await httpService.delete(`${vendors}/${id}`);
            return { status };
        } catch (error: any) {
            const status = error.response?.status || 500;
            const message =
                error.response?.data?.message || 'Error processing the request.';
            throw { status, message };
        }
    },
    async downloadVendorsExcel() {
        try {
            const { data } = await httpService.get<Blob>(`${exports}/vendors`, {
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
}

export default VENDORS_API;