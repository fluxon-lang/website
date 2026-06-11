import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS home-screen ikonkasi — favicon bilan bir xil brend belgi, kattaroq o'lchamda
// (burchaklarni iOS o'zi yumaloqlaydi, shuning uchun borderRadius yo'q)
export default async function AppleIcon() {
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
          fontFamily: "Fraunces",
          fontStyle: "italic",
          fontSize: 112,
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
