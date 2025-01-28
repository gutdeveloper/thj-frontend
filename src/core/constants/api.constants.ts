const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const API_CONSTANTS = {
    customers: `${SERVER_URL}/api/v1/customers`,
    vendors: `${SERVER_URL}/api/v1/vendors`,
    gas_customers: `${SERVER_URL}/api/v1/gas-customers`,
    exports: `${SERVER_URL}/api/v1/exports`,
}
export default API_CONSTANTS;