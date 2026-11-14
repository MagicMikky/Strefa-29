import type { ReactNode } from "react";

import { PanelNav } from "@/components/panel/panel-nav";
import { requireStaff } from "@/lib/staff/session";

export const dynamic = "force-dynamic";

export default async function StaffAreaLayout({ children }: { children: ReactNode }) {
  const staff = await requireStaff();
  return (
    <section className="panel-shell">
      <aside className="panel-shell__sidebar">
        <div className="panel-shell__brand">
          <span>STREFA 29</span>
          <small>Panel pracownika</small>
        </div>
        <PanelNav staff={staff} />
      </aside>
      <div className="panel-shell__workspace">
        <header className="panel-shell__header">
          <div>
            <p>Paintball Strefa 29</p>
            <h1>Panel pracownika</h1>
          </div>
          <p className="panel-shell__session">
            Zalogowano jako <strong>{staff.name}</strong>. Zmiana statusu zgłoszenia nie potwierdza rezerwacji.
          </p>
        </header>
        <div className="panel-shell__content">{children}</div>
      </div>
    </section>
  );
}
