"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function LoginForm({ disabled }: { disabled: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/staff/sign-in", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          login: String(form.get("login") ?? ""),
          password: String(form.get("password") ?? ""),
        }),
      });
      if (!response.ok) {
        setError("Nieprawidłowy login lub hasło.");
        return;
      }
      router.push("/panel");
      router.refresh();
    } catch {
      setError("Logowanie jest chwilowo niedostępne.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="panel-login-form" onSubmit={onSubmit}>
      <label htmlFor="staff-login">
        Login
        <input
          id="staff-login"
          name="login"
          type="text"
          autoComplete="username"
          required
          disabled={disabled}
        />
      </label>
      <label htmlFor="staff-password">
        Hasło
        <input
          id="staff-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          disabled={disabled}
        />
      </label>
      {error ? (
        <p role="alert" className="panel-login-form__error">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={disabled || pending}
      >
        Zaloguj
      </button>
    </form>
  );
}
