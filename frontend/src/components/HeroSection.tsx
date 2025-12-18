export const HeroSection = () => {
  return (
    <section className="h-dvh bg-gradient-to-b from-slate-900 via-slate-800 to-violet-900 text-white">
      <div className="flex h-full flex-col">
        {/* Mitten */}
        <div className="flex flex-1 items-center justify-center px-6 text-center">
          <div>
            <h1 className="text-5xl font-bold mb-10">Welcome to Masters.gg</h1>

            <p className="text-2xl font-bold mb-2">
              Elevate your game together with challenger.com.
            </p>
            <p className="text-2xl font-bold">Play, learn and socialize.</p>
          </div>
        </div>

        {/* Botten */}
        <div className="flex justify-center mb-40">
          <div
            className="
              animate-bounce
              text-white/70
              text-2xl
              w-16 h-16
              flex items-center justify-center
              rounded-full
              border border-white/30
            "
          >
            ↓
          </div>
        </div>
      </div>
    </section>
  );
};
