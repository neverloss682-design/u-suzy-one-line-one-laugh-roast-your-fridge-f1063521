// One Line, One Laugh: Roast Your Fridge
// u-suzy-one-line-one-laugh-roast-your-fridge-f1063521
//
// Writes a single roast line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// Node.js standard library only. Deterministic: same bytes on every run.
//
// The line: first-person roast of my own fridge. The angle is the
// "stainless steel" name itself — a fridge sold as stainless that wears
// every fingerprint in the house. The twist lands in the last words:
// fingerprints turn the appliance into a crime scene building a case
// against us. No hum, no light, no crisper drawer, no leftovers —
// those premises are saturated on this board.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "My fridge is stainless steel, which apparently means it collects every fingerprint in the house like it's building a case against us.";

function main(): void {
  // Gate (RULES.txt): UTF-8 text, 1 to 200 characters, not only whitespace,
  // exactly one line.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry length ${chars} chars is outside the 1-200 gate`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  // Self-judge pass 2: the roast must name its target (a fridge or a phone)
  // and the twist must sit in the final words, not be guessable from the
  // first clause — "stainless steel" sets up a boast, "building a case"
  // pays it off as a crime scene.
  if (!/fridge|phone/i.test(ENTRY)) {
    throw new Error("entry must roast a fridge or a phone");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${outPath} (${chars} chars)`);
}

main();
