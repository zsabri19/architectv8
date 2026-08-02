import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { FRAMEWORKS } from "@/lib/site-data";

export default defineTool({
  name: "get_framework",
  title: "Get framework",
  description:
    "Return the full detail — parameters, impact statement, and lead magnet — for a single ClarityOS framework by slug.",
  inputSchema: {
    slug: z.string().min(1).describe("Framework slug, e.g. '8c-crisis-to-clarity' or 'pyramid-framework'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const framework = FRAMEWORKS.find((f) => f.slug === slug);
    if (!framework) {
      return {
        content: [{ type: "text", text: `No framework found with slug '${slug}'.` }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(framework, null, 2) }],
      structuredContent: { framework },
    };
  },
});
