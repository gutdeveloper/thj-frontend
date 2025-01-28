import { z } from "zod";

export const formVendorSchema = z.object({
    name: z.string().min(2).max(50),
    country: z.string().min(2).max(20),
    cif: z.string().min(9).max(9),
});

