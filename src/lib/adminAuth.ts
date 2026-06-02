"use server";

import { getAdminCredentials, createAdminSession, destroyAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function loginAction(_prev: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const creds = getAdminCredentials();

  if (email === creds.email && password === creds.password) {
    await createAdminSession();
    redirect("/admin");
  }

  return { error: "Invalid email or password" };
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}
