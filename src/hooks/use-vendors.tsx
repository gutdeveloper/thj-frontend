import VENDORS_API from "@/core/api/vendors.api";
import { Vendor } from "@/core/interfaces/vendor";
import { formVendorSchema } from "@/schemas/forms/vendor.schema";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function useVendors() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const getVendors = async () => {
    try {
      const vendors = await VENDORS_API.getVendors();
      setVendors(vendors);
    } catch (err) {
      setError(err);
    }
  };

  const createVendor = async (values: z.infer<typeof formVendorSchema>) => {
    try {
      setLoading(true);
      setIsSuccess(null);
      setError(null);

      const vendor = await VENDORS_API.createVendor(values);

      if (vendor.status === 201) {
        setIsSuccess(true);
      }
    } catch (err) {
      setError(err);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id: number) => {
    try {
      setError(null);
      const vendor = await VENDORS_API.getVendorById(id);
      return vendor;
    } catch (err) {
      setError(err);
    }
  };

  const updateVendor = async (
    id: number,
    values: z.infer<typeof formVendorSchema>
  ) => {
    try {
      setLoading(true);
      setIsSuccess(null);
      setError(null);
      const vendor = await VENDORS_API.updateVendor(id, values);
      if (vendor.status === 200) {
        setIsSuccess(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteVendor = async (id: number) => {
    try {
      setLoading(true);
      setIsSuccess(null);
      setError(null);
      const vendor = await VENDORS_API.deleteVendor(id);
      if (vendor.status === 204) {
        setIsSuccess(true);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const downloadVendorsExcel = async () => {
    try {
      const excel = await VENDORS_API.downloadVendorsExcel();
      return excel;
    } catch (err) {
      setError(err);
      return null;
    }
  };

  useEffect(() => {
    getVendors();
  }, []);
  return {
    vendors,
    createVendor,
    getById,
    getVendors,
    updateVendor,
    deleteVendor,
    error,
    loading,
    isSuccess,
    downloadVendorsExcel,
  };
}
