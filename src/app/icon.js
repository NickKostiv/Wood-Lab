import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <img src="/logo.jpg" alt="Icon" width={32} height={32} />
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}
