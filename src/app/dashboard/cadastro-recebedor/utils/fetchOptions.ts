import { apiDev } from "@/services/api";
import { Options } from "@/utils/types/options";
import { Banco, OcupacaoProfissional, TipoEmpresa } from "../types/form";
import { Bancos, Ocupacoes, TiposEmpresas } from "../types/request";

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

export const fetchOcupacaoProfissional = async (): Promise<Options> => {
  const response = await apiDev.get<Ocupacoes>("/ocupacoes");

  return response.data.ocupacoes.map((item: OcupacaoProfissional) => ({
    value: item.idOcupacao,
    label: item.ocupacao,
  }));
};