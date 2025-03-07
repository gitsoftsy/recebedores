"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, formSchema } from "../schema";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { Options } from "@/@types/options";
import { Button } from "@/components/ui/button";

export interface StepFormProps {
  tipoEmpresaOptions: Options;
  bancoOptions: Options;
  ocupacaoProfissionalOptions: Options;
}

export default function StepForm({
  tipoEmpresaOptions,
  bancoOptions,
  ocupacaoProfissionalOptions,
}: StepFormProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const nextStep = () => {
    if (form.formState.isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return (
    <>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {["1", "2", "3"].map((label, index) => (
            <span
              key={index}
              className={`text-xl font-semibold inline-block py-1 px-3 uppercase rounded-full text-green-600 bg-green-200 ${
                index + 1 <= currentStep ? "" : "opacity-50"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
          <div
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-500 ease-in-out"
            style={{ width: `${(currentStep / 3) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Steps */}
      {currentStep === 1 && (
        <Step1
          form={form}
          tipoEmpresaOptions={tipoEmpresaOptions}
          bancoOptions={bancoOptions}
        />
      )}
      {currentStep === 2 && (
        <Step2
          form={form}
          ocupacaoProfissionalOptions={ocupacaoProfissionalOptions}
        />
      )}
      {currentStep === 3 && <Step3 form={form} />}

      {/* Navigation Buttons */}
      <div
        className={`flex ${
          currentStep < 2 ? "justify-end" : "justify-between"
        } mt-8`}
      >
        {currentStep > 1 && (
          <button
            type="button"
            onClick={prevStep}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Voltar
          </button>
        )}
        {currentStep < 3 && (
          <Button
            type="button"
            onClick={nextStep}
            disabled={!form.formState.isValid}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Próximo
          </Button>
        )}

        {currentStep === 3 && (
          <button
            type="submit"
            disabled={!form.formState.isValid}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Cadastrar
          </button>
        )}
      </div>
    </>
  );
}
