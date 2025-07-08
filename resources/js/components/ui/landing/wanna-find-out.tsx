export default function WannaFindOutCarrousel() {
    return (
        <div className="overflow-hidden whitespace-nowrap bg-[#f9f5ef] border-t border-b border-black py-4">
            <div className="animate-marquee inline-block whitespace-nowrap">
                {Array.from({ length: 20 }).map((_, index) => (
                    <span
                        key={index}
                        className="mx-8 text-[#FF3B30] font-serif text-lg tracking-wide uppercase"
                    >
                        🚗 WANNA FIND OUT ? 🚗
                    </span>
                ))}
            </div>
        </div>
    );
}
