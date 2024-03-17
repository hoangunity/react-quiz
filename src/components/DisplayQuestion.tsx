import React from "react";
import { Action, InitialState, Question } from "../App";
import Options from "./Options";

interface QuestionProps {
  question: Question;
  answers: InitialState["answers"];
  dispatch: React.Dispatch<Action>;
  index: InitialState["index"];
}

const DisplayQuestion: React.FC<QuestionProps> = ({
  question,
  answers,
  dispatch,
  index,
}): JSX.Element | null => {
  const { question: questionTitle, correctOption, options } = question;
  return (
    <div>
      <h4>{questionTitle}</h4>

      <Options
        index={index}
        options={options}
        dispatch={dispatch}
        answers={answers}
        correctOption={correctOption}
      />
    </div>
  );
};

export default DisplayQuestion;
