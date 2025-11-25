import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import storeImage from "@/assets/store.png";
import backgroundImage from "@/assets/background.png";

interface QueueNumber {
  id: string;
  number: string;
  window: string;
  isActive: boolean;
}

const QueueDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [queueNumbers, setQueueNumbers] = useState<QueueNumber[]>([
    { id: "1", number: "A247", window: "Окно 3", isActive: true },
    { id: "2", number: "B156", window: "Окно 1", isActive: false },
    { id: "3", number: "A248", window: "Окно 5", isActive: false },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate queue updates every 10 seconds
    const queueTimer = setInterval(() => {
      setQueueNumbers(prev => {
        const newNumber = {
          id: Date.now().toString(),
          number: `A${Math.floor(Math.random() * 900 + 100)}`,
          window: `Окно ${Math.floor(Math.random() * 5 + 1)}`,
          isActive: true,
        };
        
        const updated = prev.map(item => ({ ...item, isActive: false }));
        return [newNumber, ...updated].slice(0, 3);
      });
    }, 10000);

    return () => clearInterval(queueTimer);
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
        backgroundPosition: "right",
      }}
    >
      {/* Header with Logo and Clock */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-12 py-8">
        <img 
          src={logo} 
          alt="ARMTEK Logo" 
          className="h-16 md:h-20 object-contain animate-fade-in"
        />
        <div className="text-right animate-fade-in">
          <div className="text-5xl md:text-6xl font-bold text-secondary tabular-nums tracking-tight">
            {formatTime(currentTime)}
          </div>
          <div className="text-xl md:text-2xl text-muted-foreground mt-2">
            {formatDate(currentTime)}
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 h-full">
        {/* Left Panel - Queue Numbers */}
        <div className="relative flex flex-col justify-center items-center bg-background/95 backdrop-blur-sm px-12">
          <div className="w-full max-w-2xl space-y-8 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-12 text-center">
              Вызов клиента
            </h2>
            
            {queueNumbers.map((item, index) => (
              <div
                key={item.id}
                className={`
                  transition-all duration-500 ease-out
                  ${item.isActive ? 'queue-number-pulse queue-number-enter' : 'opacity-60 scale-95'}
                  ${index === 0 ? '' : 'mt-6'}
                `}
              >
                <div className={`
                  rounded-3xl p-8 md:p-10
                  ${item.isActive 
                    ? 'bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-2xl' 
                    : 'bg-muted text-muted-foreground'
                  }
                  transition-all duration-500
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className={`
                        text-7xl md:text-8xl font-black tracking-tight mb-2
                        ${item.isActive ? 'text-primary-foreground' : 'text-secondary'}
                      `}>
                        {item.number}
                      </div>
                      <div className={`
                        text-2xl md:text-3xl font-semibold
                        ${item.isActive ? 'text-primary-foreground/90' : 'text-muted-foreground'}
                      `}>
                        {item.window}
                      </div>
                    </div>
                    {item.isActive && (
                      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary-foreground/20 animate-pulse">
                        <svg 
                          className="w-10 h-10 text-primary-foreground" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Decoration */}
          <div className="absolute bottom-12 left-0 right-0 px-12">
            <div className="h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full opacity-30"></div>
          </div>
        </div>

        {/* Right Panel - Store Image */}
        <div 
          className="relative flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.1) 20%, transparent 40%), url(${storeImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 via-transparent to-transparent"></div>
          
          {/* Animated circles */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Bottom Bar with Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-secondary/95 backdrop-blur-sm text-background py-6 px-12 z-10">
        <div className="flex items-center justify-between">
          <div className="text-xl md:text-2xl font-semibold">
            Добро пожаловать в ARMTEK
          </div>
          <div className="text-lg md:text-xl text-background/80">
            Следите за своим номером на экране
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueueDisplay;
