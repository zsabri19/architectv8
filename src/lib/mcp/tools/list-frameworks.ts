import { defineTool } from "@lovable.dev/mcp-js";
import { FRAMEWORKS } from "@/lib/site-data";

export default defineTool({
  name: "list_frameworks",
  title: "List frameworks",
  description:
    "List every ClarityOS framework authored by Zeeshan Sabri, with slug, title, one-line summary, and pillar. Use as an index before calling get_framework.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const items = FRAMEWORKS.map((f) => ({
      slug: f.slug,
      number: f.number,
      title: f.title,
      pillar: f.eyebrow,
      summary: f.summary,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { frameworks: items },
    };
  },
});
