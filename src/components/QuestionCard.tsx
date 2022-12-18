import React from 'react'
import { ButtonWrapper, Wrapper } from './QuestionCard.styles';

type Props = {
  question : string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNum: number;
  totalQustions: number;
}
const QuestionCard: React.FC<Props> = ({question, answers, callback, userAnswer, questionNum, totalQustions}) => {
  return (
    <Wrapper>
        <p>Questions: {questionNum} / {totalQustions}</p>
        <p dangerouslySetInnerHTML={{ __html: question}} />
        <div>
          {answers.map((answer, index) => (
            <ButtonWrapper key={index} 
             correct ={userAnswer?.correctAnswer === answer}
             userClicked = { userAnswer?.answer === answer}
            >
              <button disabled={userAnswer} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{__html: answer}} />
              </button>
            </ButtonWrapper>
          ))}
        </div>
    </Wrapper>
  )
}

export default QuestionCard;