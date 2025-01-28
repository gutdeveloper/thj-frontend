import { createContext, useContext, ReactNode, useState } from "react";
import useVendors from "@/hooks/use-vendors";
import { Vendor } from "@/core/interfaces/vendor";
import { formVendorSchema } from "@/schemas/forms/vendor.schema";
import { z } from "zod";

interface VendorsContextType {
  vendors: Vendor[];
  createVendor: (values: z.infer<typeof formVendorSchema>) => Promise<void>;
  getVendors: () => Promise<void>;
  getById: (id: number) => Promise<Vendor | undefined>;
  deleteVendor: (id: number) => Promise<void>;
  updateVendor: (
    id: number,
    values: z.infer<typeof formVendorSchema>
  ) => Promise<void>;
  error: any;
  loading: boolean;
  isSuccess: boolean | null;
  openAlert: boolean;
  setOpenAlert: (open: boolean) => void;
  downloadVendorsExcel: () => Promise<Blob>;
}

const VendorsContext = createContext<VendorsContextType | undefined>(undefined);

export const VendorsProvider = ({ children }: { children: ReactNode }) => {
  const vendorsData = useVendors();
  const [openAlert, setOpenAlert] = useState(false);

  return (
    <VendorsContext.Provider
      value={{ ...vendorsData, openAlert, setOpenAlert }}
    >
      {children}
    </VendorsContext.Provider>
  );
};

export const useVendorsContext = () => {
  const context = useContext(VendorsContext);
  if (!context) {
    throw new Error("useVendorsContext debe usarse dentro de VendorsProvider");
  }
  return context;
};
