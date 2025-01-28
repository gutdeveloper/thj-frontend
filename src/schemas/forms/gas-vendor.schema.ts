import { z } from "zod";

export const formGasCustomerSchema = z.object({
    vendor_id: z.string().min(1).max(50),
    gas_vendor_id: z.string().min(1).max(20),
    sale_price: z.number().min(0).max(1000),
    purchase_price: z.number().min(0).max(1000),
    benefit: z.number().max(1000),
});

