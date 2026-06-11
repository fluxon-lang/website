import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: qorong'i panel fonida Fraunces Italic "fx" — hero'dagi konturli belgi bilan bir xil shrift
export default async function Icon() {
  const fraunces = await readFile(
    join(process.cwd(), "app/_assets/fraunces-italic.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1f1a13",
          borderRadius: 14,
          fontFamily: "Fraunces",
          fontStyle: "italic",
          fontSize: 42,
          lineHeight: 1,
        }}
      >
        <span style={{ color: "#f8f2e6" }}>f</span>
        <span style={{ color: "#e04e14" }}>x</span>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, style: "italic", weight: 600 },
      ],
    },
  );
}
