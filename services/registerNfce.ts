import { Nfce } from "@/types";
import { api } from "./api";

export async function registerNfce(nfceKey: string) {
  try {
    const response = await api.post<{ nfce: Nfce }>("/nfce", { nfce_key: nfceKey });

    if (!response) {
      throw new Error('Failed to register NFC-e');
    }
  
    return response.data.nfce;    
  } catch (error) {
    console.error('ERROR', error)
  }
}