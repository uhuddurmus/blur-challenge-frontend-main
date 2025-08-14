import { simpleAPICall } from "../utils/requesting";

const API_BASE = "http://localhost:5153/api/companies";

export const getEnterprises = (verbose = false) => {
  return simpleAPICall({
    endpoint: API_BASE,
    method: "GET",
    verbose,
  });
};

export const getEnterpriseById = (id, verbose = false) => {
  return simpleAPICall({
    endpoint: `${API_BASE}/${id}`,
    method: "GET",
    verbose,
  });
};

export const createEnterprise = (data, verbose = false) => {
  return simpleAPICall({
    endpoint: API_BASE,
    body: JSON.stringify(data),
    method: "POST",
    options: { headers: { "Content-Type": "application/json" } },
    verbose,
    successMessage: "Şirket başarıyla oluşturuldu.",
  });
};

export const toggleEnterprise = (id, verbose = false) => {
  return simpleAPICall({
    endpoint: `${API_BASE}/${id}/toggle`,
    method: "PUT",
    verbose,
    successMessage: "Şirket aktiflik durumu başarıyla değiştirildi.",
  });
};

export const deleteEnterprise = (id, verbose = false) => {
  return simpleAPICall({
    endpoint: `${API_BASE}/${id}`,
    method: "DELETE",
    verbose,
    successMessage: "Şirket başarıyla silindi.",
  });
};
