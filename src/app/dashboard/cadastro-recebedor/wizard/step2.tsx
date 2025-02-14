import {
  Form,
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

export default function Step2({ form }: Step) {
  const handleCEP = async () => {
    const cep = await fetchCEP(form.getValues("cepEmpresa"));
    console.log(cep);

    const campos = {
      enderecoEmpresa: cep.logradouro,
      bairroEmpresa: cep.bairro,
      cidadeEmpresa: cep.localidade,
      estadoEmpresa: cep.uf,
    };

    Object.entries(campos).forEach(([campo, valor]) => {
      form.setValue(campo, valor);
    });
  };

  return (
    <Form {...form}>
      <section className="flex flex-col w-full h-max gap-2">
        <h2 className="text-gray-500 font-medium text-xl">
          Endereço da empresa
        </h2>
        <hr />
        <div className="flex w-full flex-wrap -mr-3 mt-0">
          <div className="flex flex-wrap md:w-1/2 w-full flex-none items-end max-w-full mt-3">
            <FormField
              control={form.control}
              name="cepEmpresa"
              render={({ field }) => (
                <FormItem className="xs:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)]">
                  <FormLabel>
                    CEP
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
                      onBlur={(e) => {
                        form.register(field.name).onBlur(e);
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
              name="numeroEmpresa"
              render={({ field }) => (
                <FormItem className="xs:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)]">
                  <FormLabel>
                    Número
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

          <FormField
            control={form.control}
            name="enderecoEmpresa"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>
                  Endereço <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
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
          <SelectFilter
            form={form}
            fullWidth={true}
            label="Estado"
            name="estadoEmpresa"
            options={estados.map((estado) => ({
              label: estado.nome,
              value: estado.sigla,
            }))}
            required={true}
          />
          <FormField
            control={form.control}
            name="cidadeEmpresa"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>
                  Cidade <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
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
            name="bairroEmpresa"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>
                  Bairro <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
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
            name="complementoEmpresa"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>Complemento</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
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
            name="pontoReferenciaEmpresa"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>Ponto de referência</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
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

          <div className="flex flex-col w-full my-2 gap-2">
            <h2 className="text-gray-500 font-medium text-xl mt-3">
              Contatos da empresa
            </h2>
            <hr />
          </div>
          <FormField
            control={form.control}
            name="telefoneFixoEmpresa"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>Telefone fixo</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
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
            name="telefoneCelularEmpresa"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>Telefone celular</FormLabel>
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
        </div>
      </section>
    </Form>
  );
}
