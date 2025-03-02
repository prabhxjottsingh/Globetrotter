import React, { useState, useRef } from "react";

const FactSlider = ({
  fun_fact,
  trivia,
}: {
  fun_fact: string[];
  trivia: string[];
}) => {
  const [factIndex, setFactIndex] = useState(1);
  const factContentRef = useRef<HTMLParagraphElement>(null);
  const maxIndex = 3;

  const getFactContent = (index: number) => {
    if (index === 0) return fun_fact[0] || "";
    if (index === 1) return fun_fact[1] || "";
    if (index === 2) return trivia?.[0] || "No trivia available";
    return trivia?.[1] || "No additional trivia available";
  };

  const changeFactContent = (newIndex: number) => {
    if (newIndex < 0 || newIndex > maxIndex) return;

    if (factContentRef.current) {
      factContentRef.current.style.opacity = "0";
      factContentRef.current.style.transform = "translateY(10px)";

      setTimeout(() => {
        setFactIndex(newIndex);
        if (factContentRef.current) {
          factContentRef.current.style.opacity = "1";
          factContentRef.current.style.transform = "translateY(0)";
        }
      }, 150);
    }
  };

  const handlePrev = () => {
    changeFactContent(factIndex - 1);
  };

  const handleNext = () => {
    changeFactContent(factIndex + 1);
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative min-h-[80px]">
        <p
          ref={factContentRef}
          className="text-center text-gray-600 p-4 bg-gray-50 rounded-lg w-full transition-all duration-300 ease-in-out"
          style={{ opacity: 1, transform: "translateY(0)" }}
        >
          {getFactContent(factIndex)}
        </p>
      </div>

      <div className="flex justify-center gap-2 mt-2">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              factIndex === index ? "bg-primary-600 scale-125" : "bg-gray-300"
            }`}
            onClick={() => changeFactContent(index)}
            aria-label={`Go to fact ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FactSlider;
