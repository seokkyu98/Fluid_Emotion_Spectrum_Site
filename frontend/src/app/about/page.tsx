import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "서비스 소개 | Fluid Emotion Spectrum",
  description:
    "fluid-emotion-spectrum.com 서비스 소개 — AI 기반 감정 시각화 서비스 Fluid Emotion Spectrum에 대해 알아보세요.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">서비스 소개</h1>
      <p className="text-sm text-gray-500 mb-10">fluid-emotion-spectrum.com</p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Fluid Emotion Spectrum이란?</h2>
        <p className="text-gray-700 leading-relaxed">
          Fluid Emotion Spectrum은 사용자가 입력한 텍스트를 AI가 분석하여,
          감정의 강도(Arousal)·긍부정(Valence)·주도성(Dominance) 세 축으로
          수치화하고, 이를 실시간 색상과 파동 애니메이션으로 시각화하는
          감정 스펙트럼 서비스입니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">주요 기능</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 leading-relaxed">
          <li>자연어 텍스트 기반 감정 분석 (Claude AI 활용)</li>
          <li>감정 에너지 수준(Arousal)에 따른 차별화된 파동 애니메이션</li>
          <li>Perlin Noise 기반 유기적 제너러티브 아트 생성</li>
          <li>감정 벡터에서 파생된 개인화 색상 팔레트</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">기술 스택</h2>
        <p className="text-gray-700 leading-relaxed">
          프론트엔드는 Next.js, 백엔드는 FastAPI로 구성되어 있으며,
          감정 분석 엔진으로 Anthropic Claude 모델을 사용합니다.
          Canvas API와 수학적 노이즈 함수를 이용해 실시간 제너러티브
          애니메이션을 렌더링합니다.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">문의</h2>
        <p className="text-gray-700 leading-relaxed">
          서비스 관련 문의는 fluid-emotion-spectrum.com을 통해 접수해 주세요.
        </p>
      </section>

      <Link href="/" className="text-sm text-gray-400 hover:text-black transition-colors">
        ← 메인으로 돌아가기
      </Link>
    </main>
  );
}
