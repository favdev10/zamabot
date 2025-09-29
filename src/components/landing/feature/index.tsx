import Image from "next/image";

export default function FeaturesSection() {
  const features = [
    {
      title: "🚀 Contribute & Earn",
      desc: "Discover opportunities to contribute to Zama and generate returns.",
    },
    {
      title: "🎓 Learn & Understand",
      desc: "Get complex FHE and Web3 concepts explained in simple terms.",
    },
    {
      title: "📈 Stay Updated",
      desc: "Get the latest news and developments in the Zama ecosystem.",
    },
    {
      title: "💡 Get Guidance",
      desc: "Receive personalized tips and strategies for your Web3 journey.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-t from-black via-[#fdca31cb] to-black py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 px-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition"
          >
            <h3 className="text-2xl lg:text-3xl mb-3">{f.title}</h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Ribbon Image */}
      <Image
        src="/media/frames/3D2.png"
        alt="Ribbon"
        width={384}
        height={384}
        className="absolute right-0 bottom-0 opacity-80 pointer-events-none -z-10"
      />
    </section>
  );
}
