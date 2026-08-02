import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { SPEAKING } from "@/lib/site-data";

export default defineTool({
  name: "list_speaking_engagements",
  title: "List speaking engagements",
  description:
    "List keynotes, panels, workshops, and featured appearances. Optionally filter by band: 'upcoming', 'keynote', 'workshop', 'featured'.",
  inputSchema: {
    band: z
      .enum(["upcoming", "keynote", "workshop", "featured"])
      .optional()
      .describe("Filter by band. Omit to return all."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ band }) => {
    const items = band ? SPEAKING.filter((s) => s.band === band) : SPEAKING;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { engagements: items },
    };
  },
});
