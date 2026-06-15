import { atom, onMount } from "nanostores";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "customer" | "admin";
}

export const $authToken = atom<string | null>(null);
export const $user = atom<User | null>(null);

onMount($authToken, () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("vyaa-token");
    if (token) $authToken.set(token);
  }

  return $authToken.subscribe((token) => {
    if (typeof window !== "undefined") {
      if (token) {
        localStorage.setItem("vyaa-token", token);
      } else {
        localStorage.removeItem("vyaa-token");
      }
    }
  });
});

onMount($user, () => {
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem("vyaa-user");
      if (raw) {
        const parsed = JSON.parse(raw);
        $user.set(parsed);
      }
    } catch {}
  }

  return $user.subscribe((user) => {
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("vyaa-user", JSON.stringify(user));
      } else {
        localStorage.removeItem("vyaa-user");
      }
    }
  });
});

export function login(token: string, user: User) {
  $authToken.set(token);
  $user.set(user);
}

export function logout() {
  $authToken.set(null);
  $user.set(null);
}
