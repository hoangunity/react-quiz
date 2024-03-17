import React from "react";
import { InitialState } from "../App";

interface ProgressProps {
  numQuestions: number;
  maxPossiblePoints: number;
  index: InitialState["index"];
  points: InitialState["points"];
  answers: InitialState["answers"];
}

const Progress: React.FC<ProgressProps> = ({
  index: questionIndex,
  numQuestions,
  points,
  maxPossiblePoints,
  answers,
}): JSX.Element | null => {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={Number(
          questionIndex + (answers[questionIndex] !== undefined ? 1 : 0)
        )}
      />

      <p>
        Question <strong>{questionIndex + 1}</strong> / {numQuestions}
      </p>

      <p>
        <strong>{points}</strong> / {maxPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;
