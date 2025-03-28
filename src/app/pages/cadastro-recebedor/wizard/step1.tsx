import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Step } from "../types/form";
import { Input } from "@/components/ui/input";
import SelectFilter from "@/components/select";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { Step1FormData, step1Schema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormDataWizard } from "./stepForm";
import { NumericFormat, PatternFormat } from "react-number-format";

export default function Step1({
  bancoOptions,
  nextStep,
  setFormData,
  formData,
  tipoEmpresaOptions,
  receiverData,
}: Step) {
  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    mode: "onChange",
    shouldUnregister: false,
    defaultValues: {
      ...formData.step1Data,
      cnpj: receiverData?.documento || formData.step1Data.cnpj || "",
      email: receiverData?.email || formData.step1Data.email || "",
      nomeFantasia: receiverData?.nome || formData.step1Data.nomeFantasia || "",
      receitaAnual: formData.step1Data.receitaAnual
        ? String(formData.step1Data.receitaAnual)
        : "",
    },
  });

  return (
    <>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            setFormData?.((prevData: FormDataWizard) => ({
              ...prevData,
              step1Data: data,
            }));
            nextStep?.();
          })}
        >
          <section>
            <div className="flex w-full flex-wrap -mr-3 mt-0">
              <FormField
                control={form.control}
                name="cnpj"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>CNPJ</FormLabel>
                    <FormControl>
                      <PatternFormat
                        id={field.name}
                        type="text"
                        disabled={true}
                        format="##.###.###/####-##"
                        customInput={Input}
                        {...field}
                        value={receiverData?.documento ?? field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={true}
                        id={field.name}
                        {...field}
                        value={receiverData?.email ?? field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nomeFantasia"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      Nome Fantasia<span className="text-red-600">*</span>{" "}
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
                name="razaoSocial"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      Razão Social<span className="text-red-600">*</span>
                    </FormLabel>
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
              <FormField
                control={form.control}
                name="site"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>Site</FormLabel>
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

              <FormField
                control={form.control}
                name="receitaAnual"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      Receita anual
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <NumericFormat
                        customInput={Input}
                        thousandSeparator="."
                        decimalSeparator=","
                        prefix="R$ "
                        decimalScale={2}
                        fixedDecimalScale
                        allowNegative={false}
                        value={value}
                        onValueChange={(values) => {
                          onChange(values.value);
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SelectFilter
                form={form}
                required={true}
                fullWidth={true}
                label="Tipo da empresa"
                name="idTipoEmpresa"
                options={tipoEmpresaOptions ?? []}
              />

              <FormField
                control={form.control}
                name="dataFundacao"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      Data fundação da empresa
                      <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
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
                required={true}
                label="Banco"
                name="idBanco"
                options={bancoOptions ?? []}
              />
              <FormField
                control={form.control}
                name="agencia"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      Agência
                      <span className="text-red-600">*</span>
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
              <FormField
                control={form.control}
                name="dvAgencia"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      Dígito da Agência<span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
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

              <FormField
                control={form.control}
                name="contaBancaria"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      Conta
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
              <FormField
                control={form.control}
                name="dvConta"
                render={({ field }) => (
                  <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                    <FormLabel>
                      Dígito da Conta<span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
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
          </section>
          <div className={`flex justify-end mt-8`}>
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Próximo
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}
