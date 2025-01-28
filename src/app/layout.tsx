import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import DangerAlert from "@/components/AlertsClients";
import { useEffect, useState } from "react";
import GAS_CUSTOMERS from "@/core/api/gas_customers.api";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [customersWithNegativeBenefit, setCustomersWithNegativeBenefit] =
    useState<number>();
  const [_, setError] = useState<any>(null);
  const getCustomersWithNegativeProfit = async () => {
    try {
      const benefit = await GAS_CUSTOMERS.getCustomersWithNegativeBenefit();
      setCustomersWithNegativeBenefit(benefit);
    } catch (err) {
      setError(err);
    }
  };
  useEffect(() => {
    getCustomersWithNegativeProfit();
  }, []);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        <div className="fixed top-0 right-0 z-50 p-4">
          {customersWithNegativeBenefit! > 0 && (
            <DangerAlert
              title="Negative Profit"
              description={`you have ${customersWithNegativeBenefit} clients with negative profit margin`}
              url="/customers?negative_benefit=true"
            />
          )}
        </div>
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
