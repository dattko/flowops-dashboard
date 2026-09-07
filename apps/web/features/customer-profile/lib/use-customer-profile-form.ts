"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { getApiErrorMessage } from "@/shared/api/base/utils";
import { customerQueryKeys } from "@/entities/customer";

import {
  getCustomerProfile,
  updateCustomerProfile,
} from "../api/customer-profile-client.api";
import { profileSchema, type ProfileValues } from "../model/profile-schema";
import type { CustomerProfile } from "../model/types";

const useCustomerProfileForm = (initialProfile: CustomerProfile) => {
  const queryClient = useQueryClient();
  const [saved, setSaved] = useState(false);
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
      deliveryMessage: "",
      marketingOptIn: false,
    },
  });
  const query = useQuery({
    queryKey: customerQueryKeys.profile,
    queryFn: getCustomerProfile,
    initialData: initialProfile,
  });

  useEffect(() => {
    const profile = query.data;
    if (!profile) return;

    form.reset({
      name: profile.name,
      email: profile.email.endsWith("@auth.local") ? "" : profile.email,
      postalCode: profile.address?.postalCode ?? "",
      addressLine1: profile.address?.addressLine1 ?? "",
      addressLine2: profile.address?.addressLine2 ?? "",
      deliveryMessage: profile.address?.deliveryMessage ?? "",
      marketingOptIn: profile.marketingOptIn,
    });
  }, [form, query.data]);

  const mutation = useMutation({
    mutationFn: updateCustomerProfile,
    onSuccess: async (profile) => {
      queryClient.setQueryData(customerQueryKeys.profile, profile);
      setSaved(true);
      form.clearErrors();
      await queryClient.invalidateQueries({ queryKey: customerQueryKeys.all });
    },
    onError: (error: unknown) => {
      setSaved(false);
      form.setError("root", { message: getApiErrorMessage(error) });
    },
  });
  const submit = form.handleSubmit((values) => {
    setSaved(false);
    mutation.mutate(values);
  });

  return {
    form,
    profile: query.data,
    submit,
    saved,
    isLoading: query.isLoading,
    isError: query.isError,
    isSaving: mutation.isPending,
  };
};

export { useCustomerProfileForm };
