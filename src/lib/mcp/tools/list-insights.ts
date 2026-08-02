import { defineTool } from "@lovable.dev/mcp-js";
import { ARTICLES } from "@/lib/site-data";

export default defineTool({
  name: "list_insights",
  title: "List insights",
  description:
    "List published articles and essays with slug, title, category, date, summary, and related framework slug.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    return {
      content: [{ type: "text", text: JSON.stringify(ARTICLES, null, 2) }],
      structuredContent: { articles: ARTICLES },
    };
  },
});
