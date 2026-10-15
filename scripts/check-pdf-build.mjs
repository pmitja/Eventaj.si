// Run after `pnpm build` to check PDF rendering from the production bundle.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const require = createRequire(path.resolve(".next/standalone/package.json"));
const { createElement } = require("react");
const { Document, Page, Text, renderToBuffer } = await import(
  pathToFileURL(require.resolve("@react-pdf/renderer")).href
);

const pdf = await renderToBuffer(
  createElement(Document, null,
    createElement(Page, null, createElement(Text, null, "PDF production build check")),
  ),
);

assert.equal(pdf.subarray(0, 5).toString(), "%PDF-");
console.log(`Production PDF rendering passed (${pdf.length} bytes)`);
