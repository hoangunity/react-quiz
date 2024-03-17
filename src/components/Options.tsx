import React from "react";
import { Action, InitialState, Question } from "../App";

interface OptionsProps {
  options: Question["options"];
  correctOption: Question["correctOption"];
  dispatch: React.Dispatch<Action>;
  answers: InitialState["answers"];
  index: InitialState["index"];
}

const Options: React.FC<OptionsProps> = ({
  options,
  answers,
  dispatch,
  correctOption,
  index: questionIndex,
}): JSX.Element | null => {
  const hasAnswered: boolean = answers[questionIndex] !== undefined;

  const handleOptionClick = (optionIndex: number): void => {
    dispatch({ type: "newAnswer", payload: optionIndex });
  };

  return (
    <div className="options">
      {options.map((option, optionIndex) => (
        <button
          className={`btn btn-option ${
            optionIndex === answers[questionIndex] ? "answer" : ""
          } ${
            hasAnswered
              ? optionIndex === correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={hasAnswered}
          key={option}
          onClick={() => handleOptionClick(optionIndex)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
