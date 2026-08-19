import type { CollectionConfig } from "payload";

export const Photo: GalleryConfig = {
    slug: "gallery",
    auth: true,
    fields:[
        {
            name: "name",
            type: "text",
            require: true,
        },
        {
            name: "src",
            type:"text",
        },
        {
            name: "description",
            type:"text",
        },
    ],
};