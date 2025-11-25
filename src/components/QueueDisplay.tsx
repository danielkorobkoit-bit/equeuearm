import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import storeImage from "@/assets/store.png";
import backgroundImage from "@/assets/background.png";

const QueueDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      style={{
        aspectRatio: "16/9",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/20 to-transparent"></div>

      {/* Header with Logo and Clock */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-12 py-6 animate-fade-in">
        <img 
          src={logo} 
          alt="ARMTEK Logo" 
          className="h-12 md:h-16 object-contain drop-shadow-lg"
        />
        <div className="text-right">
          <div className="text-4xl md:text-5xl font-bold text-secondary tabular-nums tracking-tight drop-shadow-lg">
            {formatTime(currentTime)}
          </div>
          <div className="text-lg md:text-xl text-secondary/80 mt-1 drop-shadow">
            {formatDate(currentTime)}
          </div>
        </div>
      </header>

      {/* Main Title - Электронная очередь */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center animate-fade-in">
        <h1 className="text-7xl md:text-9xl font-black text-secondary mb-4 tracking-tight drop-shadow-2xl queue-number-enter">
          ЭЛЕКТРОННАЯ
        </h1>
        <h2 className="text-6xl md:text-8xl font-black text-gradient-primary drop-shadow-2xl queue-number-enter" style={{ animationDelay: "0.2s" }}>
          ОЧЕРЕДЬ
        </h2>
        
        {/* Decorative line */}
        <div className="mt-8 flex justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="h-1.5 w-64 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Store Image - smaller, positioned bottom right */}
      <div className="absolute bottom-8 right-8 z-5 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <img 
          src={storeImage} 
          alt="ARMTEK Store" 
          className="h-32 md:h-48 object-contain drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      {/* Animated decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 rounded-full bg-secondary/5 blur-2xl animate-pulse" style={{ animationDelay: "2s" }}></div>

      {/* Bottom Bar with Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-secondary/90 backdrop-blur-md text-background py-4 px-12 z-10 animate-fade-in" style={{ animationDelay: "0.8s" }}>
        <div className="flex items-center justify-between">
          <div className="text-xl md:text-2xl font-semibold">
            Добро пожаловать в ARMTEK
          </div>
          <div className="text-lg md:text-xl text-background/90">
            Следите за номерами на табло
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueDisplay;
