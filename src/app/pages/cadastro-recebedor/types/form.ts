import { Options } from "@/@types/options";
import { FormDataWizard } from "../wizard/stepForm";
import { ReceiverData } from "@/contexts/UserContext";


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
  tipoEmpresaOptions?: Options;
  bancoOptions?: Options;
  ocupacaoProfissionalOptions?: Options;
  formData: FormDataWizard;
  receiverData? : ReceiverData;
  nextStep?: () => void;
  prevStep?: () => void;
  setFormData?: (data: any) => void;
  handleSubmit?: (data: FormDataWizard) => void;
}
