const customerQueryKeys = {
  all: ["customer"] as const,
  onboarding: ["customer", "onboarding"] as const,
  profile: ["customer", "profile"] as const,
};

export { customerQueryKeys };
