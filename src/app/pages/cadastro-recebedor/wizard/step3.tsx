import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Step } from "../types/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SelectFilter from "@/components/select";
import { estados } from "@/utils/estadosBR";
import { fetchCEP } from "@/hooks/fetchCEP";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step3FormData, step3Schema } from "../schema";
import { FormProvider, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2 } from "lucide-react";

export default function Step3({
  prevStep,
  handleSubmit,
  formData,
  ocupacaoProfissionalOptions,
}: Step) {
  const form = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: formData.step3Data,
  });

  const handleCEP = async () => {
    const cep = form.getValues("cepRespLegal");

    if (!cep) {
      form.setError("cepRespLegal", {
        type: "manual",
        message: "CEP é obrigatório.",
      });
      return;
    }

    form.clearErrors("cepRespLegal");
    try {
      const dadosCEP = await fetchCEP(cep);

      if (!dadosCEP || !dadosCEP.logradouro) {
        form.setError("cepRespLegal", {
          type: "manual",
          message: "CEP não encontrado.",
        });
        return;
      }

      form.setValue("enderecoRespLegal", dadosCEP.logradouro || "");
      form.setValue("bairroRespLegal", dadosCEP.bairro || "");
      form.setValue("cidadeRespLegal", dadosCEP.localidade || "");
      form.setValue("estadoRespLegal", dadosCEP.uf || "");
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      form.setError("cepRespLegal", {
        type: "manual",
        message: "Erro ao buscar CEP. Tente novamente.",
      });
    }
  };

  const handleFormSubmit = async (data: Step3FormData) => {
    if (handleSubmit) {
      await handleSubmit({
        ...formData,
        step3Data: data,
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <section className="flex flex-col w-full h-max gap-2">
          <Alert variant="default" className="mb-2">
            <AlertTriangle className="size-4" />
            <AlertTitle>Importante!</AlertTitle>
            <AlertDescription>
              <p>
                O representante deve ser um sócio registrado no Quadro de Sócios
                e devidamente qualificado no QSA (Quadro de Sócios e
                Administradores) da empresa. No momento, não são aceitos
                Administradores, mesmo que qualificados no QSA, nem Procuradores
              </p>
            </AlertDescription>
          </Alert>

          <h2 className="text-gray-500 font-medium text-xl flex items-end gap-2">
            Representante Legal
          </h2>
          <hr />

          <div className="flex w-full flex-wrap -mr-3 mt-0">
            <FormField
              control={form.control}
              name="nomeRespLegal"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>
                    Nome do Representante<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id={field.name}
                      {...form.register(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailRespLegal"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>
                    Email do Representante
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id={field.name}
                      {...form.register(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap md:w-1/2 w-full flex-none items-start max-w-full">
              <FormField
                control={form.control}
                name="cpfRespLegal"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      CPF do Representante
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <PatternFormat
                        format="###.###.###-##"
                        customInput={Input}
                        id={field.name}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dataNascimentoRespLegal"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      Data de Nascimento<span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        id={field.name}
                        {...form.register(field.name)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="nomeMaeRespLegal"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>
                    Nome da Mãe do Representante
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id={field.name}
                      {...form.register(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SelectFilter
              form={form}
              fullWidth={true}
              label="Ocupação Profissional"
              name="idOcupacao"
              options={ocupacaoProfissionalOptions ?? []}
              required={true}
            />
            <FormField
              control={form.control}
              name="rendaMensal"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>
                    Receita Mensal
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      id={field.name}
                      {...form.register(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col w-full my-2 gap-2">
              <h2 className="text-gray-500 font-medium text-xl mt-3">
                Endereço do representante
              </h2>
              <hr />
            </div>
            <div className="flex flex-wrap md:w-1/2 w-full flex-none items-start max-w-full">
              <FormField
                control={form.control}
                name="cepRespLegal"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      CEP
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <PatternFormat
                        id={field.name}
                        format="#####-###"
                        customInput={Input}
                        {...field}
                        onBlur={() => {
                          field.onBlur();
                          handleCEP();
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numeroRespLegal"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      Número
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        id={field.name}
                        {...form.register(field.name)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="enderecoRespLegal"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>
                    Endereço<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id={field.name}
                      {...form.register(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SelectFilter
              form={form}
              fullWidth={true}
              label="Estado"
              name="estadoRepresentante"
              options={estados.map((estado) => ({
                label: estado.nome,
                value: estado.sigla,
              }))}
              required={true}
            />

            <FormField
              control={form.control}
              name="cidadeRespLegal"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>
                    Cidade<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id={field.name}
                      {...form.register(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bairroRespLegal"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>
                    Bairro<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id={field.name}
                      {...form.register(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complementoRespLegal"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id={field.name}
                      {...form.register(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pontoReferenciaRespLegal"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>Ponto de referência</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id={field.name}
                      {...form.register(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col w-full my-2 gap-2">
              <h2 className="text-gray-500 font-medium text-xl mt-3">
                Contatos do representante
              </h2>
              <hr />
            </div>
            <FormField
              control={form.control}
              name="telefoneRespLegal"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <PatternFormat
                      format="##-#########"
                      customInput={Input}
                      id={field.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="celularRespLegal"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <PatternFormat
                      format="##-#########"
                      customInput={Input}
                      id={field.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            onClick={prevStep}
            className="bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Voltar
          </Button>
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Carregando..." : "Cadastrar"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
