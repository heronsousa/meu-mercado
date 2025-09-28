import { Nfce } from "@/types";
import { AxiosError } from "axios";
import { api } from "./api";

export async function registerNfce(nfceKey: string) {
  try {
    const response = await api.post<{ nfce: Nfce }>("/nfce", {
      nfce_key: nfceKey,
    });

    if (!response) {
      throw "Falha ao registrar NFC-e";
    }

    console.log(response);

    return response.data.nfce;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.message;
    }
    throw error;
  }
}