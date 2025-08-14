import { toast } from "react-toastify";

// Tek tip API çağrısı
export const simpleAPICall = async ({
  endpoint,
  body = null,
  method = "POST",
  options = {},
  verbose = false,
  successMessage = null, // ✅ Başarı mesajı
}) => {
  const fetchOptions = {
    method,
    ...options,
    headers: {
      ...options.headers,
    },
  };

  if (method !== "GET" && method !== "HEAD" && body) {
    fetchOptions.body = body;
  }

  const response = await fetch(endpoint, fetchOptions);

  let result = null;
  if (response.status !== 204) {
    try {
      result = await response.json();
    } catch {
      result = {};
    }
  }

  if (!response.ok) {
    let message = result?.detail;

    if (!message && result?.errors) {
      const firstKey = Object.keys(result.errors)[0];
      if (firstKey && result.errors[firstKey]?.length > 0) {
        message = result.errors[firstKey][0];
      }
    }

    toast.error(message || "Bir hata oluştu.");
    throw { status: response.status, message };
  } else {
    // ✅ Başarı mesajı mantığı
    if (successMessage) {
      toast.success(successMessage);
    } else if (result?.id) {
      toast.success("Değişiklik başarıyla kaydedildi");
    } else if (response.status === 204) {
      toast.success("İşlem başarıyla tamamlandı");
    }

    if (verbose) console.log(result);
    return result?.data ?? null;
  }
};
