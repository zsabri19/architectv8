import { defineMcp } from "@lovable.dev/mcp-js";
import listFrameworks from "./tools/list-frameworks";
import getFramework from "./tools/get-framework";
import listServices from "./tools/list-services";
import listSpeaking from "./tools/list-speaking";
import listInsights from "./tools/list-insights";
import getBookOutline from "./tools/get-book-outline";
import getSiteInfo from "./tools/get-site-info";

export default defineMcp({
  name: "architect-global-mkts",
  title: "Zeeshan Sabri — Architect",
  version: "0.1.0",
  instructions:
    "Public read-only tools for global-mkts.com. Use these to answer questions about Zeeshan Sabri's ClarityOS frameworks, services and pricing, speaking engagements, insights, quote vault, book outline, and site identity. All data is already published on the public site.",
  tools: [
    listFrameworks,
    getFramework,
    listServices,
    listSpeaking,
    listInsights,
    getBookOutline,
    getSiteInfo,
  ],
});
