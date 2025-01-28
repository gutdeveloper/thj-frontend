import { Customer } from './customer.ts';
import { GasVendor } from './gas_vendor.ts';

export interface GasCustomer {
    id: number;
    sale_price: number;
    benefit: number;
    customer_id: number;
    gas_vendor_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    gas_vendor: GasVendor;
    customer: Customer
}