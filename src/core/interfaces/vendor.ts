import { GasVendor } from "./gas_vendor";

export type Vendor = {
    id: number;
    name: string;
    country: string;
    cif: string;
    created_at: Date;
    gas_vendors: GasVendor[];
}