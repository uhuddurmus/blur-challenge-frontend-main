import { useState } from "react";
import EnterpriseFormModal from "../components/EnterpriseFormModal";
import EnterprisesTable from "../components/EnterprisesTable";
import EnterpriseDetailsModal from "../components/EnterpriseDetailsModal";

export default function Enterprises() {
    const [showForm, setShowForm] = useState(false);
    const [selectedEnterprise, setSelectedEnterprise] = useState(null);
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-400"> 🏛️ Şirketler</h1>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded">
                    Yeni Şirket
                </button>
            </div>

            <EnterprisesTable onSelect={setSelectedEnterprise} />

            <EnterpriseFormModal isOpen={showForm} onClose={() => setShowForm(false)} />
            <EnterpriseDetailsModal enterpriseId={selectedEnterprise} onClose={() => setSelectedEnterprise(null)} />
        </div>
    );
}
