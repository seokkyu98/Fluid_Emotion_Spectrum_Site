import Image from "next/image";

export default function Header() {
  return (
    <div className="flex flex-col items-center gap-3 mb-8">
      <Image
        src="/FMS_logo.png"
        alt="Fluid Emotion Spectrum Logo"
        width={72}
        height={72}
        priority
      />
      <h1 className="text-2xl font-semibold tracking-wide text-black select-none">
        Fluid Emotion Spectrum
      </h1>
    </div>
  );
}
