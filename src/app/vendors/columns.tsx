import { Vendor } from "@/core/interfaces/vendor";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VendorTableColumnsProps {
  onUpdate: (customerId: number) => void;
  onDelete: (customerId: number) => void;
}

export const VendorTableColumns = ({
  onUpdate,
  onDelete,
}: VendorTableColumnsProps) => {
  const columns: ColumnDef<Vendor>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      accessorKey: "cif",
      header: "Cif",
    },
    {
      accessorKey: "created_at",
      header: "Creation Date",
    },
    {
      accessorKey: "Actions",
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const vendor = row.original;

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
              <DropdownMenuItem onClick={() => onUpdate(vendor.id)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(vendor.id)}>
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
