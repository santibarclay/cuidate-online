'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { QuizQuestion } from '@/lib/quiz-questions';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number, maxScore: number) => void;
  missionTitle: string;
}

export function Quiz({ questions, onComplete, missionTitle }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const hasAnswered = answers[currentQ.id] !== undefined;
  
  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: answer
    }));
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      setSubmitted(true);
      calculateResults();
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };
  
  const calculateResults = () => {
    const score = questions.reduce((acc, question) => {
      const userAnswer = answers[question.id];
      const isCorrect = Array.isArray(question.correct) 
        ? question.correct.includes(userAnswer)
        : question.correct === userAnswer;
      return acc + (isCorrect ? 1 : 0);
    }, 0);
    
    setTimeout(() => {
      setShowResults(true);
      onComplete(score, questions.length);
    }, 1000);
  };
  
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setSubmitted(false);
  };
  
  const getScoreMessage = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return "¡Perfecto! 🎉";
    if (percentage >= 80) return "¡Excelente trabajo!";
    if (percentage >= 60) return "¡Buen trabajo!";
    return "Podés mejorar, ¡intentá de nuevo!";
  };
  
  const scorePercentage = showResults 
    ? (questions.reduce((acc, q) => acc + (answers[q.id] === (Array.isArray(q.correct) ? q.correct[0] : q.correct) ? 1 : 0), 0) / questions.length) * 100
    : 0;

  if (submitted && !showResults) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-security-blue mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Calculando resultados...
          </h3>
          <p className="text-gray-600">Un momento por favor</p>
        </CardContent>
      </Card>
    );
  }
  
  if (showResults) {
    const score = questions.reduce((acc, question) => {
      const userAnswer = answers[question.id];
      const isCorrect = Array.isArray(question.correct) 
        ? question.correct.includes(userAnswer)
        : question.correct === userAnswer;
      return acc + (isCorrect ? 1 : 0);
    }, 0);
    
    const passed = scorePercentage >= 80;
    
    return (
      <div className="space-y-6">
        {/* Results Summary */}
        <Card className={passed ? 'border-security-green bg-green-50' : 'border-yellow-500 bg-yellow-50'}>
          <CardContent className="p-8 text-center">
            <div className={`text-5xl mb-4 ${passed ? 'text-security-green' : 'text-yellow-600'}`}>
              {passed ? '🎉' : '📚'}
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${passed ? 'text-security-green' : 'text-yellow-800'}`}>
              {getScoreMessage(score, questions.length)}
            </h3>
            <p className="text-lg mb-4">
              Obtuviste {score} de {questions.length} respuestas correctas ({Math.round(scorePercentage)}%)
            </p>
            
            {passed ? (
              <div className="bg-security-green/10 border border-security-green/20 rounded-lg p-4 mb-4">
                <p className="text-security-green font-medium">
                  ✅ ¡Misión completada! Has demostrado que entendés los conceptos clave.
                </p>
              </div>
            ) : (
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-4">
                <p className="text-yellow-800 font-medium">
                  ⚠️ Necesitás al menos 80% para completar la misión. ¡Intentá de nuevo!
                </p>
              </div>
            )}
            
            {!passed && (
              <Button onClick={resetQuiz} className="mr-3">
                <RotateCcw className="h-4 w-4 mr-2" />
                Intentar de nuevo
              </Button>
            )}
          </CardContent>
        </Card>
        
        {/* Question Review */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Revisión de respuestas</h3>
          {questions.map((question, index) => {
            const userAnswer = answers[question.id];
            const correctAnswer = Array.isArray(question.correct) ? question.correct[0] : question.correct;
            const isCorrect = userAnswer === correctAnswer;
            
            return (
              <Card key={question.id} className={isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                      {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-2">
                        {index + 1}. {question.question}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        <span className="font-medium">Tu respuesta:</span> {userAnswer}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Respuesta correcta:</span> {correctAnswer}
                        </p>
                      )}
                      <p className="text-sm text-gray-700 bg-white/50 p-3 rounded border-l-4 border-security-blue">
                        <strong>Explicación:</strong> {question.explanation}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Quiz: {missionTitle}</CardTitle>
          <div className="text-sm text-gray-500">
            {currentQuestion + 1} de {questions.length}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-security-blue h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {currentQuestion + 1}. {currentQ.question}
          </h3>
          
          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                  answers[currentQ.id] === option
                    ? 'border-security-blue bg-blue-50 text-security-blue'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {hasAnswered ? '✓ Respuesta seleccionada' : 'Seleccioná una respuesta'}
          </div>
          
          <Button 
            onClick={handleNext}
            disabled={!hasAnswered}
            className="min-w-[120px]"
          >
            {isLastQuestion ? 'Finalizar' : 'Siguiente'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}