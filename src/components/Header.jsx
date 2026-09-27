function Header() {
  return (
    <header className="bg-white rounded-3xl border border-gray-100/90 shadow-sm p-6 sm:p-8 md:p-9 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left Section: Title & Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl md:text-[32px] font-bold tracking-tight text-gray-900 leading-snug">
            Assignment Dashboard
          </h1>
          <p className="text-gray-500 text-sm sm:text-base font-normal">
            Track assignments and review submission progress.
          </p>
        </div>

        {/* Right Section: Large 📚 Icon */}
        <div className="shrink-0 self-start sm:self-center">
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-blue-50/70 border border-blue-100/80 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl shadow-xs select-none hover:scale-105 transition-transform duration-200"
            role="img"
            aria-label="Books and Learning Icon"
          >
            📚
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
