import { defineTool } from "@lovable.dev/mcp-js";
import { SITE, METRICS } from "@/lib/site-data";

export default defineTool({
  name: "get_site_info",
  title: "Get site info",
  description:
    "Return the site's public identity: name, role, tagline, contact email, booking URL, headline metrics, and social links.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = { site: SITE, metrics: METRICS };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
