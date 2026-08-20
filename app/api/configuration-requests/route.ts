import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
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

    const email = typeof body.email === "string" ? body.email.trim() : "";
    const contactConsent = body.contactConsent === true;
    const total = typeof body.total === "number" && Number.isFinite(body.total) && body.total >= 0
      ? body.total
      : null;

    if (!email) {
      return NextResponse.json(
        { error: "E-mail jest wymagany." },
        { status: 400 }
      );
    }

    if (!contactConsent) {
      return NextResponse.json(
        { error: "Wymagana jest zgoda na kontakt." },
        { status: 400 }
      );
    }

    if (!isRecord(body.configuration) || total === null) {
      return NextResponse.json(
        { error: "Nieprawidłowa konfiguracja." },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });
    const result = await payload.create({
      collection: "configuration-requests",
      data: {
        email,
        contactConsent: true,
        configuration: body.configuration,
        total,
        status: "new",
      },
      overrideAccess: true,
    });

    return NextResponse.json({ success: true, id: result.id }, { status: 201 });
  } catch (error) {
    console.error("Nie udało się zapisać konfiguracji", error);

    return NextResponse.json(
      { error: "Nie udało się zapisać konfiguracji." },
      { status: 500 }
    );
  }
}
