import { customerTableColumns } from "@/app/customers/columns";
import { DataTable } from "@/app/data-table";
import { useCustomersContext } from "@/core/context/CustomerContext";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import CustomerForm from "@/app/customers/form";
import { formCustomerSchema } from "@/schemas/forms/customer.schema";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import useDownloadFiles from "@/hooks/use-download-files";
import GasCustomerForm from "@/app/customers/form-gas-customer";
import { formGasCustomerSchema } from "@/schemas/forms/gas-vendor.schema";
import { GasCustomer } from "@/core/interfaces/gas_customer";

function Customers() {
  const { toast } = useToast();
  const {
    customers,
    getById,
    setOpenAlert,
    openAlert,
    loading,
    deleteCustomer,
    getCustomers,
    updateCustomer,
    createCustomer,
    error,
    isSuccessCustomer,
    isSuccessGasCustomer,
    isSuccessGasCustomerUpdate,
    downloadCustomersExcel,
    getGasCustomer,
    updateGasCustomer,
    createGasCustomer,
  } = useCustomersContext();
  const { downloadBlob } = useDownloadFiles();
  const [currentCustomerId, setCurrentCustomerId] = useState<number | null>(
    null
  );
  const [currentGasCustomerId, setCurrentGasCustomerId] = useState<
    number | null
  >(null);
  const [isEditCustomerForm, setIsEditCustomerForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<z.infer<
    typeof formCustomerSchema
  > | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogGasVendor, setOpenDialogGasVendor] = useState(false);
  const [gasCustomerLoaded, setGasCustomerLoaded] =
    useState<GasCustomer | null>(null);

  const setUpdateCustomer = async (id: number) => {
    setCurrentCustomerId(id);
    setIsEditCustomerForm(true);
    setSelectedCustomer(await getById(id));
    setOpenDialog(true);
  };

  const setDeleteCustomer = (id: number) => {
    setCurrentCustomerId(id);
    setOpenAlert(true);
  };

  const confirmCustomerToDelete = async () => {
    if (currentCustomerId !== null) {
      await deleteCustomer(currentCustomerId);
      setOpenAlert(false);
      await getCustomers();
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setIsEditCustomerForm(false);
    setCurrentCustomerId(null);
  };

  const handleCreateCustomer = async (
    values: z.infer<typeof formCustomerSchema>
  ) => {
    await createCustomer(values);
    await getCustomers();
  };

  const handleCustomerUpdate = async (
    values: z.infer<typeof formCustomerSchema>
  ) => {
    if (currentCustomerId !== null) {
      await updateCustomer(currentCustomerId, values);
      setIsEditCustomerForm(false);
      setCurrentCustomerId(null);
    }
  };

  const handleGasCustomerUpdate = async (
    values: z.infer<typeof formGasCustomerSchema>
  ) => {
    if (currentCustomerId !== null) {
      await updateGasCustomer(
        currentCustomerId,
        Number(values.gas_vendor_id),
        values.sale_price
      );
      getCustomers();
    }
  };

  const handleGasCustomerCreate = async (
    values: z.infer<typeof formGasCustomerSchema>
  ) => {
    if (currentCustomerId !== null) {
      await createGasCustomer(
        currentCustomerId,
        Number(values.gas_vendor_id),
        values.sale_price
      );
      getCustomers();
    }
  };

  const handleDownloadCustomers = async () => {
    const excel = await downloadCustomersExcel();
    downloadBlob(excel, "customers");
  };

  const setCreateOrUpdateGasCustomer = async (
    customerId: number,
    gasCustomerId: number | null
  ) => {
    setCurrentCustomerId(customerId);
    if (gasCustomerId) {
      setCurrentGasCustomerId(gasCustomerId);
      setGasCustomerLoaded(await getGasCustomer(customerId));
      setOpenDialogGasVendor(true);
    } else {
      setGasCustomerLoaded(null);
      setCurrentGasCustomerId(null);
      setOpenDialogGasVendor(true);
    }
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: error.message || "An unexpected error occurred.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }

    if (isSuccessCustomer) {
      getCustomers();
      setOpenDialog(false);
      toast({
        variant: "default",
        title: "Customer created successfully.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }

    if (isSuccessGasCustomer || isSuccessGasCustomerUpdate) {
      setOpenDialogGasVendor(false);
      toast({
        variant: "default",
        title: "Gas Customer created successfully.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
  }, [
    isSuccessCustomer,
    isSuccessGasCustomer,
    isSuccessGasCustomerUpdate,
    error,
  ]);

  return (
    <>
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this customer?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              asChild={false}
              disabled={loading}
              onClick={confirmCustomerToDelete}
            >
              Continue {loading ? <Spinner /> : null}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="container mx-auto px-4">
        <div className="columns-7xl">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
            Customers
          </h1>
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <Button
              onClick={handleOpenDialog}
              variant="outline"
              className="mb-5"
            >
              New
            </Button>
            <Button
              onClick={handleDownloadCustomers}
              variant="outline"
              className="mb-5 ml-2 bg-green-600 text-white"
            >
              Export
            </Button>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Customer</DialogTitle>
                <DialogDescription>Create a new</DialogDescription>
              </DialogHeader>
              <CustomerForm
                initialValues={
                  isEditCustomerForm && currentCustomerId
                    ? selectedCustomer
                    : null
                }
                onSubmit={
                  isEditCustomerForm && currentCustomerId
                    ? handleCustomerUpdate
                    : handleCreateCustomer
                }
                loading={loading}
              />
            </DialogContent>
          </Dialog>
          <Dialog
            open={openDialogGasVendor}
            onOpenChange={setOpenDialogGasVendor}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Customer</DialogTitle>
                <DialogDescription>Update Gas Vendor</DialogDescription>
              </DialogHeader>
              <GasCustomerForm
                gasCustomer={gasCustomerLoaded}
                onSubmit={
                  currentGasCustomerId
                    ? handleGasCustomerUpdate
                    : handleGasCustomerCreate
                }
                loading={loading}
              />
            </DialogContent>
          </Dialog>
          <DataTable
            columns={customerTableColumns({
              onUpdate: setUpdateCustomer,
              onDelete: setDeleteCustomer,
              onCreateOrUpdateGasCustomer: setCreateOrUpdateGasCustomer,
            })}
            data={customers}
            filter="last_name"
          />
        </div>
      </div>
    </>
  );
}

export default Customers;
