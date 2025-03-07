import { Options } from "@/@types/options";
import { UseFormReturn } from "react-hook-form";

export interface TipoEmpresa {
  idTipoEmpresa: number;
  tipoEmpresa: string;
  descricao: string;
}

export interface Banco {
  idBanco: number;
  codigo: string;
  banco: string;
}

export interface OcupacaoProfissional {
  idOcupacao: number;
  codCBO: string;
  ocupacao: string;
}

export interface Step {
  form: UseFormReturn<any>;
  tipoEmpresaOptions?: Options;
  bancoOptions?: Options;
  ocupacaoProfissionalOptions?: Options;
}
