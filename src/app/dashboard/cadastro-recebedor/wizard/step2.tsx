import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Step } from "../types/form";
import { fetchCEP } from "@/hooks/fetchCEP";
import SelectFilter from "@/components/select";
import { estados } from "@/utils/estadosBR";
import { PatternFormat } from "react-number-format";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step2FormData, step2Schema } from "../schema";
import { Button } from "@/components/ui/button";
import { FormDataWizard } from "./stepForm";

export default function Step2({ nextStep, setFormData, prevStep }: Step) {
  const form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    mode: "onChange",
    shouldUnregister: false,
  });

  const handleCEP = async () => {
    const cep = form.getValues("cep");

    if (!cep) {
      form.setError("cep", {
        type: "manual",
        message: "CEP é obrigatório.",
      });
      return;
    }

    form.clearErrors("cep");

    const dadosCEP = await fetchCEP(cep);

    if (!dadosCEP) {
      form.setError("cep", {
        type: "manual",
        message: "Não foi possível encontrar o CEP.",
      });
      return;
    }

    const campos: Record<
      "endereco" | "bairro" | "cidade" | "estado",
      string
    > = {
      endereco: dadosCEP.logradouro,
      bairro: dadosCEP.bairro,
      cidade: dadosCEP.localidade,
      estado: dadosCEP.uf,
    };

    Object.entries(campos).forEach(([campo, valor]) => {
      form.setValue(
        campo as
          | "endereco"
          | "bairro"
          | "cidade"
          | "estado",
        valor
      );
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          setFormData?.((prevData: FormDataWizard) => ({
            ...prevData,
            step2Data: data,
          }));
          nextStep?.();
        })}
      >
        <section className="flex flex-col w-full h-max gap-2">
          <h2 className="text-gray-500 font-medium text-xl">
            Endereço da empresa
          </h2>
          <hr />
          <div className="flex w-full flex-wrap -mr-3 mt-0">
            <div className="flex flex-wrap md:w-1/2 w-full flex-none items-end max-w-full mt-3">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <FormItem className="xs:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)]">
                    <FormLabel>
                      CEP<span className="text-red-600">*</span>
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
                name="numero"
                render={({ field }) => (
                  <FormItem className="xs:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)]">
                    <FormLabel>
                      Número<span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        disabled={field.disabled}
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
              name="endereco"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>
                    Endereço<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="text"
                      disabled={field.disabled}
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
              name="estado"
              options={estados.map((estado) => ({
                label: estado.nome,
                value: estado.sigla,
              }))}
              required={false}
            />
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>
                    Cidade<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="text"
                      disabled={field.disabled}
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
              name="bairro"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>
                    Bairro<span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="text"
                      disabled={field.disabled}
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
              name="complemento"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      type="text"
                      disabled={field.disabled}
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
              name="pontoReferencia"
              render={({ field }) => (
                <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                  <FormLabel>Ponto de referência</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled={field.disabled}
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
                Contatos da empresa
              </h2>
              <hr />
            </div>
            <FormField
              control={form.control}
              name="telefone"
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
              name="celular"
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
          >
            Próximo
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
