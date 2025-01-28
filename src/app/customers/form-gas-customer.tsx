import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/spinner";
import { formGasCustomerSchema } from "@/schemas/forms/gas-vendor.schema";
import { GasCustomer } from "@/core/interfaces/gas_customer";
import useVendors from "@/hooks/use-vendors";
import { useEffect, useState } from "react";
import { GasVendor } from "@/core/interfaces/gas_vendor";

type CustomerFormProps = {
  onSubmit: (values: z.infer<typeof formGasCustomerSchema>) => void;
  loading: boolean;
  gasCustomer: GasCustomer | null;
};

export default function GasCustomerForm({
  gasCustomer,
  onSubmit,
  loading,
}: CustomerFormProps) {
  const initialValues: z.infer<typeof formGasCustomerSchema> = {
    vendor_id: String(gasCustomer?.gas_vendor?.vendor?.id || ""),
    gas_vendor_id: String(gasCustomer?.gas_vendor?.id || ""),
    sale_price: gasCustomer?.sale_price || 0,
    purchase_price: gasCustomer?.gas_vendor?.purchase_price || 0,
    benefit: gasCustomer?.benefit || 0,
  };

  const form = useForm<z.infer<typeof formGasCustomerSchema>>({
    resolver: zodResolver(formGasCustomerSchema),
    defaultValues: initialValues,
  });

  const { vendors, getById } = useVendors();
  const [gasVendors, setGasVendors] = useState<GasVendor[]>([]);
  const [isUserInteraction, setIsUserInteraction] = useState(false);

  const { watch, setValue } = form;

  const onChangeVendor = watch("vendor_id");
  const onChangeGasVendor = watch("gas_vendor_id");

  const handleVendorChange = (value: string) => {
    setIsUserInteraction(true);
    setValue("vendor_id", value);
  };

  const handleBenefitChange = (salePrice: number) => {
    const purchasePrice = Number(form.getValues("purchase_price"));
    const benefit = Number(salePrice) - purchasePrice;
    setValue("benefit", benefit);
  };

  useEffect(() => {
    const fetchGasVendors = async () => {
      if (onChangeVendor) {
        const vendor = await getById(Number(onChangeVendor));
        setGasVendors(vendor?.gas_vendors || []);
        if (isUserInteraction) {
          setValue("purchase_price", 0);
          setValue("sale_price", 0);
          setValue("benefit", 0);
        }
      }
    };

    fetchGasVendors();
  }, [onChangeVendor]);

  useEffect(() => {
    if (onChangeGasVendor) {
      const gasVendor = gasVendors.find(
        (gasVendor) => String(gasVendor.id) === onChangeGasVendor
      );
      if (gasVendor) {
        setValue("purchase_price", gasVendor.purchase_price);
        setValue("sale_price", 0);
        setValue("benefit", 0);
      }
    }
  }, [onChangeGasVendor]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="vendor_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  handleVendorChange(value);
                }}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Vendor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vendors.map((vendor) => (
                    <SelectItem key={vendor.id} value={String(vendor.id)}>
                      {vendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gas_vendor_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gas Vendor</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Gas Vendor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {gasVendors.map((gasVendor) => (
                    <SelectItem key={gasVendor.id} value={String(gasVendor.id)}>
                      {gasVendor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchase_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Price</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  autoComplete="off"
                  placeholder="Purchase Price"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sale_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sale Price</FormLabel>
              <FormControl>
                <Input
                  onKeyUp={(e) =>
                    handleBenefitChange(Number(e.currentTarget.value))
                  }
                  autoComplete="off"
                  placeholder="Sale Price"
                  {...field}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    field.onChange(value);
                    handleBenefitChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="benefit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Benefit</FormLabel>
              <FormControl>
                <Input
                  disabled
                  autoComplete="off"
                  placeholder="Benefit"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button disabled={loading} type="submit">
            Save {loading ? <Spinner /> : null}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
