import { type Metadata } from "next";

import { Root } from "@/views/Root";

export const metadata: Metadata = {
  title: "Country-Capital Match Game",
  description: "Match the country to the capital!",
  icons: {
    icon: {
      rel: "icon",
      url: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🧠</text></svg>",
    },
  },
};

export default Root;
