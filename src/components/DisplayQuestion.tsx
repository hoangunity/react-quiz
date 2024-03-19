import React from "react";
import Options from "./Options";
import { useQuiz } from "../hooks/useQuiz";

interface QuestionProps {
  //
}

const DisplayQuestion: React.FC<QuestionProps> = (): JSX.Element | null => {
  const { questions, index } = useQuiz();
  const { question: questionTitle } = questions[index];
  return (
    <div>
      <h4>{questionTitle}</h4>

      <Options />
    </div>
  );
};

export default DisplayQuestion;
