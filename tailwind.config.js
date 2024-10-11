// const { nextui } = require("@nextui-org/react");

const { nextui } = require("@nextui-org/react");

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{html,js}",
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         neutraface: ["Neutrafacetext-Normal"],
//         neutrafaceBold: ["Neutrafacetext-Bold"],
//         neutrafaceSemiBold: ["Neutrafacetext-SemiBold"],
//         neutrafaceLight: ["Neutrafacetext-Light"],
//         raleway: ["Raleway"],
//         dmSans: ["DM Sans"],
//       },
//       colors: {
//         paleTeal: "#A9E6E4",
//         paleLavender: "#E0B5E8",
//         purpoleColor: "#8F2B8A",
//         slateBlueColor: "#5151A6",
//         portGore: "#232550",
//         carnationRed: "#F54949",
//         oceanGreen: "#36AD79 ",
//         jaffaOrange: "#F58E48",
//         wildBlueYonder: "#7C7CBC",
//         eastBay: "#525589",
//         brand: "#DEECF1",
//         punch: "#D24627",
//         gullGray: "#98A2B3",
//         ebony: "#101828",
//         fiord: "#475467",
//         oxfordBlue: "#344054",
//         mischka: "#D0D5DD",
//         paleSky: "#667085",
//         modernGray: "#0D121C",
//         rhino: "#2C2E61",
//         snuff: "#D6D6EB",
//         whisper: "#F1F1F8",
//         snuffDark: "#D8D9EE",
//         periWinkleGray: "#D5D6EC",
//         cornflowerBlue: "#C3C3EF",
//         blueBell: "#9093CE",
//         lightOrchid: "#D799D4",
//         athensGray: "#F9FAFB",
//         ripeLemon: "#F6D109",
//         jungleGreen: "#32B17A",
//         jaffa: "#E67434",
//         goldTips: "#E9C816",
//         pending: "#F1C231",
//       },
//     },
//   },
//   darkMode: "class",
//   plugins: [nextui()],
// };

// tailwind.config.js
// const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        neutraface: ["Neutrafacetext-Normal"],
        neutrafaceBold: ["Neutrafacetext-Bold"],
        neutrafaceSemiBold: ["Neutrafacetext-SemiBold"],
        neutrafaceLight: ["Neutrafacetext-Light"],
        raleway: ["Raleway"],
        dmSans: ["DM Sans"],
      },
      colors: {
        paleTeal: "#A9E6E4",
        paleLavender: "#E0B5E8",
        purpoleColor: "#8F2B8A",
        slateBlueColor: "#5151A6",
        portGore: "#232550",
        carnationRed: "#F54949",
        oceanGreen: "#36AD79 ",
        jaffaOrange: "#F58E48",
        wildBlueYonder: "#7C7CBC",
        eastBay: "#525589",
        brand: "#DEECF1",
        punch: "#D24627",
        gullGray: "#98A2B3",
        ebony: "#101828",
        fiord: "#475467",
        oxfordBlue: "#344054",
        mischka: "#D0D5DD",
        paleSky: "#667085",
        modernGray: "#0D121C",
        rhino: "#2C2E61",
        snuff: "#D6D6EB",
        whisper: "#F1F1F8",
        snuffDark: "#D8D9EE",
        periWinkleGray: "#D5D6EC",
        cornflowerBlue: "#C3C3EF",
        blueBell: "#9093CE",
        lightOrchid: "#D799D4",
        athensGray: "#F9FAFB",
        ripeLemon: "#F6D109",
        jungleGreen: "#32B17A",
        jaffa: "#E67434",
        goldTips: "#E9C816",
        pending: "#F1C231",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
