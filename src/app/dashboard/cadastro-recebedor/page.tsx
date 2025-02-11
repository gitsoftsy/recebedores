"use client";

import { useUser } from "@/hooks/useUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, formSchema } from "./schema";
import Step1 from "./wizard/step1";
import Step2 from "./wizard/step2";
import Step3 from "./wizard/step3";

const steps = ["1", "2", "3"];

export default function CadastroRecebedor() {
  const { width } = useUser();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    contact: "email",
    interests: [],
    newsletter: false,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const validateStep = () => {
    if (currentStep === 2 && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = () => {
    if (validateStep()) {
      alert("Form submitted successfully!");
      console.log(formData);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div className="bg-white border-gray-300 border-solid border rounded-lg p-6 md:p-10 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Cadastro de recebedor
          </h1>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((label, index) => (
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
          <form onSubmit={onSubmit}>
            {currentStep === 1 && <Step1 form={form} />}
            {currentStep === 2 && <Step2 form={form} />}
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
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Próximo
                </button>
              )}
              {currentStep === 3 && (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Cadastrar
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
