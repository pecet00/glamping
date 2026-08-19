export const models = [
  {
    id: "safari",
    label: "Safari",
    img: "/img/_MG_0980-HDR.jpg",
    base: 82000,
  },
  {
    id: "family",
    label: "Rodzinna",
    img: "/img/_MG_1001-HDR.jpg",
    base: 98000,
  },
  {
    id: "suite",
    label: "Suite",
    img: "/img/_MG_0870-HDR.jpg",
    base: 108000,
  },
];

export const sizes = [
  {
    id: "s",
    label: "28 m²",
    add: 0,
  },
  {
    id: "m",
    label: "36 m²",
    add: 16000,
  },
  {
    id: "l",
    label: "48 m²",
    add: 32000,
  },
];

export const woods = [
  {
    id: "spruce",
    label: "Świerk + płótno",
    add: 0,
  },
  {
    id: "thermo",
    label: "Thermo + PVC",
    add: 9000,
  },
  {
    id: "oak",
    label: "Sklejka premium",
    add: 14000,
  },
];

export const quantities = [
  {
    id: "1",
    label: "1 szt.",
    mul: 1,
  },
  {
    id: "2",
    label: "2 szt.",
    mul: 2,
  },
  {
    id: "4",
    label: "4 szt. · park",
    mul: 4,
  },
  {
    id: "6",
    label: "6 szt. · park",
    mul: 6,
  },
];

export const extras = [
  {
    id: "ac",
    label: "Klimatyzacja",
    add: 9000,
  },
  {
    id: "deck",
    label: "Taras XL",
    add: 8000,
  },
  {
    id: "bath",
    label: "Łazienka",
    add: 16000,
  },
  {
    id: "kitchen",
    label: "Aneks",
    add: 7000,
  },
  {
    id: "install",
    label: "Montaż na działce",
    add: 12000,
  },
];

export type Config = {
  model: string;
  size: string;
  wood: string;
  qty: string;
  extras: string[];
};

export const defaultConfig: Config = {
  model: "safari",
  size: "m",
  wood: "spruce",
  qty: "1",
  extras: ["deck", "ac", "install"],
};