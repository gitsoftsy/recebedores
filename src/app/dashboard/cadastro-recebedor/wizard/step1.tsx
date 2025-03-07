import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Step } from "../types/form";
import { Input } from "@/components/ui/input";
import SelectFilter from "@/components/select";
import { UserContext } from "@/contexts/UserContext";
import { useContext } from "react";

export default function Step1({
  form,
  bancoOptions,
  tipoEmpresaOptions,
}: Step) {
  const {receiver} = useContext(UserContext);

  return (
    <Form {...form}>
      <section>
        <div className="flex w-full flex-wrap -mr-3 mt-0">
          <FormField
            control={form.control}
            name="cpnj"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    required={true}
                    type="text"
                    disabled={true}
                    defaultValue={receiver?.cnpj}
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
            name="nomeFantasia"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>
                  Nome Fantasia <span className="text-red-600">*</span>{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    required={true}
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
            name="email"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    required={true}
                    type="email"
                    disabled={true}
                    defaultValue={receiver?.email}
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
                  Razão Social <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    required={true}
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
                    required={true}
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

          <div className="flex flex-wrap md:w-1/2 w-full flex-none items-end max-w-full mt-2">
            <FormField
              control={form.control}
              name="receitaAnual"
              render={({ field }) => (
                <FormItem className="md:w-1/2 xs:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)]">
                  <FormLabel>
                    Receita anual
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      required={true}
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
            <SelectFilter
              form={form}
              fullWidth={false}
              label="Tipo da empresa"
              name="tipoEmpresa"
              options={tipoEmpresaOptions ?? []}
              required={true}
            />
          </div>

          <div className="flex flex-wrap md:w-1/2 w-full flex-none items-end max-w-full mt-3">
            <FormField
              control={form.control}
              name="dataFundacaoEmpresa"
              render={({ field }) => (
                <FormItem className="xs:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)]">
                  <FormLabel>
                    Data fundação da empresa
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      required={true}
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
              fullWidth={false}
              label="Banco"
              name="banco"
              options={bancoOptions ?? []}
              required={true}
            />
          </div>
          <div className="flex flex-wrap md:w-1/2 w-full flex-none items-end max-w-full mt-3">
            <FormField
              control={form.control}
              name="agencia"
              render={({ field }) => (
                <FormItem className="xs:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)]">
                  <FormLabel>
                    Agência
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      required={true}
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
              name="conta"
              render={({ field }) => (
                <FormItem className="xs:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)]">
                  <FormLabel>
                    Conta
                    <span className="text-red-600">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      required={true}
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
        </div>
      </section>
    </Form>
  );
}
