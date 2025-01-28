import CUSTOMERS_API from "@/core/api/customers.api";
import GAS_CUSTOMERS from "@/core/api/gas_customers.api";
import { Customer } from "@/core/interfaces/customer";
import { formCustomerSchema } from "@/schemas/forms/customer.schema";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { z } from "zod";

export default function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccessCustomer, setIsSuccessCustomer] = useState<boolean | null>(
    null
  );
  const [isSuccessGasCustomer, setIsSuccessGasCustomer] = useState<
    boolean | null
  >(null);
  const [isSuccessGasCustomerUpdate, setIsSuccessGasCustomerUpdate] = useState<
    boolean | null
  >(null);
  const [searchParams, _] = useSearchParams();

  const negativeProfit = Boolean(searchParams.get("negative_benefit"));

  const getCustomers = async () => {
    try {
      const customers = await CUSTOMERS_API.getCustomers();
      setCustomers(customers);
    } catch (err) {
      setError(err);
    }
  };

  const getCustomersWithNegativeBenefit = async () => {
    try {
      const customers = await CUSTOMERS_API.getCustomersWithNegativeBenefit();
      setCustomers(customers);
    } catch (err) {
      setError(err);
    }
  };

  const downloadCustomersExcel = async () => {
    try {
      const excel = await CUSTOMERS_API.downloadCustomersExcel();
      return excel;
    } catch (err) {
      setError(err);
    }
  };

  const createCustomer = async (values: z.infer<typeof formCustomerSchema>) => {
    try {
      setLoading(true);
      setIsSuccessCustomer(null);
      setError(null);

      const customer = await CUSTOMERS_API.createCustomer(values);

      if (customer.status === 201) {
        setIsSuccessCustomer(true);
      }
    } catch (err) {
      setError(err);
      setIsSuccessCustomer(false);
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id: number) => {
    try {
      setError(null);
      const customer = await CUSTOMERS_API.getCustomerById(id);
      return customer;
    } catch (err) {
      setError(err);
    }
  };

  const updateCustomer = async (
    id: number,
    values: z.infer<typeof formCustomerSchema>
  ) => {
    try {
      setLoading(true);
      setIsSuccessCustomer(null);
      setError(null);
      const customer = await CUSTOMERS_API.updateCustomer(id, values);
      if (customer.status === 200) {
        setIsSuccessCustomer(true);
      }
    } catch (err) {
      setError(err);
      setIsSuccessCustomer(false);
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id: number) => {
    try {
      setLoading(true);
      setIsSuccessCustomer(null);
      setError(null);
      const customer = await CUSTOMERS_API.deleteCustomer(id);
      if (customer.status === 204) {
        setIsSuccessCustomer(true);
      }
    } catch (err) {
      setError(err);
      setIsSuccessCustomer(false);
    } finally {
      setLoading(false);
    }
  };

  const getGasCustomer = async (customerId: number) => {
    try {
      setLoading(true);
      const gasCustomer = await GAS_CUSTOMERS.getGasCustomer(customerId);
      return gasCustomer;
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const createGasCustomer = async (
    customerId: number,
    gasVendorId: number,
    salePrice: number
  ) => {
    try {
      setLoading(true);
      setIsSuccessGasCustomer(null);
      setError(null);

      const gasCustomer = await GAS_CUSTOMERS.createGasCustomer(
        customerId,
        gasVendorId,
        salePrice
      );
      if (gasCustomer.status === 201) {
        setIsSuccessGasCustomer(true);
      }
      return gasCustomer;
    } catch (error) {
      setError(error);
      setIsSuccessGasCustomer(false);
    } finally {
      setLoading(false);
    }
  };

  const updateGasCustomer = async (
    customerId: number,
    gasVendorId: number,
    salePrice: number
  ) => {
    try {
      setLoading(true);
      setIsSuccessGasCustomerUpdate(null);
      setError(null);
      const gasCustomer = await GAS_CUSTOMERS.gasCustomerUpdate(
        customerId,
        gasVendorId,
        salePrice
      );
      if (gasCustomer.status === 200) {
        setIsSuccessGasCustomerUpdate(true);
      }
      return gasCustomer;
    } catch (error) {
      setError(error);
      setIsSuccessGasCustomerUpdate(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCustomers([]);
    if (negativeProfit) {
      getCustomersWithNegativeBenefit();
    } else {
      getCustomers();
    }
  }, [negativeProfit]);
  return {
    customers,
    error,
    getById,
    loading,
    isSuccessCustomer,
    isSuccessGasCustomer,
    isSuccessGasCustomerUpdate,
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    getCustomersWithNegativeBenefit,
    downloadCustomersExcel,
    getGasCustomer,
    updateGasCustomer,
    createGasCustomer,
  };
}
