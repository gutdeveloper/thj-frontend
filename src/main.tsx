import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./app/layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Vendors from "./pages/Vendors";
import { VendorsProvider } from "./core/context/VendorContext";
import { CustomersProvider } from "./core/context/CustomerContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index path="/" element={<Dashboard />} />
          <Route
            path="customers"
            element={
              <CustomersProvider>
                <Customers />
              </CustomersProvider>
            }
          ></Route>
          {/* <Route
            path="customers/negative-profit"
            element={<CustomersWithNegativeProfit />}
          /> */}

          <Route
            path="/vendors"
            element={
              <VendorsProvider>
                <Vendors />
              </VendorsProvider>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
