import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-black">
      <section className="flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 py-20 gap-10">
        {/* Left Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6">
            <span className="text-white">Zama</span>{" "}
            <span className="text-yellow-400">Chat-Bot</span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 mb-6">
            Your Intelligent AI Companion For Navigating The Zama Ecosystem.
            <br />
            Get Instant Answers, Learn How To Contribute, And Discover
            Opportunities.
          </p>
          <Link href="/chat">
            <button className="cursor-pointer bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition">
              Message our chatbot
            </button>
          </Link>
        </div>
        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/media/frames/abstract.png"
            alt="Zama illustration"
            width={460}
            height={460}
          />
        </div>
      </section>
    </section>
  );
}
