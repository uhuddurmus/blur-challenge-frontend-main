import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  toggleEnterprise,
  deleteEnterprise,
  getEnterpriseById,
} from "../requests/enterprises-requests";
import { useEnterprises } from "../contexts/EnterprisesContext";

export default function EnterpriseDetailsModal({ enterpriseId, onClose }) {
  const { fetchEnterprises } = useEnterprises();
  const [enterprise, setEnterprise] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!enterpriseId) return;

    setLoading(true);
    getEnterpriseById(enterpriseId)
      .then((data) => setEnterprise(data))
      .finally(() => setLoading(false));
  }, [enterpriseId]);

  const handleToggle = async () => {
    try {
      await toggleEnterprise(enterprise.id); // toast burada çıkacak
      await fetchEnterprises(); // tabloyu güncelle
      onClose(); // modalı kapat
    } catch (err) {
      console.error("Aktiflik değiştirilemedi:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Şirket silinsin mi?")) return;

    try {
      await deleteEnterprise(enterprise.id); // toast burada çıkacak
      await fetchEnterprises(); // tabloyu güncelle
      onClose(); // modalı kapat
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  if (!enterpriseId) return null;

  return (
    <Dialog open={!!enterpriseId} onClose={onClose} fullWidth maxWidth="sm">
      {loading || !enterprise ? (
        <DialogContent
          sx={{ display: "flex", justifyContent: "center", p: 4 }}
        >
          <CircularProgress />
        </DialogContent>
      ) : (
        <>
          <DialogTitle>{enterprise.title}</DialogTitle>
          <DialogContent dividers>
            <Typography>
              <strong>Başlık:</strong> {enterprise.title}
            </Typography>
            <Typography>
              <strong>Email:</strong> {enterprise.email}
            </Typography>
            <Typography>
              <strong>Telefon:</strong> {enterprise.phone}
            </Typography>
            <Typography>
              <strong>Adres:</strong> {enterprise.address}
            </Typography>
            <Typography>
              <strong>Bakiye:</strong> {enterprise.balance}
            </Typography>
            <Typography>
              <strong>Doğrulandı mı?:</strong>{" "}
              {enterprise.verified ? "Evet" : "Hayır"}
            </Typography>
            <Typography>
              <strong>Vergi No:</strong> {enterprise.taxNumber}
            </Typography>
            <Typography>
              <strong>Vergi İli:</strong> {enterprise.taxAddress?.province}
            </Typography>
            <Typography>
              <strong>Vergi İlçesi:</strong> {enterprise.taxAddress?.district}
            </Typography>
            <Typography>
              <strong>Oluşturulma Tarihi:</strong>{" "}
              {new Date(enterprise.createdAt).toLocaleString()}
            </Typography>
            <Typography>
              <strong>Pasif mi?:</strong> {enterprise.disabled ? "Evet" : "Hayır"}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleToggle}
              color="warning"
              variant="contained"
            >
              {enterprise.disabled ? "Aktifleştir" : "Devre Dışı Bırak"}
            </Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Sil
            </Button>
            <Button onClick={onClose} color="inherit">
              Kapat
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
