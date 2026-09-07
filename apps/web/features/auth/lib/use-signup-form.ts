"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { signup } from "../api/auth-server.action";
import { signupSchema, type SignupValues } from "../model/signup-schema";

const useSignupForm = () => {
  const router = useRouter();
  const [codeSent, setCodeSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      loginId: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone: "010-5550-0001",
      verificationCode: "",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
      deliveryMessage: "",
      termsAccepted: false,
      marketingOptIn: false,
    },
  });
  const sendCodeMutation = useMutation({
    mutationFn: async (phone: string) => {
      const digits = phone.replace(/[^0-9]/g, "");
      const isTestPhone =
        /^0105550000[1-9]$/.test(digits) || digits === "01055500010";

      if (!isTestPhone) {
        throw new Error("무료 테스트 번호 010-5550-0001~0010을 입력해 주세요.");
      }
    },
    onSuccess: () => {
      setCodeSent(true);
      setPhoneVerified(false);
      form.clearErrors();
    },
    onError: (error: Error) => {
      form.setError("phone", { message: error.message });
    },
  });
  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (result) => {
      if (result?.error) {
        form.setError("root", { message: result.error });
        return;
      }

      if (result?.redirectTo) {
        router.replace(result.redirectTo);
        router.refresh();
      }
    },
    onError: () => {
      form.setError("root", {
        message: "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      });
    },
  });
  const verifyMutation = useMutation({
    mutationFn: async (code: string) => {
      if (code.trim() !== "123456") {
        throw new Error("인증번호가 올바르지 않습니다.");
      }
    },
    onSuccess: () => {
      window.alert("인증 완료");
      setPhoneVerified(true);
      form.clearErrors();
    },
    onError: (error: Error) => {
      setPhoneVerified(false);
      form.setError("verificationCode", { message: error.message });
    },
  });

  const submit = form.handleSubmit((values) => {
    form.clearErrors();
    if (!phoneVerified) {
      form.setError("phone", { message: "휴대폰 인증을 완료해 주세요." });
      return;
    }
    signupMutation.mutate(values);
  });
  const sendCode = async () => {
    const isPhoneValid = await form.trigger("phone");
    if (isPhoneValid) sendCodeMutation.mutate(form.getValues("phone"));
  };
  const verifyCode = () => {
    const code = form.getValues("verificationCode").trim();
    if (!/^\d{6}$/.test(code)) {
      form.setError("verificationCode", {
        message: "인증번호 6자리를 입력해 주세요.",
      });
      return;
    }
    form.clearErrors("verificationCode");
    verifyMutation.mutate(code);
  };

  return {
    form,
    submit,
    sendCode,
    verifyCode,
    codeSent,
    phoneVerified,
    isSending: sendCodeMutation.isPending,
    isVerifying: verifyMutation.isPending,
    isCreating: signupMutation.isPending,
  };
};

export { useSignupForm };
