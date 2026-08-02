import { defineTool } from "@lovable.dev/mcp-js";
import { BOOK_PARTS, BOOK_CHAPTERS } from "@/lib/site-data";

export default defineTool({
  name: "get_book_outline",
  title: "Get book outline",
  description:
    "Return the full outline of Zeeshan Sabri's book: parts (I–VI) and every chapter with its lesson and related framework.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const outline = { parts: BOOK_PARTS, chapters: BOOK_CHAPTERS };
    return {
      content: [{ type: "text", text: JSON.stringify(outline, null, 2) }],
      structuredContent: outline,
    };
  },
});
