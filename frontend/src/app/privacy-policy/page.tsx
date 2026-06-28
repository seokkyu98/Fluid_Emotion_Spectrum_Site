import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 | Fluid Emotion Spectrum",
  description:
    "fluid-emotion-spectrum.com 개인정보처리방침 — Fluid Emotion Spectrum 서비스의 개인정보 수집 및 이용에 관한 방침을 안내합니다.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">개인정보처리방침</h1>
      <p className="text-sm text-gray-500 mb-10">
        fluid-emotion-spectrum.com · 최종 수정일: 2026년 6월 29일
      </p>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">1. 수집하는 개인정보</h2>
        <p className="text-gray-700 leading-relaxed">
          Fluid Emotion Spectrum(이하 &quot;서비스&quot;, fluid-emotion-spectrum.com)은
          회원가입 없이 이용할 수 있으며, 별도의 개인 식별 정보를 수집하지
          않습니다. 다만, 서비스 품질 향상을 위해 아래 정보가 일시적으로
          처리될 수 있습니다.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mt-3 leading-relaxed">
          <li>사용자가 입력한 감정 텍스트 (분석 후 즉시 파기, 저장하지 않음)</li>
          <li>브라우저 접속 로그 (IP 주소, 접속 시각 — Vercel 플랫폼 자동 수집)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">2. 개인정보의 이용 목적</h2>
        <p className="text-gray-700 leading-relaxed">
          수집된 정보는 감정 분석 결과 제공 및 서비스 운영·장애 대응 목적으로만
          사용하며, 제3자에게 판매하거나 공유하지 않습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">3. 제3자 서비스</h2>
        <p className="text-gray-700 leading-relaxed">
          본 서비스는 다음 제3자 서비스를 활용합니다.
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-1 mt-3 leading-relaxed">
          <li>Anthropic Claude API — 감정 텍스트 분석 (Anthropic 개인정보처리방침 적용)</li>
          <li>Google AdSense — 광고 게재 (Google 개인정보처리방침 적용)</li>
          <li>Vercel — 웹 호스팅 (Vercel 개인정보처리방침 적용)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. 쿠키 및 광고</h2>
        <p className="text-gray-700 leading-relaxed">
          Google AdSense는 맞춤 광고 제공을 위해 쿠키를 사용할 수 있습니다.
          브라우저 설정에서 쿠키를 비활성화하거나,
          Google 광고 설정 페이지에서 개인 맞춤 광고를 거부할 수 있습니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. 개인정보 보유 기간</h2>
        <p className="text-gray-700 leading-relaxed">
          서비스는 사용자 텍스트를 서버에 저장하지 않습니다. 접속 로그는
          Vercel 플랫폼 정책에 따라 관리됩니다.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. 이용자의 권리</h2>
        <p className="text-gray-700 leading-relaxed">
          이용자는 언제든지 개인정보 처리에 관한 문의를 할 수 있으며,
          fluid-emotion-spectrum.com을 통해 접수해 주시면 성실히 답변
          드리겠습니다.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">7. 방침 변경</h2>
        <p className="text-gray-700 leading-relaxed">
          본 방침은 법령 또는 서비스 변경에 따라 업데이트될 수 있으며,
          변경 시 fluid-emotion-spectrum.com 페이지 상단에 공지합니다.
        </p>
      </section>

      <Link href="/" className="text-sm text-gray-400 hover:text-black transition-colors">
        ← 메인으로 돌아가기
      </Link>
    </main>
  );
}
