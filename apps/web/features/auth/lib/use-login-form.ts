"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { login } from "../api/auth-server.action";
import { loginSchema, type LoginValues } from "../model/login-schema";

const useLoginForm = ({ callbackError = false }: { callbackError?: boolean } = {}) => {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { loginId: "", password: "" },
  });
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (result) => {
      if (result?.error) {
        form.setError("root", { message: result.error });
        return;
      }

      if (result?.redirectTo) {
        setIsRedirecting(true);
        router.replace(result.redirectTo);
      }
    },
    onError: () => {
      form.setError("root", {
        message: "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.",
      });
    },
  });
  const submit = form.handleSubmit((values) => mutation.mutate(values));
  const errorMessage =
    form.formState.errors.root?.message ??
    (callbackError ? "인증 링크가 만료되었거나 올바르지 않습니다." : undefined);

  return {
    form,
    submit,
    isPending:
      form.formState.isSubmitting || mutation.isPending || isRedirecting,
    errorMessage,
  };
};

export { useLoginForm };
