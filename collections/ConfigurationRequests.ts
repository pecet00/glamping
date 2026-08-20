import type { CollectionConfig } from "payload";

export const ConfigurationRequests: CollectionConfig = {
  slug: "configuration-requests",

  admin: {
    useAsTitle: "email",
    defaultColumns: [
      "email",
      "status",
      "total",
      "createdAt",
    ],
  },

  access: {
    create: () => true,
    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },

  fields: [
    {
      name: "email",
      label: "E-mail",
      type: "email",
      required: true,
    },

    {
      name: "contactConsent",
      label: "Zgoda na kontakt",
      type: "checkbox",
      required: true,
    },

    {
      name: "configuration",
      label: "Konfiguracja",
      type: "json",
      required: true,
    },

    {
      name: "total",
      label: "Cena całkowita",
      type: "number",
      required: true,
      min: 0,
    },

    {
      name: "status",
      label: "Status",
      type: "select",
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
          label: "Oferta wysłana",
          value: "offer-sent",
        },
        {
          label: "Zamknięte",
          value: "closed",
        },
      ],
      required: true,
    },
  ],
};