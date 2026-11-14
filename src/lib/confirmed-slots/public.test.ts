import { afterEach, describe, expect, it, vi } from "vitest";

import { getPublicConfirmedSlots } from "@/lib/confirmed-slots/public";
import { readConfirmedSlots } from "@/lib/confirmed-slots/store";

vi.mock("@/lib/prisma", () => ({ getPrisma: vi.fn(() => ({})) }));
vi.mock("@/lib/confirmed-slots/store", () => ({ readConfirmedSlots: vi.fn() }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.mocked(readConfirmedSlots).mockReset();
});

describe("public confirmed slot projection", () => {
  it("omits the inquiry identifier from published availability", async () => {
    vi.stubEnv("DATABASE_URL", "postgresql://test.invalid/test");
    vi.mocked(readConfirmedSlots).mockResolvedValue([
      { inquiryId: "private-inquiry-id", date: "2027-01-02", slot: "12:00", players: 8, privateSlot: true },
    ]);

    expect(await getPublicConfirmedSlots("2027-01-01")).toEqual({
      known: true,
      slots: [{ date: "2027-01-02", slot: "12:00", players: 8, privateSlot: true }],
    });
    expect(vi.mocked(readConfirmedSlots)).toHaveBeenCalledWith(expect.anything(), "2027-01-01");
  });

  it("marks capacity as unknown when the database is not configured", async () => {
    vi.stubEnv("DATABASE_URL", "");

    expect(await getPublicConfirmedSlots()).toEqual({ known: false, slots: [] });
    expect(vi.mocked(readConfirmedSlots)).not.toHaveBeenCalled();
  });

  it("marks capacity as unknown when reading confirmed slots fails", async () => {
    vi.stubEnv("DATABASE_URL", "postgresql://test.invalid/test");
    vi.mocked(readConfirmedSlots).mockRejectedValue(new Error("database offline"));

    expect(await getPublicConfirmedSlots()).toEqual({ known: false, slots: [] });
  });
});
