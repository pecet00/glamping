import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

const projectTypes = ["single", "park", "hotel", "other"] as const;

function isProjectType(
  value: string
): value is (typeof projectTypes)[number] {
  return projectTypes.includes(value as (typeof projectTypes)[number]);
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (!isRecord(body)) {
      return NextResponse.json(
        { error: "Nieprawidłowe dane formularza." },
        { status: 400 }
      );
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const project =
      typeof body.project === "string" && isProjectType(body.project)
        ? body.project
        : undefined;
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const contactConsent = body.contactConsent === true;

    if (!name) {
      return NextResponse.json(
        { error: "Imię i nazwisko jest wymagane." },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: "Adres e-mail jest wymagany." },
        { status: 400 }
      );
    }

    if (!contactConsent) {
      return NextResponse.json(
        { error: "Zgoda na kontakt jest wymagana." },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });
    const result = await payload.create({
      collection: "contact-requests",
      data: {
        name,
        email,
        phone,
        project,
        message,
        contactConsent: true,
        status: "new",
      },
      overrideAccess: true,
    });

    return NextResponse.json({ success: true, id: result.id }, { status: 201 });
  } catch (error) {
    console.error("Nie udało się zapisać zgłoszenia kontaktowego", error);

    return NextResponse.json(
      { error: "Nie udało się wysłać formularza." },
      { status: 500 }
    );
  }
}
