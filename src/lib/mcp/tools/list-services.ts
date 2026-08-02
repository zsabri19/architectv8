import { defineTool } from "@lovable.dev/mcp-js";
import { SERVICES, SITE } from "@/lib/site-data";

export default defineTool({
  name: "list_services",
  title: "List services",
  description:
    "List every engagement tier (personal, enterprise, advisory) with price, cadence, description, and booking link.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = SERVICES.map((s) => ({
      slug: s.slug,
      tier: s.tier,
      title: s.title,
      price: s.price,
      cadence: s.cadence,
      description: s.description,
      cta: s.cta,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { services: items, bookingUrl: SITE.bookSessionUrl },
    };
  },
});
