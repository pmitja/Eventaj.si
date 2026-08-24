import assert from "node:assert/strict";
import test from "node:test";
import { calculateInquiryPrice } from "./inquiry-price.ts";

test("uses the selected Photo Booth duration in the emailed price", () => {
  assert.equal(calculateInquiryPrice("basic", "2", 1), 279);
  assert.equal(calculateInquiryPrice("basic", "3", 1), 329);
  assert.equal(calculateInquiryPrice("basic", "4", 1), 379);
});

test("uses the selected 360 Booth duration in the emailed price", () => {
  assert.equal(calculateInquiryPrice("360", "2", 1), 299);
  assert.equal(calculateInquiryPrice("360", "3", 1), 349);
  assert.equal(calculateInquiryPrice("360", "4", 1), 399);
});

test("keeps equipment and custom combination pricing behavior", () => {
  assert.equal(calculateInquiryPrice("equipment", "1 dan", 4), 40);
  assert.equal(calculateInquiryPrice("both", "4", 1), 0);
});
