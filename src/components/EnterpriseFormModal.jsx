import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { createEnterprise } from "../requests/enterprises-requests";
import { useEnterprises } from "../contexts/EnterprisesContext";

export default function EnterpriseFormModal({ isOpen, onClose }) {
  const { fetchEnterprises } = useEnterprises();

  const initialForm = {
    title: "",
    phone: "",
    email: "",
    balance: 0,
    address: "",
    taxNumber: "",
    taxAddress: { province: "", district: "" },
  };

  const [form, setForm] = React.useState(initialForm);
  const [errors, setErrors] = React.useState({});

  const validate = (fieldValues = form) => {
    let temp = { ...errors };

    if ("title" in fieldValues)
      temp.title = fieldValues.title ? "" : "Şirket adı zorunludur.";

    if ("phone" in fieldValues)
      temp.phone = /^90\d{10}$/.test(fieldValues.phone)
        ? ""
        : "Telefon formatı 90xxxxxxxxxx olmalı.";

    if ("email" in fieldValues)
      temp.email = /\S+@\S+\.\S+/.test(fieldValues.email)
        ? ""
        : "Geçerli bir e-posta giriniz.";

    if ("taxNumber" in fieldValues)
      temp.taxNumber =
        fieldValues.taxNumber.length === 10
          ? ""
          : "Vergi numarası 10 haneli olmalı.";

    if ("province" in fieldValues.taxAddress || "taxAddress" in fieldValues)
      temp.province = fieldValues.taxAddress.province
        ? ""
        : "Vergi ili zorunludur.";

    if ("district" in fieldValues.taxAddress || "taxAddress" in fieldValues)
      temp.district = fieldValues.taxAddress.district
        ? ""
        : "Vergi ilçesi zorunludur.";

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    validate({ ...form, [field]: value });
  };

  const handleTaxAddressChange = (subField, value) => {
    const updated = {
      ...form,
      taxAddress: { ...form.taxAddress, [subField]: value },
    };
    setForm(updated);
    validate(updated);
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      ...form,
      balance: Number(form.balance) || 0,
      taxNumber: Number(form.taxNumber) || 0, // string → number dönüşümü
      taxAddress: {
        province: form.taxAddress.province,
        district: form.taxAddress.district,
      },
    };

    try {
      await createEnterprise(payload);
      fetchEnterprises();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = () => {
    setForm(initialForm);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Yeni Şirket Oluştur</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Şirket Adı"
          fullWidth
          margin="dense"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Telefon (90xxxxxxxxxx)"
          fullWidth
          margin="dense"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          label="Email"
          fullWidth
          margin="dense"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Bakiye"
          type="number"
          fullWidth
          margin="dense"
          value={form.balance}
          onChange={(e) => handleChange("balance", parseFloat(e.target.value))}
        />
        <TextField
          label="Adres"
          fullWidth
          margin="dense"
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        <TextField
          label="Vergi No (10 hane)"
          fullWidth
          margin="dense"
          value={form.taxNumber}
          onChange={(e) => handleChange("taxNumber", e.target.value)}
          error={!!errors.taxNumber}
          helperText={errors.taxNumber}
        />
        <TextField
          label="Vergi İli"
          fullWidth
          margin="dense"
          value={form.taxAddress.province}
          onChange={(e) => handleTaxAddressChange("province", e.target.value)}
          error={!!errors.province}
          helperText={errors.province}
        />
        <TextField
          label="Vergi İlçesi"
          fullWidth
          margin="dense"
          value={form.taxAddress.district}
          onChange={(e) => handleTaxAddressChange("district", e.target.value)}
          error={!!errors.district}
          helperText={errors.district}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          İptal
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Onay
        </Button>
      </DialogActions>
    </Dialog>
  );
}
