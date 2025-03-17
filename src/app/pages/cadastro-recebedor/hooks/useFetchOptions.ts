import { Options } from "@/@types/options";
import { useEffect, useState } from "react";
import {
  fetchBanco,
  fetchOcupacaoProfissional,
  fetchTipoEmpresa,
} from "../actions/fetchOptions";

export const useFetchOptions = () => {
  const [tipoEmpresaOptions, setTipoEmpresaOptions] = useState<Options>([]);
  const [bancoOptions, setBancoOptions] = useState<Options>([]);
  const [ocupacaoProfissionalOptions, setOcupacaoProfissionalOptions] =
    useState<Options>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTipoEmpresaOptions(await fetchTipoEmpresa());
        setBancoOptions(await fetchBanco());
        setOcupacaoProfissionalOptions(await fetchOcupacaoProfissional());
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  return { tipoEmpresaOptions, bancoOptions, ocupacaoProfissionalOptions };
};
