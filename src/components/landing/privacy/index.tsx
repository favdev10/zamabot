import Image from "next/image";

export default function PrivacySection() {
  return (
    <section className="bg-black">
      <section className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-20 gap-10">
        {/* Left Text */}
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-yellow-400 mb-4">
            Meet Your Web 3 <br />
            Privacy Guide
          </h2>
          <div className="flex items-center mb-6">
            <span className="ml-4">
              <Image
                src="/media/frames/Arrow 1.png"
                alt="Arrow"
                width={173}
                height={30}
              />
            </span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            Zama Bot is an AI-Powered Assistant designed to help newcomers and
            experts alike understand and engage with the Zama Protocol
            Ecosystem. Whether you&apos;re curious about Fully Homomorphic
            Encryption or looking for ways to contribute and earn, we&apos;ve
            got you covered.
          </p>
        </div>
        {/* Right Icon */}
        <div className="flex-shrink-0">
          <Image
            src="/media/frames/mask.png"
            alt="Privacy Icon"
            width={112}
            height={112}
          />
        </div>
      </section>
    </section>
  );
}
