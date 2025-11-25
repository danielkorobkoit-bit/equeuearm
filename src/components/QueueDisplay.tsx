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
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* Grid Layout: 3:2 ratio */}
      <div className="grid grid-cols-5 h-full">
        {/* Left Panel - 3/5 - White area for ticket numbers (to be integrated) */}
        <div className="col-span-3 bg-background relative">
          {/* This area is reserved for external ticket display system */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground/30 select-none">
              <p className="text-2xl font-light">Область для модуля талонов</p>
            </div>
          </div>
        </div>

        {/* Right Panel - 2/5 - Branded content area */}
        <div 
          className="col-span-2 relative overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Background overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-transparent to-secondary/20"></div>
          
          {/* Animated decorative elements */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }}></div>

          {/* Content Container */}
          <div className="relative h-full flex flex-col items-center justify-between py-8 px-6 z-10">
            
            {/* Top: Logo */}
            <div className="animate-fade-in">
              <img 
                src={logo} 
                alt="ARMTEK Logo" 
                className="h-14 object-contain drop-shadow-2xl"
              />
            </div>

            {/* Center: Title and Clock */}
            <div className="text-center space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div>
                <h1 className="text-5xl font-black text-secondary mb-2 tracking-tight drop-shadow-xl queue-number-enter">
                  ЭЛЕКТРОННАЯ
                </h1>
                <h2 className="text-4xl font-black text-gradient-primary drop-shadow-xl queue-number-enter" style={{ animationDelay: "0.3s" }}>
                  ОЧЕРЕДЬ
                </h2>
                
                {/* Decorative line */}
                <div className="mt-4 flex justify-center">
                  <div className="h-1 w-32 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                </div>
              </div>

              {/* Clock */}
              <div className="space-y-1">
                <div className="text-5xl font-bold text-secondary tabular-nums tracking-tight drop-shadow-lg">
                  {formatTime(currentTime)}
                </div>
                <div className="text-base text-secondary/70 drop-shadow">
                  {formatDate(currentTime)}
                </div>
              </div>
            </div>

            {/* Bottom: Store Image */}
            <div className="animate-fade-in store-float" style={{ animationDelay: "0.4s" }}>
              <img 
                src={storeImage} 
                alt="ARMTEK Store" 
                className="h-40 object-contain drop-shadow-2xl opacity-95 hover:opacity-100 transition-all duration-500 hover:scale-105"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur-md text-background py-3 px-8 z-20 animate-fade-in" style={{ animationDelay: "0.6s" }}>
        <div className="flex items-center justify-between text-sm md:text-base">
          <div className="font-semibold">
            Добро пожаловать в ARMTEK
          </div>
          <div className="text-background/90">
            Следите за номерами на табло
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueDisplay;
