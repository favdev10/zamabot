import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#111] py-12 text-gray-300 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
        {/* Left */}
        <div className="flex items-center gap-3">
          <Image
            src="/media/logo/logo1.png"
            alt="Zama Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold">
            zama<span className="text-yellow-400">chatbot</span>
          </span>
        </div>

        {/* Subscribe */}
        <div>
          <p className="text-xl mb-3">
            Get early drops & <br />
            updates from zamabot
          </p>
          <form className="flex bg-white rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 px-3 py-2 text-black outline-none"
              required
            />
            <button
              type="submit"
              className="bg-yellow-400 px-4 text-black font-bold hover:bg-yellow-300"
            >
              Subscribe →
            </button>
          </form>
        </div>

        {/* About Us */}
        <div>
          <h4 className="text-lg font-semibold mb-3">About Us</h4>
          <Link href="#" className="block hover:text-white">
            Who we are
          </Link>
          <Link href="#" className="block hover:text-white">
            Careers
          </Link>
          <Link href="#" className="block hover:text-white">
            FAQ
          </Link>
        </div>

        {/* Privacy + Social */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Privacy Policy</h4>
          <div className="flex gap-4 text-2xl text-yellow-400">
            <Link href="https://x.com/zama_fhe" target="_blank">
              <i className="fa-brands fa-x-twitter hover:text-white"></i>
            </Link>
            <Link href="https://discord.gg/zama" target="_blank">
              <i className="fa-brands fa-discord hover:text-white"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center text-[6rem] md:text-[10rem] font-extrabold text-yellow-400/10 whitespace-nowrap z-0">
        zamafhe
      </div>
    </footer>
  );
}
