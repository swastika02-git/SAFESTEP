import { VoiceState } from '../../types/voice';

// Define SpeechRecognition type for TypeScript
interface IWindow extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export class SpeechService {
  private recognition: any = null;
  private isSupported: boolean = false;
  private currentLanguage: string = 'en-IN';

  constructor() {
    const win = typeof window !== 'undefined' ? (window as unknown as IWindow) : null;
    const SpeechRec = win?.SpeechRecognition || win?.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.isSupported = true;
      } catch (e) {
        console.warn('SpeechRecognition initialization error', e);
      }
    }
  }

  public setLanguage(langCode: string) {
    const map: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      gu: 'gu-IN',
      pa: 'pa-IN',
      as: 'bn-IN', // Closest engine match fallback
      mni: 'bn-IN',
      or: 'or-IN',
    };
    this.currentLanguage = map[langCode] || 'en-IN';
    if (this.recognition) {
      this.recognition.lang = this.currentLanguage;
    }
  }

  public startListening(
    onStateChange: (state: VoiceState) => void,
    onResult: (transcript: string) => void,
    onError: (err: string) => void
  ): () => void {
    if (!this.isSupported || !this.recognition) {
      // Simulate voice input for demonstration if browser doesn't support Web Speech API
      return this.simulateVoiceInput(onStateChange, onResult);
    }

    try {
      this.recognition.lang = this.currentLanguage;
      onStateChange('LISTENING');

      this.recognition.onstart = () => {
        onStateChange('LISTENING');
      };

      this.recognition.onresult = (event: any) => {
        onStateChange('TRANSCRIBING');
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        if (currentTranscript) {
          onResult(currentTranscript);
        }
      };

      this.recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          // Switch to simulated voice demo so the user journey continues seamlessly
          this.simulateVoiceInput(onStateChange, onResult);
        } else {
          onStateChange('ERROR');
          onError(event.error || 'Speech recognition failed');
        }
      };

      this.recognition.onend = () => {
        onStateChange('UNDERSTANDING');
        setTimeout(() => {
          onStateChange('RECONSTRUCTING');
        }, 600);
      };

      this.recognition.start();

      return () => {
        try {
          this.recognition.stop();
        } catch {
          // Ignore
        }
      };
    } catch {
      return this.simulateVoiceInput(onStateChange, onResult);
    }
  }

  private simulateVoiceInput(
    onStateChange: (state: VoiceState) => void,
    onResult: (transcript: string) => void
  ): () => void {
    onStateChange('LISTENING');
    
    const timeout1 = setTimeout(() => {
      onStateChange('TRANSCRIBING');
      const isBn = this.currentLanguage.startsWith('bn');
      const isHi = this.currentLanguage.startsWith('hi');

      const demoText = isBn
        ? 'আমাকে ফোন করে বলেছিল আমার IPO লেগেছে, তারপর টাকা পাঠাতে বলেছে। টাকা পাঠানোর পর আবার আরও ১২,০০০ টাকা চাইছে।'
        : isHi
        ? 'मुझे फोन करके बोला गया कि मेरा IPO लग गया है, फिर ₹38,500 भेजने को कहा। पैसे भेजने के बाद अब ₹12,000 और मांग रहे हैं।'
        : 'I received a message claiming I got a pre-IPO allotment. They asked me to pay ₹38,500 within 20 mins. After paying, they demanded another ₹12,000 security deposit.';
      
      onResult(demoText);
    }, 1500);

    const timeout2 = setTimeout(() => {
      onStateChange('UNDERSTANDING');
    }, 2800);

    const timeout3 = setTimeout(() => {
      onStateChange('RECONSTRUCTING');
    }, 3800);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }

  // Text to Speech for accessibility
  public speak(text: string, onEnd?: () => void): () => void {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      if (onEnd) onEnd();
      return () => {};
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = this.currentLanguage;
    utterance.rate = 0.95; // Slightly slower for clarity

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);

    return () => {
      window.speechSynthesis.cancel();
    };
  }

  public stopSpeaking() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
}

export const speechService = new SpeechService();
