import { afterEach, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import PhotoImport from "../app/photo-import";

afterEach(() => cleanup());

test("shows the import prompt before a photo is chosen", () => {
  render(<PhotoImport />);
  expect(screen.getByText("Import a photo")).toBeDefined();
  expect(screen.queryByText(/Imported:/)).toBeNull();
  expect(screen.queryByText("The imported file isn't an image.")).toBeNull();
});

test("shows the file name after choosing an image", () => {
  const image = new File(["fake"], "beach.jpg", { type: "image/jpeg" });
  render(<PhotoImport />);
  fireEvent.change(screen.getByLabelText("Import a photo"), {
    target: { files: [image] },
  });
  expect(screen.getByText("beach.jpg")).toBeDefined();
  expect(screen.getByText("Choose another photo")).toBeDefined();
});
