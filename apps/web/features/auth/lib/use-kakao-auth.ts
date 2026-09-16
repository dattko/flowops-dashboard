"use client";

import { useState, useTransition } from "react";

import { loginWithKakao } from "../api/auth-server.action";

const useKakaoAuth = (redirectTo?: string) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const login = () => {
    setErrorMessage(undefined);
    startTransition(async () => {
      const result = await loginWithKakao(redirectTo);
      if (result?.error) setErrorMessage(result.error);
    });
  };

  return { login, isPending, errorMessage };
};

export { useKakaoAuth };
