import { GasCustomer } from "./gas_customer";

export interface Customer {
    id: number;
    name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
    gas_customer?: GasCustomer;
}