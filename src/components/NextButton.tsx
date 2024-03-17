import React from "react";
import { Action, InitialState } from "../App";

interface NextButtonProps {
  dispatch: React.Dispatch<Action>;
  answers: InitialState["answers"];
  index: InitialState["index"];
  numQuestions: number;
}

const NextButton: React.FC<NextButtonProps> = ({
  dispatch,
  answers,
  index: questionIndex,
  numQuestions,
}): JSX.Element | null => {
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
