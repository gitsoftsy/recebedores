import { z } from "zod";
const telefoneRegex = /^\d{2}-\d{9}$/;

const optionalString = z
  .string()
  .nullable()
  .optional()
  .transform((value) => (value?.trim() ? value : null));

export const step3Schema = z
  .object({
    nomeRespLegal: z.string().min(1, "Este campo é obrigatório."),
    emailRespLegal: z
      .string()
      .min(1, "Este campo é obrigatório.")
      .email("Email inválido"),
    cpfRespLegal: z
      .string()
      .min(14, "CPF inválido")
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
      .transform((value) => value.replace(/\D/g, "")),
    dataNascimentoRespLegal: z
      .string()
      .min(1, "Este campo é obrigatório.")
      .refine((value) => new Date(value) <= new Date(), {
        message: "A data não pode ser maior que a data atual.",
      }),
    nomeMaeRespLegal: z.string().min(1, "Este campo é obrigatório."),
    idOcupacao: z.string().min(1, "Este campo é obrigatório."),
    rendaMensal: z.string().min(1, "Este campo é obrigatório."),
    cepRespLegal: z
      .string()
      .min(9, "CEP inválido")
      .max(9, "CEP inválido")
      .regex(/^\d{5}-\d{3}$/, "CEP inválido")
      .transform((value) => value.replace(/\D/g, "")),
    enderecoRespLegal: z.string().min(1, "Este campo é obrigatório."),
    numeroRespLegal: z.string().min(1, "Este campo é obrigatório."),
    bairroRespLegal: z.string().min(1, "Este campo é obrigatório."),
    complementoRespLegal: optionalString,
    cidadeRespLegal: z.string().min(1, "Este campo é obrigatório."),
    estadoRespLegal: z.string().min(2, "Estado é obrigatório"),
    pontoReferenciaRespLegal: optionalString,
    telefoneRespLegal: z
      .string()
      .regex(telefoneRegex, "Telefone fixo inválido")
      .nullable()
      .optional(),
    celularRespLegal: z
      .string()
      .regex(telefoneRegex, "Telefone celular inválido")
      .nullable()
      .optional(),
  })
  .refine((data) => data.telefoneRespLegal || data.celularRespLegal, {
    message: "Pelo menos um telefone deve ser preenchido.",
    path: ["telefoneRespLegal", "celularRespLegal"],
  });

export const step2Schema = z
  .object({
    cep: z
      .string()
      .min(9, "CEP inválido")
      .regex(/^\d{5}-\d{3}$/, "CEP inválido")
      .transform((value) => value.replace(/\D/g, "")),
    endereco: z.string().min(1, "Este campo é obrigatório."),
    numero: z.string().min(1, "Este campo é obrigatório."),
    bairro: z.string().min(1, "Este campo é obrigatório."),
    complemento: optionalString,
    cidade: z.string().min(1, "Este campo é obrigatório."),
    estado: z.string().min(2, "Este campo é obrigatório"),
    pontoReferencia: optionalString,
    telefone: z
      .string()
      .regex(telefoneRegex, "Telefone fixo inválido")
      .nullable()
      .optional(),
    celular: z
      .string()
      .regex(telefoneRegex, "Telefone celular inválido")
      .nullable()
      .optional(),
  })
  .refine((data) => data.telefone || data.celular, {
    message: "Pelo menos um telefone deve ser preenchido.",
    path: ["telefone", "celular"],
  });




export const step1Schema = z.object({
  nomeFantasia: z.string().min(1, "Este campo é obrigatório."),
  razaoSocial: z.string().min(1, "Este campo é obrigatório."),
  site: optionalString,
  receitaAnual: z.string().min(1, "Este campo é obrigatório."),
  idTipoEmpresa: z.string().min(1, "Este campo é obrigatório."),
  dataFundacao: z
    .string()
    .min(1, "Este campo é obrigatório.")
    .refine(
      (value) => {
        const today = new Date();
        const selectedDate = new Date(value);
        return selectedDate <= today;
      },
      {
        message: "A data não pode ser maior que a data atual.",
      }
    ),
  idBanco: z.string().min(1, "Este campo é obrigatório."),
  agencia: z.string().min(1, "Este campo é obrigatório."),
  dvAgencia: z.string().min(1, "Este campo é obrigatório."),
  dvConta: z.string().min(1, "Este campo é obrigatório."),
  contaBancaria: z.string().min(1, "Este campo é obrigatório."),
  email: z.string().email("E-mail inválido"),
  cnpj: z
    .string()
    .min(14, "CNPJ deve ter 14 dígitos")
    .max(14, "CNPJ deve ter 14 dígitos")
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;