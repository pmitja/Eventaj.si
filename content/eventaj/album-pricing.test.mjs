import assert from "node:assert/strict";
import test from "node:test";
import { getAlbumPrice } from "./album-pricing.ts";

test("charges both album sizes correctly for a 2-hour Photo Booth", () => {
  assert.equal(getAlbumPrice(2, "small"), 20);
  assert.equal(getAlbumPrice(2, "large"), 30);
});

test("includes the small album and charges 15 euros for the large one from 3 hours", () => {
  assert.equal(getAlbumPrice(3, "small"), 0);
  assert.equal(getAlbumPrice(3, "large"), 15);
  assert.equal(getAlbumPrice(4, "small"), 0);
  assert.equal(getAlbumPrice(4, "large"), 15);
});
