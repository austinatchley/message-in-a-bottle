import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

invariant(process.env.SESSION_SECRET, "SESSION_SECRET must be set");

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === "production",
  },
});

const ADMIN_SESSION_KEY = "admin";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getAdminStatus(
  request: Request
): Promise<boolean | undefined> {
  const session = await getSession(request);
  return session.get(ADMIN_SESSION_KEY);
}

export async function requireAdminAccess(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const adminStatus = await getAdminStatus(request);
  if (!adminStatus) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/admin?${searchParams}`);
  }
  return adminStatus;
}

export async function createUserAdminSession(
  request: Request,
  redirectTo: string,
  remember: boolean = false
) {
  const session = await getSession(request);
  session.set(ADMIN_SESSION_KEY, true);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
