export function TrustBar() {
  const trustItems = [
    { text: '24/7 Availability' },
    { text: 'Fixed Pricing' },
    { text: 'M-Pesa Ready' },
    { text: '45min Free Wait' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-gold/10">
      <div className="luxury-container py-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-1 h-1 bg-gold rounded-full" />
              <span className="text-platinum/50 text-[10px] font-light tracking-[0.2em] uppercase whitespace-nowrap">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
