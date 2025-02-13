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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { IoIosInformationCircleOutline } from "react-icons/io";

export default function Step3({ form }: Step) {
  return (
    <Form {...form}>
      <section className="flex flex-col w-full h-max gap-2">
        <h2 className="text-gray-500 font-medium text-xl flex items-end gap-2">
          Representante Legal
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <IoIosInformationCircleOutline
                  size={24}
                  className="m-0 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  O representante deve ser um sócio registrado no Quadro de
                  Sócios e devidamente qualificado no QSA (Quadro de Sócios e
                  Administradores) da empresa. No momento, não são aceitos
                  Administradores, mesmo que qualificados no QSA, nem
                  Procuradores
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h2>
        <hr />

        <div className="flex w-full flex-wrap -mr-3 mt-0">
          <FormField
            control={form.control}
            name="nomeRepresentante"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>
                  Nome do Representante <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    required={true}
                    type="text"
                    disabled={true}
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
            name="emailRepresentante"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>
                  Email do Representante <span className="text-red-600">*</span>{" "}
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
          <div className="flex flex-wrap md:w-1/2 w-full flex-none items-end max-w-full mt-3">
            <FormField
              control={form.control}
              name="cpfRepresentante"
              render={({ field }) => (
                <FormItem className="xs:w-1/2 w-full xs:mt-0 mt-3 flex-none max-w-full px-[calc(1.5rem*0.5)]">
                  <FormLabel>
                    CPF do Representante <span className="text-red-600">*</span>
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
              name="dataNascimento"
              render={({ field }) => (
                <FormItem className="xs:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)]">
                  <FormLabel>
                    Data de Nascimento
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
          </div>
          <FormField
            control={form.control}
            name="nomeMaeRepresentante"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>
                  Nome da Mãe do Representante{" "}
                  <span className="text-red-600">*</span>
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
            name="ocupacaoProfissional"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>
                  Ocupação Profissional <span className="text-red-600">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">m@example.com</SelectItem>
                    <SelectItem value="2">m@google.com</SelectItem>
                    <SelectItem value="3">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ocupacaoProfissional"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>
                  Receita Mensal
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

          <div className="flex flex-col w-full my-2 gap-2">
            <h2 className="text-gray-500 font-medium text-xl mt-3">
              Endereço do representante
            </h2>
            <hr />
          </div>
          <div className="flex flex-wrap md:w-1/2 w-full flex-none items-end max-w-full mt-3">
            <FormField
              control={form.control}
              name="cepRepresentante"
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numeroRepresentante"
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
            name="enderecoRepresentante"
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
          <FormField
            control={form.control}
            name="estadoRepresentante"
            render={({ field }) => (
              <FormItem className="md:w-1/2 w-full flex-none max-w-full px-[calc(1.5rem*0.5)] mt-2">
                <FormLabel>
                  Estado <span className="text-red-600">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CE">CE</SelectItem>
                    <SelectItem value="PE">PE</SelectItem>
                    <SelectItem value="SC">SC</SelectItem>
                    <SelectItem value="SP">SP</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cidadeRepresentante"
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
            name="bairroRepresentante"
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
            name="complementoRepresentante"
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
            name="pontoReferenciaRepresentante"
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
            name="telefoneFixoRepresentante"
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
            name="telefoneCelularRepresentante"
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
