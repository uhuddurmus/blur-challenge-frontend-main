import { createContext, useContext, useState, useEffect } from "react";
import { getEnterprises } from "../requests/enterprises-requests";

const EnterprisesContext = createContext();

export const EnterprisesProvider = ({ children }) => {
    const [enterprises, setEnterprises] = useState([]);
    const [loading, setLoading] = useState(true);

const fetchEnterprises = async (verbose = false) => {
    try {
        setLoading(true);
        const data = await getEnterprises(verbose);
        setEnterprises(data || []);
    } catch (error) {
        console.error("Enterprises fetch error:", error);
    } finally {
        setLoading(false);
    }
};

    useEffect(() => {
        fetchEnterprises();
    }, []);

    return (
        <EnterprisesContext.Provider value={{ enterprises, loading, fetchEnterprises }}>
            {children}
        </EnterprisesContext.Provider>
    );
};

export const useEnterprises = () => useContext(EnterprisesContext);
