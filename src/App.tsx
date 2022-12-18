import React, { useState } from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import { fetchQuestions, Difficulty, QustionState } from './API';
import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTIONS = 10

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {

  const [loading, setLoading] = useState(false)
  const [questoins, setQuestions] = useState<QustionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore]  = useState(0);
  const [gameOver, setGameOver] = useState(true)

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0);
    setLoading(false)
  }  

  const nextQuestion = async () => {
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    } else {
      setNumber(nextQuestion)
    }

  }

  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value
      
      const correct = questoins[number].correct_answer === answer;
      if(correct) setScore(prev => prev + 1)
      
      const answerObject = {
        question: questoins[number].question,
        answer,
        correct,
        correctAnswer: questoins[number].correct_answer
      }
      setUserAnswers(prev => [...prev, answerObject])
    }
  }

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>Quiz App</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startQuiz}>Start Quiz</button>
      ) : null}
      {!gameOver ? (
        <p className="score">Score: {score} </p>
      ) : null}
      {loading && (
        <p>Loading...</p>
      )}
 {!loading && !gameOver ? (
   <QuestionCard
      questionNum={number + 1}
      totalQustions={TOTAL_QUESTIONS}
      question={questoins[number].question}
      answers={questoins[number].answers}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}
      />
  ) : null }
    {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 ? (
      <button className="next" onClick={nextQuestion}>Next Question</button>
    ) : null}
    </Wrapper>
    </>
  );
}

export default App;
