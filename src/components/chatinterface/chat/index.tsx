export default function Chat() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <section className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4 relative">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
          Welcome To <span className="text-yellow-400">Zama-Chatbot</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-10">
          Hi There 👋 Welcome To Zama-Chatbot! How Can I Help You Today?
        </p>

        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="flex flex-col items-center">
            <i className="fa-solid fa-bell text-3xl mb-2 text-yellow-400"></i>
            <p className="text-sm text-gray-300">
              Smart notifications on new messages
            </p>
          </div>

          <div className="flex flex-col items-center">
            <i className="fa-solid fa-comments text-3xl mb-2 text-yellow-400"></i>
            <p className="text-sm text-gray-300">Real-time chat with chatbot</p>
          </div>

          <div className="flex flex-col items-center">
            <i className="fa-solid fa-magnifying-glass text-3xl mb-2 text-yellow-400"></i>
            <p className="text-sm text-gray-300">
              Search & filter info in chats easily
            </p>
          </div>
        </div>

        <div className="flex items-center bg-gradient-to-r from-yellow-600/20 to-yellow-400/20 border border-yellow-400/40 rounded-full px-4 py-2 w-full max-w-2xl">
          <input
            type="text"
            placeholder="Start Message With Customers, Say Hi 👋"
            className="flex-1 bg-transparent outline-none text-white px-3 placeholder-gray-400"
          />
          <button
            title="Send Message"
            type="button"
            className="bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-300 transition"
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </section>
    </div>
  );
}
