import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fluid Emotion Spectrum | fluid-emotion-spectrum.com",
  description:
    "fluid-emotion-spectrum.com — 감정을 입력하면 AI가 실시간으로 분석해 색상과 파동으로 시각화하는 감정 스펙트럼 서비스입니다.",
  metadataBase: new URL("https://fluid-emotion-spectrum.com"),
  openGraph: {
    title: "Fluid Emotion Spectrum",
    description:
      "감정을 입력하면 AI가 실시간으로 분석해 색상과 파동으로 시각화하는 감정 스펙트럼 서비스입니다.",
    url: "https://fluid-emotion-spectrum.com",
    siteName: "Fluid Emotion Spectrum",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: "https://fluid-emotion-spectrum.com",
  },
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
