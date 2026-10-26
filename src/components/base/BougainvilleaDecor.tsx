import type { ReactNode } from "react";

interface BougainvilleaDecorProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  size?: "sm" | "md" | "lg";
  opacity?: number;
}

export function BougainvilleaCorner({
  position = "top-right",
  size = "md",
  opacity = 0.6,
}: BougainvilleaDecorProps) {
  const sizeClasses = {
    sm: "w-24 h-24 md:w-32 md:h-32",
    md: "w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56",
    lg: "w-40 h-40 md:w-56 md:h-56 lg:w-72 lg:h-72",
  };

  const positionClasses = {
    "top-right": "-top-4 -right-4 md:-top-8 md:-right-8",
    "top-left": "-top-4 -left-4 md:-top-8 md:-left-8",
    "bottom-right": "-bottom-4 -right-4 md:-bottom-8 md:-right-8",
    "bottom-left": "-bottom-4 -left-4 md:-bottom-8 md:-left-8",
  };

  return (
    <div
      className={`absolute ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none z-0`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <img
        src="https://readdy.ai/api/search-image?query=Isolated%20bougainvillea%20flower%20branch%20with%20vibrant%20pink%20magenta%20petals%20and%20green%20leaves%20on%20transparent%20background%2C%20botanical%20illustration%20style%2C%20soft%20natural%20lighting%2C%20delicate%20cascading%20flowers%2C%20clean%20edges%2C%20decorative%20floral%20element&width=400&height=400&seq=bougainvillea-corner-01&orientation=squarish"
        alt=""
        className="w-full h-full object-contain"
      />
    </div>
  );
}

interface PetalScatterProps {
  count?: number;
  className?: string;
}

export function PetalScatter({ count = 6, className = "" }: PetalScatterProps) {
  const petals = [
    { top: "8%", left: "5%", size: "w-2 h-2", delay: "0s" },
    { top: "20%", left: "12%", size: "w-1.5 h-1.5", delay: "0.5s" },
    { top: "15%", left: "85%", size: "w-2.5 h-2.5", delay: "1s" },
    { top: "45%", left: "92%", size: "w-1.5 h-1.5", delay: "1.5s" },
    { top: "70%", left: "8%", size: "w-2 h-2", delay: "0.3s" },
    { top: "85%", left: "90%", size: "w-1.5 h-1.5", delay: "0.8s" },
    { top: "35%", left: "3%", size: "w-1.5 h-1.5", delay: "1.2s" },
    { top: "60%", left: "95%", size: "w-2 h-2", delay: "0.6s" },
    { top: "90%", left: "15%", size: "w-1.5 h-1.5", delay: "1.8s" },
    { top: "50%", left: "88%", size: "w-2 h-2", delay: "1.1s" },
  ];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {petals.slice(0, count).map((petal, idx) => (
        <div
          key={idx}
          className={`absolute rounded-full bg-accent-500/25 ${petal.size}`}
          style={{
            top: petal.top,
            left: petal.left,
            animationDelay: petal.delay,
          }}
        />
      ))}
    </div>
  );
}

interface FlowerDividerProps {
  children: ReactNode;
  className?: string;
  showCorner?: boolean;
  cornerPosition?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  showPetals?: boolean;
  petalCount?: number;
}

export function FlowerSection({
  children,
  className = "",
  showCorner = true,
  cornerPosition = "top-right",
  showPetals = true,
  petalCount = 6,
}: FlowerDividerProps) {
  return (
    <section className={`relative ${className}`}>
      {showCorner && (
        <BougainvilleaCorner position={cornerPosition} size="md" opacity={0.5} />
      )}
      {showPetals && <PetalScatter count={petalCount} />}
      <div className="relative z-10">{children}</div>
    </section>
  );
}