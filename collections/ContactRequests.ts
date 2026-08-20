import type { CollectionConfig } from "payload";

export const ContactRequests: CollectionConfig = {
  slug: "contact-requests",

  admin: {
    useAsTitle: "email",
    defaultColumns: [
      "name",
      "email",
      "phone",
      "project",
      "status",
      "createdAt",
    ],
  },

  access: {
    // Formularz publiczny może utworzyć zgłoszenie
    create: () => true,

    // Odczyt tylko po zalogowaniu do panelu
    read: ({ req }) => Boolean(req.user),

    update: ({ req }) => Boolean(req.user),

    delete: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: "name",
      label: "Imię i nazwisko",
      type: "text",
      required: true,
    },

    {
      name: "email",
      label: "E-mail",
      type: "email",
      required: true,
    },

    {
      name: "phone",
      label: "Telefon",
      type: "text",
    },

    {
      name: "project",
      label: "Typ projektu",
      type: "select",
      options: [
        {
          label: "Jeden namiot",
          value: "single",
        },
        {
          label: "Park glampingowy",
          value: "park",
        },
        {
          label: "Resort / hotel",
          value: "hotel",
        },
        {
          label: "Inny projekt",
          value: "other",
        },
      ],
    },

    {
      name: "message",
      label: "Wiadomość",
      type: "textarea",
    },

    {
      name: "contactConsent",
      label: "Zgoda na kontakt",
      type: "checkbox",
      required: true,
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        {
          label: "Nowe",
          value: "new",
        },
        {
          label: "W kontakcie",
          value: "contacted",
        },
        {
          label: "Zamknięte",
          value: "closed",
        },
      ],
    },
  ],
};