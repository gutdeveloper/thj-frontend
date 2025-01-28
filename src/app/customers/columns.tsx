"use client";

import { Customer } from "@/core/interfaces/customer";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface customerTableColumnsProps {
  onUpdate: (customerId: number) => void;
  onDelete: (customerId: number) => void;
  onCreateOrUpdateGasCustomer: (
    customerId: number,
    gasCustomerId: number | null
  ) => void;
}

export const customerTableColumns = ({
  onUpdate,
  onDelete,
  onCreateOrUpdateGasCustomer,
}: customerTableColumnsProps) => {
  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
    },
    {
      accessorKey: "purchase_price",
      header: "Purchase Price",
      cell: ({ row }) => {
        const customer = row.original;
        const purchasePrice = customer.gas_customer?.gas_vendor.purchase_price;
        return (
          <>
            {purchasePrice && (
              <span>$ {customer.gas_customer?.gas_vendor?.purchase_price}</span>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "sale_price",
      header: "Sale Price",
      cell: ({ row }) => {
        const customer = row.original;
        const salePrice = customer.gas_customer?.sale_price;
        return (
          <>{salePrice && <span>$ {customer.gas_customer?.sale_price}</span>}</>
        );
      },
    },

    {
      accessorKey: "benefit",
      header: "Benefit",
      cell: ({ row }) => {
        const customer = row.original;
        const benefit = customer.gas_customer?.benefit;
        return (
          <>
            {benefit && (
              <span className={benefit < 0 ? "text-red-600 font-bold" : ""}>
                {benefit}
              </span>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
      cell: ({ row }) => {
        const customer = row.original;
        const vendorName = customer.gas_customer?.gas_vendor.vendor.name;
        const gasVendorName = customer.gas_customer?.gas_vendor.name;
        return (
          <>
            {vendorName && gasVendorName && (
              <>
                <Badge className="mr-2">{vendorName}</Badge>
                <Badge variant={"outline"} className="font-bold">
                  {gasVendorName}
                </Badge>
              </>
            )}
          </>
        );
      },
    },
    {
      accessorKey: "Actions",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const customer = row.original;
        const customerId = customer.id;
        const gasCustomerId = customer.gas_customer?.id || null;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {customer && (
                <DropdownMenuItem
                  onClick={() => {
                    onCreateOrUpdateGasCustomer(customerId, gasCustomerId);
                  }}
                >
                  Vendor
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => onUpdate(customer.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onDelete(customer.id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
