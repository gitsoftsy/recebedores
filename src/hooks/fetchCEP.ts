import { viaCEP } from "@/services/api";
import { CEP } from "@/@types/cep";

export const fetchCEP = async (cep: string): Promise<CEP | null> => {
  try {
    const response = await viaCEP.get<CEP>(`/${cep}/json`);

    if (response.status !== 200) {
      console.error(`Erro na requisição. Status: ${response.status}`);
      return null;
    }

    if (!response.data || !response.data.logradouro || !response.data.bairro) {
      console.error("Dados incompletos retornados pela API.");
      return null;
    }

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    return null;
  }
};
