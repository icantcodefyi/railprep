import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useConversation } from "@elevenlabs/react";

// RailPrep Logo/Icon
const TrainIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="4" y="3" width="16" height="16" rx="2" />
    <path d="M4 11h16" />
    <path d="M12 3v8" />
    <circle cx="8" cy="15" r="1" fill="currentColor" />
    <circle cx="16" cy="15" r="1" fill="currentColor" />
  </svg>
);

export default function VoiceAssistant() {
  const agentId = import.meta.env.VITE_ELEVENLABS_AGENT_ID || "";
  const [inputValue, setInputValue] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const conversation = useConversation({
    micMuted: isMuted || isPaused,
    onConnect: () => {
      console.log("✅ Connected to ElevenLabs");
      setIsCallActive(true);
      setIsPaused(false);
    },
    onDisconnect: () => {
      console.log("❌ Disconnected from ElevenLabs");
      setIsCallActive(false);
    },
    onMessage: (message) => {
      console.log("📩 Message received:", message);
    },
    onError: (error) => {
      console.error("❌ Error:", error);
      alert(`Error: ${error.message || "Something went wrong"}`);
    },
    onModeChange: (mode) => {
      console.log("🔄 Mode changed:", mode);
    },
  });

  const startCall = async () => {
    try {
      console.log("🎤 Requesting microphone access...");
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      console.log("📞 Starting session with agent ID:", agentId);
      const conversationId = await conversation.startSession({
        agentId: agentId,
        connectionType: "webrtc",
      });
      
      console.log("✅ Session started! Conversation ID:", conversationId);
      setIsCallActive(true);
    } catch (error: any) {
      console.error("❌ Failed to start call:", error);
      alert(`Failed to start call: ${error.message || "Please check your microphone permissions and agent ID."}`);
    }
  };

  const endCall = async () => {
    await conversation.endSession();
    setIsCallActive(false);
    setIsMuted(false);
    setIsPaused(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const sendMessage = () => {
    if (inputValue.trim() && conversation.status === "connected") {
      try {
        conversation.sendUserMessage(inputValue);
        setInputValue("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (conversation.sendUserActivity) {
      conversation.sendUserActivity();
    }
  };

  const outputVolume = conversation.getOutputVolume?.() || 0;

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-white via-[#FFF1F2]/30 to-[#FFF1F2]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Navbar */}
      <nav className="px-6 py-4 flex-shrink-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EB4B7A] to-[#F58FB0] flex items-center justify-center shadow-lg shadow-[#EB4B7A]/20">
              <TrainIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#121212] tracking-tight">
                RailPrep
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {conversation.status === "connected" && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-green-100 text-[#22C55E] rounded-full text-xs font-semibold shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Active Session
              </div>
            )}
            <Link href="/">
              <a className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#EB4B7A] bg-white/50 hover:bg-white rounded-full transition-all border border-transparent hover:border-[#EB4B7A]/10 hover:shadow-md">
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Exit
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#EB4B7A]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F58FB0]/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-lg">
          {/* Voice Visualizer Container */}
          <div className="relative mb-12 h-64 w-64 flex items-center justify-center">
            {isCallActive ? (
              // Active Call Visualizer
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Outer Glow Rings */}
                <div 
                  className="absolute inset-0 rounded-full bg-[#EB4B7A]/5 animate-[ping_3s_ease-in-out_infinite]"
                  style={{ transform: `scale(${1 + outputVolume * 0.5})` }}
                ></div>
                <div 
                  className="absolute inset-4 rounded-full bg-[#EB4B7A]/10 animate-[ping_2s_ease-in-out_infinite]"
                  style={{ transform: `scale(${1 + outputVolume * 0.3})` }}
                ></div>
                
                {/* Main Morphing Blob */}
                <svg viewBox="0 0 200 200" className={`w-full h-full drop-shadow-2xl transition-all duration-500 ${isPaused ? 'opacity-50 grayscale' : ''}`}>
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EB4B7A" />
                      <stop offset="100%" stopColor="#F58FB0" />
                    </linearGradient>
                    <filter id="goo">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                      <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
                    </filter>
                  </defs>
                  <circle
                    cx="100"
                    cy="100"
                    r={conversation.isSpeaking && !isPaused ? 70 + outputVolume * 30 : 60}
                    fill="url(#gradient)"
                    className="transition-all duration-200 ease-out"
                    style={{
                      filter: 'url(#goo)',
                    }}
                  />
                </svg>

                {/* Center Content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {isPaused ? (
                    <div className="flex flex-col items-center gap-2 animate-fadeIn">
                      <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-[#EB4B7A]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-bold text-[#EB4B7A] shadow-sm">PAUSED</span>
                    </div>
                  ) : conversation.isSpeaking ? (
                    <div className="flex gap-1.5 items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1.5 bg-white rounded-full animate-[wave_1s_ease-in-out_infinite]"
                          style={{ 
                            height: `${12 + Math.random() * 24}px`,
                            animationDelay: `${i * 0.1}s` 
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 animate-pulse">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Idle State
              <div className="relative group cursor-pointer" onClick={startCall}>
                <div className="absolute inset-0 bg-[#EB4B7A]/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative w-48 h-48 bg-gradient-to-br from-[#EB4B7A] to-[#F58FB0] rounded-full flex items-center justify-center shadow-2xl shadow-[#EB4B7A]/30 transform group-hover:scale-105 transition-all duration-300">
                  <span className="text-6xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">🎙️</span>
                </div>
              </div>
            )}
          </div>

          {/* Assistant Info */}
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-4xl font-extrabold text-[#121212] tracking-tight">
              Priya
            </h2>
            <p className="text-[#EB4B7A] font-medium tracking-wide text-sm uppercase bg-[#EB4B7A]/5 px-4 py-1 rounded-full inline-block">
              AI Study Companion
            </p>
          </div>

          {/* Interactive Area */}
          <div className="w-full">
            {!isCallActive ? (
              <div className="text-center space-y-8">
                <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                  Ready to practice? I can help you with <span className="font-semibold text-[#121212]">RRB NTPC</span>, <span className="font-semibold text-[#121212]">Group D</span>, and more.
                </p>
                
                <button
                  onClick={startCall}
                  disabled={!agentId || agentId === "YOUR_AGENT_ID"}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#121212] text-white rounded-full font-semibold text-lg hover:bg-[#EB4B7A] hover:shadow-xl hover:shadow-[#EB4B7A]/20 transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22C55E]"></span>
                  </span>
                  Start Conversation
                </button>
              </div>
            ) : (
              <div className="space-y-6 w-full max-w-md mx-auto animate-fadeIn">
                {/* Controls */}
                <div className="flex items-center justify-center gap-6">
                  {/* Mute Button */}
                  <button
                    onClick={toggleMute}
                    disabled={isPaused}
                    className={`p-4 rounded-2xl transition-all duration-300 ${
                      isMuted 
                        ? 'bg-gray-100 text-gray-500 shadow-inner' 
                        : 'bg-white text-[#121212] shadow-lg hover:shadow-xl hover:scale-105 border border-gray-100'
                    } ${isPaused ? 'opacity-50 cursor-not-allowed' : ''}`}
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    )}
                  </button>

                  {/* Pause/Resume Button */}
                  <button
                    onClick={togglePause}
                    className={`p-5 rounded-3xl transition-all duration-300 shadow-xl hover:scale-105 hover:shadow-2xl border-2 ${
                      isPaused
                        ? 'bg-[#121212] text-white border-[#121212]'
                        : 'bg-white text-[#EB4B7A] border-[#EB4B7A]'
                    }`}
                    title={isPaused ? "Resume Call" : "Pause Call"}
                  >
                    {isPaused ? (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  {/* End Call Button */}
                  <button
                    onClick={endCall}
                    className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-500/30 hover:scale-105 border border-red-100"
                    title="End Call"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                    </svg>
                  </button>
                </div>

                {/* Input Area */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#EB4B7A] to-[#F58FB0] rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 -z-10"></div>
                  <div className="bg-white rounded-2xl p-2 flex items-center shadow-xl border border-gray-100">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      disabled={conversation.status !== "connected"}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400 font-medium"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!inputValue.trim() || conversation.status !== "connected"}
                      className="p-3 bg-[#121212] text-white rounded-xl hover:bg-[#EB4B7A] transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Debug Info */}
        {isCallActive && (
          <div className="absolute bottom-4 left-6 text-[10px] text-gray-400 font-mono opacity-50 hover:opacity-100 transition-opacity">
            ID: {agentId.substring(0, 8)}... • Status: {conversation.status}
          </div>
        )}
      </main>

      {/* Styles */}
      <style>{`
        @keyframes wave {
          0%, 100% { height: 12px; }
          50% { height: 32px; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
