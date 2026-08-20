import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("=== CONFIGURATION REQUEST ===");
    console.log(
      JSON.stringify(body, null, 2)
    );

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const consent =
      body.contactConsent === true;

    if (!email) {
      return NextResponse.json(
        {
          error:
            "E-mail jest wymagany.",
        },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        {
          error:
            "Wymagana jest zgoda na kontakt.",
        },
        { status: 400 }
      );
    }

    const payload =
      await getPayload({
        config,
      });

    console.log(
      "Payload załadowany"
    );

    const result =
      await payload.create({
        collection:
          "configuration-requests",

        data: {
          email,

          contactConsent: true,

          configuration:
            body.configuration,

          total:
            typeof body.total === "number"
              ? body.total
              : 0,

          status: "new",
        },
      });

    console.log(
      "ZAPISANO:",
      result.id
    );

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
      "================================"
    );

    console.error(
      "BŁĄD CONFIGURATION REQUEST"
    );

    console.error(
      "================================"
    );

    console.error(
      "NAME:",
      error?.name
    );

    console.error(
      "MESSAGE:",
      error?.message
    );

    console.error(
      "DATA:",
      error?.data
    );

    console.error(
      "ERRORS:",
      error?.errors
    );

    console.error(
      "STACK:",
      error?.stack
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Nie udało się zapisać konfiguracji.",

        details:
          error?.errors || null,
      },
      {
        status: 500,
      }
    );
  }
}