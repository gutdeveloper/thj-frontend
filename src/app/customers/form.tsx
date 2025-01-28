import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formCustomerSchema } from "@/schemas/forms/customer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@/components/spinner";

type CustomerFormProps = {
  onSubmit: (values: z.infer<typeof formCustomerSchema>) => void;
  loading: boolean;
  initialValues: z.infer<typeof formCustomerSchema> | null;
};

export default function CustomerForm({
  onSubmit,
  loading,
  initialValues,
}: CustomerFormProps) {
  const form = useForm<z.infer<typeof formCustomerSchema>>({
    resolver: zodResolver(formCustomerSchema),
    defaultValues: initialValues || {
      name: "",
      last_name: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input autoComplete="off" placeholder="Last Name" {...field} />
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
