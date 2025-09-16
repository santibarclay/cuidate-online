'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, MessageSquare, Send, Loader2 } from 'lucide-react';

interface FeedbackWidgetProps {
  className?: string;
}

export function FeedbackWidget({ className = '' }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) return;

    setIsSubmitting(true);

    try {
      // Get page info for context
      const pageInfo = {
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        viewport: `${window.innerWidth}x${window.innerHeight}`
      };

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedback: feedback.trim(),
          email: email.trim() || undefined,
          pageInfo
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFeedback('');
        setEmail('');
        setTimeout(() => {
          setIsSubmitted(false);
          setIsOpen(false);
        }, 2000);
      } else {
        const errorData = await response.json();
        if (response.status === 429) {
          // Rate limit exceeded
          alert(`⏱️ ${errorData.message || 'Has excedido el límite de feedback. Intenta nuevamente más tarde.'}`);
        } else {
          throw new Error(errorData.message || 'Error al enviar feedback');
        }
      }
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Hubo un error al enviar tu feedback. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="h-12 w-12 rounded-full shadow-lg bg-security-blue hover:bg-blue-700 text-white border-0"
          size="sm"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <Card className="w-80 shadow-xl border-security-blue/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-security-blue" />
              <span>Feedback</span>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Ayudanos a mejorar Cuidate Online
          </p>
        </CardHeader>

        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-4">
              <div className="text-green-600 text-2xl mb-2">✓</div>
              <p className="text-green-700 font-medium">¡Gracias por tu feedback!</p>
              <p className="text-sm text-gray-600 mt-1">
                Tu mensaje fue enviado correctamente
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Qué podemos mejorar? *
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Contanos sobre errores, sugerencias de mejora, funciones que te gustaría ver..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-security-blue focus:border-transparent text-sm resize-none"
                  rows={4}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email (opcional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Para seguimiento (opcional)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-security-blue focus:border-transparent text-sm"
                  disabled={isSubmitting}
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700">
                  📍 Se incluirá automáticamente información de contexto (página actual, navegador) para ayudarnos a entender mejor tu feedback.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <p className="text-xs text-orange-700">
                  ⏱️ <strong>Límite:</strong> Máximo 3 mensajes de feedback cada 24 horas para evitar spam.
                </p>
              </div>

              <Button
                type="submit"
                disabled={!feedback.trim() || isSubmitting}
                className="w-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Feedback
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}