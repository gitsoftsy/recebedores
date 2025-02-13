import { viaCEP } from "@/services/api";
import { CEP } from "@/utils/types/cep";

export const fetchCEP = async (cep: string): Promise<CEP> => {
    const response = await viaCEP.get<CEP>(`/${cep}/json`);
    return response.data
};
