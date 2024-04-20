"use client"

import { useState, useEffect } from "react";
import { questions } from "@/data/questions";
import { QuestionItem } from "@/components/QuestionItem";
import { Results } from "@/components/Results";

const Page = () => {
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionIndices, setQuestionIndices] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const title = 'CAM';

  useEffect(() => {
    // Gerar um array de índices aleatórios quando o componente é montado ou quando o quiz é reiniciado
    const indices = Array.from({ length: questions.length }, (_, i) => i);
    const shuffledIndices = indices.sort(() => Math.random() - 0.5);
    setQuestionIndices(shuffledIndices);
  }, []);

  const loadNextQuestion = () => {
    if (questionIndices[currentQuestionIndex + 1]) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleAnswered = (answer: number) => {
    setAnswers([...answers, answer]);
    loadNextQuestion();
  };

  const handleRestartButton = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    // Gerar novamente os índices aleatórios
    const indices = Array.from({ length: questions.length }, (_, i) => i);
    const shuffledIndices = indices.sort(() => Math.random() - 0.5);
    setQuestionIndices(shuffledIndices);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-blue-600">
      <div className={`w-full rounded-md bg-white text-black shadow shadow-black ${showResult ? 'max-w-xxl' : 'max-w-xl'}`}>
        <div className="p-5 font-bold text-center text-2xl border-b border-gray-300">{title}</div>
        <div className="p-5">
          {!showResult &&
            <QuestionItem
              question={questions[questionIndices[currentQuestionIndex]]}
              count={currentQuestionIndex + 1}
              onAnswer={handleAnswered}
            />
          }
          {showResult &&
            <Results questionList={questions} answers={answers} />
          }
        </div>
        <div className="p-5 text-center border-t border-gray-300">
          {!showResult &&
            `${currentQuestionIndex + 1} de ${questions.length} ${questions.length > 1 ? 'perguntas' : 'pergunta'}`
          }
          {showResult &&
            <button onClick={handleRestartButton} className="px-3 py-2 rounded-md bg-blue-800 text-white">Reiniciar Quiz</button>
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
