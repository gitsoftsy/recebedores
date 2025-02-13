import { apiDev } from "@/services/api";
import { Options } from "@/utils/types/options";
import { Banco, TipoEmpresa } from "../types/form";
import { Bancos, TiposEmpresas } from "../types/request";

export const fetchTipoEmpresa = async (): Promise<Options> => {
  const response = await apiDev.get<TiposEmpresas>("/tipoEmpresa");

  return response.data.tiposEmpresa.map((item: TipoEmpresa) => ({
    value: item.idTipoEmpresa,
    label: item.tipoEmpresa,
  }));
};


export const fetchBanco = async (): Promise<Options> => {
  const response = await apiDev.get<Bancos>("/bancos");

  return response.data.bancos.map((item: Banco) => ({
    value: item.idBanco,
    label: item.banco,
  }));
};