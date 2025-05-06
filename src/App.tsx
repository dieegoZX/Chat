import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, BarChart2, Code, Calendar, Circle, Zap } from 'lucide-react';

// Message type definition
interface Message {
  text: string;
  sender: 'bot' | 'user';
  time: string;
}

// Service card component
const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-[#2a2a2a] rounded-xl p-4 my-2.5 border-l-4 border-[#00ff9d] shadow-md">
    <h3 className="m-0 mb-2 text-[#00ff9d] text-base flex items-center gap-2">
      {icon}
      {title}
    </h3>
    <p className="m-0 text-sm opacity-90">{description}</p>
  </div>
);

// Button component
const ActionButton = ({ icon, text, onClick }: { icon: React.ReactNode, text: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="bg-[#333] text-white py-2.5 px-4 rounded-lg border-none cursor-pointer text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-md hover:bg-[#00ff9d] hover:text-black hover:-translate-y-0.5"
  >
    {icon}
    {text}
  </button>
);

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      text: `
        <div class="flex items-center gap-2 mb-2.5">
          <span class="text-[#00ff9d] text-xl"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg></span>
          <span class="font-semibold">Assistente Digital LINKY</span>
        </div>
        Olá! Sou o assistente virtual da LINKY NEXUS. Estamos aqui para impulsionar seu negócio digital com soluções premium.
      `,
      sender: 'bot',
      time: getCurrentTime()
    };
    setMessages([welcomeMessage]);
    
    // Focus input on load
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const newMessage = {
      text,
      sender,
      time: getCurrentTime()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    addMessage(inputValue, 'user');
    setInputValue('');
    setIsInputDisabled(true);
    setIsTyping(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate response based on user input
      let botResponse = '';
      
      if (inputValue.toLowerCase().includes('tráfego') || inputValue.toLowerCase().includes('trafego')) {
        botResponse = `
          <span class="text-[#00ff9d]">✨</span> Nossa equipe de especialistas em tráfego pago desenvolve estratégias personalizadas para maximizar seu ROI.
          
          <div class="bg-[#2a2a2a] rounded-xl p-4 my-2.5 border-l-4 border-[#00ff9d] shadow-md">
            <h3 class="m-0 mb-2 text-[#00ff9d] text-base flex items-center gap-2">
              <span>📊</span> Google Ads
            </h3>
            <p class="m-0 text-sm opacity-90">Campanhas otimizadas para Search, Display e YouTube.</p>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-xl p-4 my-2.5 border-l-4 border-[#00ff9d] shadow-md">
            <h3 class="m-0 mb-2 text-[#00ff9d] text-base flex items-center gap-2">
              <span>📱</span> Meta Ads
            </h3>
            <p class="m-0 text-sm opacity-90">Anúncios de alta conversão para Facebook e Instagram.</p>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-xl p-4 my-2.5 border-l-4 border-[#00ff9d] shadow-md">
            <h3 class="m-0 mb-2 text-[#00ff9d] text-base flex items-center gap-2">
              <span>🎯</span> TikTok Ads
            </h3>
            <p class="m-0 text-sm opacity-90">Estratégias virais para a plataforma de maior crescimento.</p>
          </div>
          
          Gostaria de agendar uma análise gratuita da sua estratégia atual de tráfego pago?
        `;
      } else if (inputValue.toLowerCase().includes('automação') || inputValue.toLowerCase().includes('automacao') || inputValue.toLowerCase().includes('chat')) {
        botResponse = `
          <span class="text-[#00ff9d]">🤖</span> Nossas automações de chat transformam seu atendimento e aumentam suas conversões.
          
          <div class="bg-[#2a2a2a] rounded-xl p-4 my-2.5 border-l-4 border-[#00ff9d] shadow-md">
            <h3 class="m-0 mb-2 text-[#00ff9d] text-base flex items-center gap-2">
              <span>💬</span> Chatbots Inteligentes
            </h3>
            <p class="m-0 text-sm opacity-90">Atendimento 24/7 com IA avançada para qualificação de leads.</p>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-xl p-4 my-2.5 border-l-4 border-[#00ff9d] shadow-md">
            <h3 class="m-0 mb-2 text-[#00ff9d] text-base flex items-center gap-2">
              <span>📲</span> WhatsApp Business API
            </h3>
            <p class="m-0 text-sm opacity-90">Automações completas para o canal preferido dos brasileiros.</p>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-xl p-4 my-2.5 border-l-4 border-[#00ff9d] shadow-md">
            <h3 class="m-0 mb-2 text-[#00ff9d] text-base flex items-center gap-2">
              <span>📊</span> Analytics & Dashboards
            </h3>
            <p class="m-0 text-sm opacity-90">Relatórios detalhados de performance e conversão.</p>
          </div>
          
          Podemos desenvolver uma solução personalizada para seu negócio. Gostaria de conhecer alguns casos de sucesso?
        `;
      } else if (inputValue.toLowerCase().includes('site') || inputValue.toLowerCase().includes('web')) {
        botResponse = `
          <span class="text-[#00ff9d]">🌟</span> Desenvolvemos sites de alta conversão com tecnologias modernas.
          
          <div class="bg-[#2a2a2a] rounded-xl p-4 my-2.5 border-l-4 border-[#00ff9d] shadow-md">
            <h3 class="m-0 mb-2 text-[#00ff9d] text-base flex items-center gap-2">
              <span>🚀</span> Landing Pages
            </h3>
            <p class="m-0 text-sm opacity-90">Páginas otimizadas para conversão com design premium.</p>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-xl p-4 my-2.5 border-l-4 border-[#00ff9d] shadow-md">
            <h3 class="m-0 mb-2 text-[#00ff9d] text-base flex items-center gap-2">
              <span>🛒</span> E-commerce
            </h3>
            <p class="m-0 text-sm opacity-90">Lojas virtuais completas com integração de pagamentos.</p>
          </div>
          
          <div class="bg-[#2a2a2a] rounded-xl p-4 my-2.5 border-l-4 border-[#00ff9d] shadow-md">
            <h3 class="m-0 mb-2 text-[#00ff9d] text-base flex items-center gap-2">
              <span>📱</span> Sites Responsivos
            </h3>
            <p class="m-0 text-sm opacity-90">Experiência perfeita em todos os dispositivos.</p>
          </div>
          
          Qual tipo de site você precisa para seu negócio?
        `;
      } else if (inputValue.toLowerCase().includes('agendar') || inputValue.toLowerCase().includes('reunião') || inputValue.toLowerCase().includes('reuniao')) {
        botResponse = `
          <span class="text-[#00ff9d]">📅</span> Ótimo! Vamos agendar uma reunião com um de nossos consultores.
          
          Por favor, informe:
          
          1. Seu nome completo
          2. E-mail para contato
          3. Telefone/WhatsApp
          4. Melhor data e horário para você
          5. Assunto principal da reunião
          
          Assim que recebermos essas informações, entraremos em contato para confirmar!
        `;
      } else {
        botResponse = `
          <span class="text-[#00ff9d]">💎</span> Obrigado pelo seu contato! Como posso ajudar com sua presença digital hoje?
          
          <div class="bg-[#2a2a2a] rounded-xl p-4 my-2.5 border-l-4 border-[#00ff9d] shadow-md">
            <p class="m-0 text-sm opacity-90">Você pode perguntar sobre:</p>
            <ul class="list-disc pl-5 mt-2 text-sm">
              <li>Tráfego pago e campanhas de anúncios</li>
              <li>Automações de chat e atendimento</li>
              <li>Desenvolvimento de sites e landing pages</li>
              <li>Agendamento de reuniões com nossa equipe</li>
            </ul>
          </div>
          
          Como posso ajudar você hoje?
        `;
      }
      
      // Add bot response
      addMessage(botResponse, 'bot');
      
    } catch (error) {
      console.error('Error:', error);
      addMessage('Ops! Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.', 'bot');
    } finally {
      setIsTyping(false);
      setIsInputDisabled(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const sendMessageWithText = (text: string) => {
    setInputValue(text);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex justify-center items-center p-4">
      <div className="w-full max-w-[500px] bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden flex flex-col h-[90vh] border border-[#333]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#00ff9d] to-[#00e6ff] text-black py-4.5 px-5 text-center font-bold text-lg tracking-wide border-b border-black/20 flex items-center justify-center gap-2.5 relative">
          <Zap size={22} />
          LINKY NEXUS SOLUTIONS
          <div className="absolute top-[-10px] right-5 bg-gradient-to-r from-[#00e6ff] to-[#008cff] text-black py-1 px-2.5 rounded-full text-xs font-bold shadow-md">
            PREMIUM
          </div>
        </div>
        
        {/* Messages area */}
        <div className="flex-grow p-5 overflow-y-auto flex flex-col bg-[#1a1a1a] scrollbar-thin scrollbar-thumb-[#00ff9d] scrollbar-track-[#1a1a1a]">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message my-2 p-3 rounded-2xl max-w-[85%] leading-normal break-words shadow-md relative animate-fadeIn ${
                msg.sender === 'bot' 
                  ? 'bg-[#252525] text-white self-start mr-auto rounded-bl-sm border-l-[3px] border-[#00ff9d]' 
                  : 'bg-[#333333] text-white self-end ml-auto rounded-br-sm border-r-[3px] border-[#00ff9d]'
              }`}
            >
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
              <div className="text-xs opacity-70 mt-1 text-right">{msg.time}</div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex p-3 bg-[#252525] rounded-2xl self-start my-2 border-l-[3px] border-[#00ff9d] gap-1.5">
              <div className="h-2 w-2 bg-[#00ff9d] rounded-full opacity-40 animate-typing"></div>
              <div className="h-2 w-2 bg-[#00ff9d] rounded-full opacity-40 animate-typing animation-delay-200"></div>
              <div className="h-2 w-2 bg-[#00ff9d] rounded-full opacity-40 animate-typing animation-delay-400"></div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick action buttons */}
        <div className="p-3 flex flex-wrap gap-2 justify-center bg-[#222] border-t border-[#444]">
          <ActionButton 
            icon={<BarChart2 size={16} />} 
            text="Tráfego Pago" 
            onClick={() => sendMessageWithText('Quero saber mais sobre Tráfego Pago')} 
          />
          <ActionButton 
            icon={<Bot size={16} />} 
            text="Automações" 
            onClick={() => sendMessageWithText('Preciso de Automações de Chat')} 
          />
          <ActionButton 
            icon={<Code size={16} />} 
            text="Criar Site" 
            onClick={() => sendMessageWithText('Quero criar um site')} 
          />
          <ActionButton 
            icon={<Calendar size={16} />} 
            text="Agendar" 
            onClick={() => sendMessageWithText('Agendar uma reunião')} 
          />
        </div>
        
        {/* Status bar */}
        <div className="py-2 px-4 bg-[rgba(0,255,157,0.1)] border-t border-[#444] text-xs text-center text-[#00ff9d] flex items-center justify-center gap-2">
          <Circle size={10} className="fill-[#00ff9d] text-[#00ff9d]" />
          Online • Conexão segura • Atendimento 24/7
        </div>
        
        {/* Input area */}
        <div className="flex gap-2.5 p-4 bg-[#222] border-t border-[#444] items-center">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            disabled={isInputDisabled}
            className="flex-1 py-3.5 px-4.5 border border-[#444] rounded-full text-[15px] bg-[#252525] text-white outline-none transition-all duration-300 focus:border-[#00ff9d] focus:shadow-[0_0_0_2px_rgba(0,255,157,0.2)]"
          />
          <button
            onClick={handleSendMessage}
            disabled={isInputDisabled}
            className="p-3.5 w-[50px] h-[50px] bg-gradient-to-r from-[#00ff9d] to-[#00e6ff] text-black border-none rounded-full cursor-pointer text-lg font-semibold shadow-md transition-all duration-300 flex items-center justify-center hover:scale-105 hover:shadow-[0_5px_15px_rgba(0,255,157,0.3)]"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;