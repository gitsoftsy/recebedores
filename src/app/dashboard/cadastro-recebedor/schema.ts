import { z } from "zod"
 
export const formSchema = z.object({
  cpnj: z.string(),
  nomeFantasia: z.string(),
  email: z.string(),
  razaoSocial: z.string(),
  site: z.string().nullable().optional(),
  receitaAnual: z.string(),
  tipoEmpresa: z.string(),
  dataFundacaoEmpresa: z
  .string()
  .refine(
    (value) => {
      const today = new Date();
      const selectedDate = new Date(value);
      return selectedDate <= today;
    },
    {
      message: "A data de fundação não pode ser maior que a data atual.",
    }
  ),
  banco: z.string(),
  agencia: z.string(),
  conta: z.string().nullable().optional(),
  cepEmpresa: z.string(),
  enderecoEmpresa: z.string(),
  numeroEmpresa: z.string(),
  bairroEmpresa: z.string(),
  complementoEmpresa: z.string().nullable().optional(),
  cidadeEmpresa: z.string(),
  estadoEmpresa: z.string(),
  pontoReferenciaEmpresa: z.string().nullable().optional(),
  telefoneFixoEmpresa: z.string().nullable().optional(),
  telefoneCelularEmpresa: z.string().nullable().optional(),    
  nomeRepresentante: z.string(),
  emailRepresentante: z.string(),
  cpfRepresentante: z.string(),
  dataNascimento: z.string(),
  nomeMaeRepresentante: z.string(),
  ocupacaoProfissional: z.string(),
  rendaMensal: z.string(),
  cepRepresentante: z.string(),
  enderecoRepresentante: z.string(),
  numeroRepresentante: z.string(),
  bairroRepresentante: z.string(),
  complementoRepresentante: z.string().nullable().optional(),
  cidadeRepresentante: z.string(),
  estadoRepresentante: z.string(),
  pontoReferenciaRepresentante: z.string().nullable().optional(),
  telefoneFixoRepresentante: z.string().nullable().optional(),
  telefoneCelularRepresentante: z.string().nullable().optional(),    
})

export type FormData = z.infer<typeof formSchema>