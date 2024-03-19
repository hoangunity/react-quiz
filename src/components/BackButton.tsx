import React from "react";
import { useQuiz } from "../hooks/useQuiz";

interface BackButtonProps {
  //
}

const BackButton: React.FC<BackButtonProps> = (): JSX.Element | null => {
  const { answers, index: questionIndex, questions, dispatch } = useQuiz();
  const numQuestions = questions?.length || 0;

  const renderCondition =
    answers.length > 0 &&
    questionIndex < numQuestions - 1 &&
    questionIndex !== 0;

  const handleGoBack = () => {
    dispatch({ type: "prevQuestion" });
  };

  return renderCondition ? (
    <button className="btn btn-ui" onClick={handleGoBack}>
      Back
    </button>
  ) : null;
};

export default BackButton;
