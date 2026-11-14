# Paintball Strefa 29 — instrukcje dla agenta

To repozytorium zawiera stronę marketingową 1.0, panel 1.5A, CMS właściciela 1.5B, kalendarz zapytań oraz potwierdzenia wizyt i wpisy telefoniczne w panelu. Klient wybiera termin i wysyła zgłoszenie; pracownik potwierdza wizytę. Płatności online są wyłączone. Aktualne decyzje są w `docs/STREFA29_DECYZJE_DO_USTALENIA.md`, plan w `docs/STREFA29_MASTER_PLAN.md`, a backlog w `docs/STREFA29_CURSOR_ROADMAP_TODO.md`.

Nie cofaj logowania, skrzynki, CMS-a, galerii, harmonogramu, kalendarza ani wpisów telefonicznych. Zatwierdzone zasady: grupy 8–50 osób, 50 osób na slot, cztery starty (10:00, 12:00, 15:00, 18:00) przez siedem dni, domyślna wyłączność i opcjonalna gra wspólna. Zadatek 500 zł jest rozliczany poza stroną. Nie implementuj płatności online, kont klientów, drużyn, rankingów ani ligi bez odrębnego zlecenia. Nie wymyślaj pozostałych cen, zasad zwrotu, operatora płatności ani liczby zestawów.

## Zanim zmienisz kod

- Przeczytaj `docs/STREFA29_MASTER_PLAN.md`, `docs/STREFA29_DECYZJE_DO_USTALENIA.md` i `.cursor/rules/`. `strona1_0.md`, `strona2_0.md` i starsze roadmapy są historią wymagań.
- Nie wymyślaj nazwy firmy, telefonu, e-maila, cen, opinii, zdjęć, wieku uczestników ani regulaminów.
- Nie wdrażaj na produkcję i nie scalaj zmian bez wyraźnej zgody.
- Sekrety zostają poza repozytorium. W `.env.example` są tylko nazwy zmiennych.
- Nie publikuj projektu polityki prywatności. Publiczna strona czeka na zatwierdzenie właściciela.

## Sprawdzenia

Po zmianie logiki uruchom `npm run typecheck`, `npm run lint`, `npm test` i `npm run build`. Po zmianie UI uruchom też `npm run test:e2e`. Nie opisuj testu jako zaliczonego, jeśli się nie wykonał.

## Etap 2.0

Architektura rezerwacji i płatności jest w `strona2_0.md` oraz w skillu `booking-payments-reliability`. Nie implementuj pobierania pieniędzy, dopóki checkout w `src/lib/business/checkout-gate.ts` ma `enabled: false` i decyzje D-05–D-23 pozostają otwarte. `/rezerwacja` prowadzi do zapytania.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
