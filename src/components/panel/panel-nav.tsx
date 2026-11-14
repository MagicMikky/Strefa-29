"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { logoutStaff } from "@/app/panel/(app)/actions";
import { can } from "@/lib/staff/permissions";
import type { StaffSession } from "@/lib/staff/session";

type PanelLink = { href: string; label: string };

export function PanelNav({ staff }: { staff: StaffSession }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const canManage = can(staff.role, "staff.manage");
  const canPublish = can(staff.role, "business.publish");
  const operations: PanelLink[] = [
    { href: "/panel", label: "Pulpit" },
    { href: "/panel/zgloszenia", label: "Zgłoszenia" },
    ...(can(staff.role, "inquiries.update") ? [{ href: "/panel/rezerwacje", label: "Rezerwacje telefoniczne" }] : []),
    ...(canManage ? [{ href: "/panel/pracownicy", label: "Pracownicy" }] : []),
  ];
  const publishing: PanelLink[] = canPublish
    ? [
        { href: "/panel/firma", label: "Firma" },
        { href: "/panel/tresci", label: "Treści" },
        { href: "/panel/galeria", label: "Galeria" },
        { href: "/panel/harmonogram", label: "Harmonogram" },
        { href: "/panel/dostepnosc", label: "Dostępność" },
        { href: "/panel/historia", label: "Historia" },
      ]
    : [];

  function isActive(href: string) {
    return href === "/panel" ? pathname === href : pathname.startsWith(href);
  }

  return (
    <nav aria-label="Nawigacja panelu" className="panel-nav">
      <button
        className="panel-nav__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="panel-navigation-links"
        onClick={() => setOpen((value) => !value)}
      >
        Menu panelu <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div className={`panel-nav__links${open ? " is-open" : ""}`} id="panel-navigation-links">
        <NavGroup label="Obsługa" links={operations} isActive={isActive} onNavigate={() => setOpen(false)} />
        {publishing.length > 0 ? (
          <NavGroup label="Publikacja" links={publishing} isActive={isActive} onNavigate={() => setOpen(false)} />
        ) : null}
        <NavGroup
          label="Konto"
          links={[{ href: "/panel/ustawienia", label: "Ustawienia" }]}
          isActive={isActive}
          onNavigate={() => setOpen(false)}
        />
        <form action={logoutStaff} className="panel-nav__logout">
          <button type="submit">Wyloguj</button>
        </form>
      </div>
    </nav>
  );
}

function NavGroup({
  label,
  links,
  isActive,
  onNavigate,
}: {
  label: string;
  links: PanelLink[];
  isActive: (href: string) => boolean;
  onNavigate: () => void;
}) {
  return (
    <div className="panel-nav__group">
      <p>{label}</p>
      {links.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            className={active ? "is-active" : undefined}
            href={item.href}
            key={item.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
          >
            <span aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
