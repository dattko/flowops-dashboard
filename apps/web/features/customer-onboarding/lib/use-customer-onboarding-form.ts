"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/shared/config/routes";

import {
  completeOnboarding,
  getCustomerOnboarding,
  sendPhoneVerification,
  verifyPhone,
} from "../api/customer-onboarding-client.api";
import { onboardingSchema, type OnboardingValues } from "../model/onboarding-schema";

const ONBOARDING_QUERY_KEY = ["customer", "onboarding"] as const;

const useCustomerOnboardingForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [selectedStep, setSelectedStep] = useState<"phone" | "address">("phone");
  const [sentPhone, setSentPhone] = useState<string>();
  const form = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      phone: "010-5550-0001",
      verificationCode: "",
      recipientName: "",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
      deliveryMessage: "",
      termsAccepted: false,
      marketingOptIn: false,
    },
  });
  const onboardingQuery = useQuery({
    queryKey: ONBOARDING_QUERY_KEY,
    queryFn: getCustomerOnboarding,
  });

  useEffect(() => {
    const onboarding = onboardingQuery.data;
    if (!onboarding) return;

    form.reset({
      ...form.getValues(),
      phone: onboarding.phone
        ? onboarding.phone.replace(/^\+82(\d{2})(\d{4})(\d{4})$/, "0$1-$2-$3")
        : form.getValues("phone"),
      recipientName: onboarding.address?.recipientName ?? onboarding.name ?? "",
      postalCode: onboarding.address?.postalCode ?? "",
      addressLine1: onboarding.address?.addressLine1 ?? "",
      addressLine2: onboarding.address?.addressLine2 ?? "",
      deliveryMessage: onboarding.address?.deliveryMessage ?? "",
    });

    if (onboarding.onboardingCompleted) router.replace(ROUTES.home);
  }, [form, onboardingQuery.data, router]);

  const step = onboardingQuery.data?.phoneVerified ? "address" : selectedStep;

  const sendMutation = useMutation({
    mutationFn: sendPhoneVerification,
    onSuccess: (_, phone) => {
      setSentPhone(phone);
      form.clearErrors("root");
    },
    onError: (error: Error) => {
      form.setError("root", { message: error.message });
    },
  });
  const verifyMutation = useMutation({
    mutationFn: verifyPhone,
    onSuccess: async () => {
      setSelectedStep("address");
      form.clearErrors("root");
      await queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
    },
    onError: (error: Error) => {
      form.setError("root", { message: error.message });
    },
  });
  const completeMutation = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ONBOARDING_QUERY_KEY });
      router.replace(ROUTES.home);
      router.refresh();
    },
    onError: (error: Error) => {
      form.setError("root", { message: error.message });
    },
  });

  const sendCode = async () => {
    const isValid = await form.trigger("phone");
    if (isValid) sendMutation.mutate(form.getValues("phone"));
  };

  const verifyCode = async () => {
    const isValid = await form.trigger(["phone", "verificationCode"]);
    if (!isValid) return;
    verifyMutation.mutate({
      phone: form.getValues("phone"),
      token: form.getValues("verificationCode"),
    });
  };

  const submit = form.handleSubmit((values) => {
    if (step !== "address") return;
    completeMutation.mutate({
      recipientName: values.recipientName,
      postalCode: values.postalCode,
      addressLine1: values.addressLine1,
      addressLine2: values.addressLine2,
      deliveryMessage: values.deliveryMessage,
      termsAccepted: values.termsAccepted,
      marketingOptIn: values.marketingOptIn,
    });
  });

  return {
    form,
    step,
    sentPhone,
    sendCode,
    verifyCode,
    submit,
    isLoading: onboardingQuery.isLoading,
    isSending: sendMutation.isPending,
    isVerifying: verifyMutation.isPending,
    isSaving: completeMutation.isPending,
  };
};

export { useCustomerOnboardingForm };
