import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const phone =
      typeof body.phone === "string"
        ? body.phone.trim()
        : "";

    const project =
      typeof body.project === "string"
        ? body.project
        : "";

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    const contactConsent =
      body.contactConsent === true;

    if (!name) {
      return NextResponse.json(
        {
          error: "Imię i nazwisko jest wymagane.",
        },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          error: "Adres e-mail jest wymagany.",
        },
        { status: 400 }
      );
    }

    if (!contactConsent) {
      return NextResponse.json(
        {
          error: "Zgoda na kontakt jest wymagana.",
        },
        { status: 400 }
      );
    }

    const payload = await getPayload({
      config,
    });

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
    });

    return NextResponse.json(
      {
        success: true,
        id: result.id,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    console.error(
      "BŁĄD CONTACT REQUEST:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Nie udało się wysłać formularza.",
      },
      {
        status: 500,
      }
    );
  }
}