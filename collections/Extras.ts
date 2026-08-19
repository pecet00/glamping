import type { CollectionConfig } from "payload";

export const Extras: CollectionConfig = {
  slug: "extras",

  admin: {
    useAsTitle: "label",
  },

  fields: [
    {
      name: "id",
      label: "ID",
      type: "text",
      required: true,
      unique: true,
    },

    {
      name: "label",
      label: "Nazwa dodatku",
      type: "text",
      required: true,
    },

    {
      name: "price",
      label: "Cena",
      type: "number",
      required: true,
      min: 0,
    },

    {
      name: "active",
      label: "Aktywny",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};