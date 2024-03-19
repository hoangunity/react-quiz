import React from "react";
import { useQuiz } from "../hooks/useQuiz";

interface OptionsProps {
  //
}

const Options: React.FC<OptionsProps> = (): JSX.Element | null => {
  const { answers, index: questionIndex, dispatch, questions } = useQuiz();
  const hasAnswered: boolean = answers[questionIndex] !== undefined;
  const { correctOption, options } = questions[questionIndex];

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
