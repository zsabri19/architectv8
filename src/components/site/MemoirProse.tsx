import type { MemoirBlock } from "@/lib/memoir/bodies";

export function previewBlocks(blocks: MemoirBlock[], paragraphLimit: number): MemoirBlock[] {
  let paragraphs = 0;
  const out: MemoirBlock[] = [];
  for (const block of blocks) {
    out.push(block);
    if (block.type === "p") {
      paragraphs += 1;
      if (paragraphs >= paragraphLimit) break;
    }
  }
  return out;
}

export function MemoirProse({ blocks }: { blocks: MemoirBlock[] }) {
  return (
    <div className="memoir-prose">
      {blocks.map((block, index) => {
        if (block.type === "h2") {
          return <h2 key={index}>{block.text}</h2>;
        }
        if (block.type === "epigraph") {
          return (
            <blockquote key={index} className="memoir-epigraph">
              {block.text}
              {block.cite ? <cite>{block.cite}</cite> : null}
            </blockquote>
          );
        }
        return <p key={index}>{block.text}</p>;
      })}
    </div>
  );
}
