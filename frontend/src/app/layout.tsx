import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fluid Emotion Spectrum",
  description: "실시간 감정 반응형 시각화",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-white antialiased">{children}</body>
    </html>
  );
}
