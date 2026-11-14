import type { Metadata } from "next";

import { Logo } from "@/components/logo";
import { LoginForm } from "@/components/panel/login-form";
import { isAuthConfigured } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Logowanie pracownika",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";

const errors: Record<string, string> = {
  config: "Panel nie jest jeszcze skonfigurowany. Brakuje bazy albo sekretu sesji.",
  disabled: "To konto jest zablokowane albo sesja wygasła.",
  staff: "To konto nie ma dostępu do panelu pracowników.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const configured = isAuthConfigured();
  const notice = params.error ? errors[params.error] : undefined;

  return (
    <section className="panel-login">
      <div className="panel-login__visual" aria-hidden="true">
        <Logo />
        <span>STREFA OPERACYJNA // 29</span>
      </div>
      <div className="panel-login__surface">
        <div className="panel-login__card">
          <p className="panel-login__eyebrow">Paintball Strefa 29</p>
          <h1>Logowanie pracownika</h1>
          <p className="panel-login__lead">
            Dostęp mają tylko konta utworzone przez właściciela. Publiczna rejestracja jest wyłączona.
          </p>
          {notice || !configured ? (
            <p className="panel-login__notice" role="status">
              {notice ?? "Panel nie jest jeszcze skonfigurowany. Brakuje bazy albo sekretu sesji."}
            </p>
          ) : null}
          <div className="panel-login__form-wrap">
            <LoginForm disabled={!configured} />
          </div>
        </div>
      </div>
    </section>
  );
}
