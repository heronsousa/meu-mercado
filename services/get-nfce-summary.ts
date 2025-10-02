import { NfceSummary } from "@/types";
import { AxiosError } from "axios";
import { api } from "./api";

export async function getNfceSummary() {
  try {
    const response = await api.get<NfceSummary>("/nfce");

    if (!response) {
      throw "Falha ao buscar dados";
    }

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.message;
    }
    throw error;
  }
}