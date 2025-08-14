import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEnterprises } from "../contexts/EnterprisesContext";

export default function EnterprisesTable({ onSelect }) {
  const { enterprises, loading } = useEnterprises();
  const [verifiedFilter, setVerifiedFilter] = React.useState("");
  const [activeFilter, setActiveFilter] = React.useState("");

  const columns = [
    { field: "title", headerName: "Şirket Adı", flex: 1, sortable: true },
    {
      field: "balance",
      headerName: "Bakiye",
      flex: 1,
      sortable: true,
      type: "number",
    },
    {
      field: "createdAt",
      headerName: "Oluşturulma Tarihi",
      flex: 1,
      sortable: true,
      valueFormatter: (params) =>
        new Date(params.value).toLocaleString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      field: "verified",
      headerName: "Doğrulandı",
      flex: 0.8,
      sortable: true,
      renderCell: (params) => (params.value ? "Evet" : "Hayır"),
    },
    {
      field: "active",
      headerName: "Aktif",
      flex: 0.8,
      sortable: true,
      renderCell: (params) => (params.value ? "Evet" : "Hayır"),
    },
  ];

  const rows = enterprises?.map((ent) => ({
    id: ent.id,
    title: ent.title,
    balance: ent.balance,
    createdAt: ent.createdAt,
    verified: ent.verified,
    active: !ent.disabled,
  }));

  const filteredRows = rows?.filter((row) => {
    return (
      (verifiedFilter === "" || row.verified === (verifiedFilter === "true")) &&
      (activeFilter === "" || row.active === (activeFilter === "true"))
    );
  });

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <Paper sx={{ width: "100%", p: 2 }}>
      <div style={{ width: "100%", height: "473px" }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSizeOptions={[7]}
          initialState={{
            pagination: { paginationModel: { pageSize: 7, page: 0 } },
          }}
          hideFooterSelectedRowCount
          onRowClick={(params) => onSelect(params.row.id)}
          sx={{
            border: 0,
            "& .MuiDataGrid-row": {
              cursor: "pointer",
            },
          }}
        />
      </div>
    </Paper>
  );
}
