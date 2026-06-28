import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <Image
        src="/FMS_logo.png"
        alt="Fluid Emotion Spectrum Logo"
        width={128}
        height={128}
        priority
        style={{ mixBlendMode: "multiply" }}
      />
      <h1
        className="font-semibold tracking-wide text-black select-none"
        style={{ fontSize: "1.2rem" }}
      >
        Fluid Emotion Spectrum
      </h1>
    </div>
  );
}
