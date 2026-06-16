import { atom, onMount } from 'nanostores';

const $authToken = atom(null);
const $user = atom(null);
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
    } catch {
    }
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
function login(token, user) {
  $authToken.set(token);
  $user.set(user);
}
function logout() {
  $authToken.set(null);
  $user.set(null);
}

export { $authToken as $, $user as a, login as b, logout as l };
