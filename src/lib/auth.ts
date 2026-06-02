import { cookies } from "next/headers";

const ADMIN_COOKIE = "go2go_admin_session";
const SESSION_VALUE = "authenticated";

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL ?? "admin@go2go.com",
    password: process.env.ADMIN_PASSWORD ?? "admin123",
  };
}

export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  return session?.value === SESSION_VALUE;
}

export async function createAdminSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
