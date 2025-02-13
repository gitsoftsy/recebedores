import { Options } from "@/utils/types/options";
import { useEffect, useState } from "react";
import { fetchBanco, fetchTipoEmpresa } from "../utils/fetchOptions";

export const useFetchOptions = () => {
  const [tipoEmpresaOptions, setTipoEmpresaOptions] = useState<Options>([]);
  const [bancoOptions, setBancoOptions] = useState<Options>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTipoEmpresaOptions(await fetchTipoEmpresa());
        setBancoOptions(await fetchBanco());
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData()
  }, []);

  return { tipoEmpresaOptions, bancoOptions };
};
