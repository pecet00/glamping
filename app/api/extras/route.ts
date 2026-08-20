import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "extras",
      where: {
        active: {
          equals: true,
        },
      },
      limit: 100,
      pagination: false,
      overrideAccess: true,
    });

    return NextResponse.json({
      docs: result.docs.map(({ id, label, price, active }) => ({
        id,
        label,
        price,
        active,
      })),
    });
  } catch (error) {
    console.error("Nie udało się pobrać dodatków", error);

    return NextResponse.json(
      { error: "Nie udało się pobrać dodatków." },
      { status: 500 }
    );
  }
}
