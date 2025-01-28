import { createContext, useContext, ReactNode, useState } from "react";
import useCustomers from "@/hooks/use-customers";
import { Customer } from "@/core/interfaces/customer";
import { formCustomerSchema } from "@/schemas/forms/customer.schema";
import { z } from "zod";
import { GasCustomer } from "../interfaces/gas_customer";

interface CustomersContextType {
  customers: Customer[];
  createCustomer: (
    values: z.infer<typeof formCustomerSchema>
  ) => Promise<Customer | null>;
  getCustomers: () => Promise<Customer[] | []>;
  getById: (id: number) => Promise<Customer | null>;
  deleteCustomer: (id: number) => Promise<void>;
  updateCustomer: (
    id: number,
    values: z.infer<typeof formCustomerSchema>
  ) => Promise<void>;
  error: any;
  loading: boolean;
  isSuccessCustomer: boolean | null;
  isSuccessGasCustomer: boolean | null;
  isSuccessGasCustomerUpdate: boolean | null;
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
  downloadCustomersExcel: () => Promise<Blob | null>;
  getGasCustomer: (customerId: number) => Promise<GasCustomer | null>;
  updateGasCustomer: (
    customerId: number,
    gasVendorId: number,
    salePrice: number
  ) => Promise<{ data: GasCustomer; status: number } | null>;
  createGasCustomer: (
    customerId: number,
    gasVendorId: number,
    salePrice: number
  ) => Promise<GasCustomer | null>;
}

const CustomersContext = createContext<CustomersContextType | undefined>(
  undefined
);

export const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const customersData = useCustomers();
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <CustomersContext.Provider
      value={{ ...customersData, openAlert, setOpenAlert }}
    >
      {children}
    </CustomersContext.Provider>
  );
};

export const useCustomersContext = () => {
  const context = useContext(CustomersContext);
  if (!context) {
    throw new Error(
      "useCustomersContext debe usarse dentro de CustomersProvider"
    );
  }
  return context;
};
