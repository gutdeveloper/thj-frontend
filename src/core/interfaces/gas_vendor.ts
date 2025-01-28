import { Vendor } from "./vendor";

export interface GasVendor {
    id: number;
    name: string;
    purchase_price: number;
    created_at: Date;
    updated_at: Date;
    vendor_id: number;
    vendor: Vendor;
    deleted_at: null;
}
