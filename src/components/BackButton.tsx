import React from "react";
import { Action, InitialState } from "../App";

interface BackButtonProps {
  index: InitialState["index"];
  answers: InitialState["answers"];
  dispatch: React.Dispatch<Action>;
  numQuestions: number;
}

const BackButton: React.FC<BackButtonProps> = ({
  answers,
  dispatch,
  index: questionIndex,
  numQuestions,
}): JSX.Element | null => {
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
