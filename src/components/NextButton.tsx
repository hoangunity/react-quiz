import React from "react";
import { useQuiz } from "../hooks/useQuiz";

interface NextButtonProps {
  //
}

const NextButton: React.FC<NextButtonProps> = (): JSX.Element | null => {
  const { answers, index: questionIndex, questions, dispatch } = useQuiz();
  const numQuestions = questions?.length;
  if (answers[questionIndex] === undefined) return null;

  const handleNextQuestion = () => {
    dispatch({ type: "nextQuestion" });
  };

  if (questionIndex < numQuestions - 1) {
    return (
      <button
        style={{
          marginLeft: "2rem",
        }}
        className="btn btn-ui"
        onClick={handleNextQuestion}
      >
        Next
      </button>
    );
  }

  const handleFinish = () => {
    dispatch({ type: "finished" });
  };

  if (questionIndex === numQuestions - 1) {
    return (
      <button className="btn btn-ui" onClick={handleFinish}>
        Finish
      </button>
    );
  }

  return null;
};

export default NextButton;
