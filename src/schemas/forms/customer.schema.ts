import { z } from "zod";

export const formCustomerSchema = z.object({
    name: z.string().min(2).max(50),
    last_name: z.string().min(2).max(20),
});

