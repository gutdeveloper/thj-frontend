import { VendorTableColumns } from "@/app/vendors/columns";
import { DataTable } from "@/app/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import VendorForm from "@/app/vendors/form";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { formVendorSchema } from "@/schemas/forms/vendor.schema";
import { z } from "zod";
import { useVendorsContext } from "@/core/context/VendorContext";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "../components/spinner";
import { Vendor } from "@/core/interfaces/vendor";
import useDownloadFiles from "@/hooks/use-download-files";

function Vendors() {
  const { toast } = useToast();
  const {
    vendors,
    createVendor,
    error,
    loading,
    isSuccess,
    getVendors,
    updateVendor,
    deleteVendor,
    openAlert,
    setOpenAlert,
    getById,
    downloadVendorsExcel,
  } = useVendorsContext();

  const { downloadBlob } = useDownloadFiles();

  const [openDialog, setOpenDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [vendorId, setVendorId] = useState<number | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<Vendor>();

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setIsEdit(false);
    setVendorId(null);
  };

  const handleCreateVendor = async (
    values: z.infer<typeof formVendorSchema>
  ) => {
    await createVendor(values);
    await getVendors();
  };

  const setDeleteVendor = (id: number) => {
    setVendorId(id);
    setOpenAlert(true);
  };

  const setUpdateVendor = async (id: number) => {
    setVendorId(id);
    setIsEdit(true);
    setSelectedVendor(await getById(id));
    setOpenDialog(true);
  };

  const confirmVendorToDelete = async () => {
    if (vendorId !== null) {
      await deleteVendor(vendorId);
      setOpenAlert(false);
      await getVendors();
    }
  };

  const handleUpdateVendor = async (
    values: z.infer<typeof formVendorSchema>
  ) => {
    if (vendorId !== null) {
      await updateVendor(vendorId, values);
      setIsEdit(false);
      setVendorId(null);
    }
  };

  const handleDownloadVendorsExcel = async () => {
    const excel = await downloadVendorsExcel();
    downloadBlob(excel, "vendors");
  };

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: error.message || "An unexpected error occurred.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }

    if (isSuccess) {
      getVendors();
      setOpenDialog(false);
      toast({
        variant: "default",
        title: "Vendor created successfully.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
  }, [isSuccess, error]);

  return (
    <>
      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this vendor?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              asChild={false}
              disabled={loading}
              onClick={confirmVendorToDelete}
            >
              Continue {loading ? <Spinner /> : null}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="container mx-auto px-4">
        <div className="columns-7xl">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
            Vendors
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
              onClick={handleDownloadVendorsExcel}
              variant="outline"
              className="mb-5 ml-2 bg-green-600 text-white"
            >
              Export
            </Button>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Vendor</DialogTitle>
                <DialogDescription>Create a new</DialogDescription>
              </DialogHeader>
              <VendorForm
                initialValues={isEdit && vendorId ? selectedVendor : undefined}
                onSubmit={
                  isEdit && vendorId ? handleUpdateVendor : handleCreateVendor
                }
                loading={loading}
              />
            </DialogContent>
          </Dialog>
          <DataTable
            columns={VendorTableColumns({
              onUpdate: setUpdateVendor,
              onDelete: setDeleteVendor,
            })}
            data={vendors}
            filter="name"
          />
        </div>
      </div>
    </>
  );
}

export default Vendors;
