import React from "react";
import { useQuiz } from "../hooks/useQuiz";

interface ProgressProps {
  //
}

const Progress: React.FC<ProgressProps> = (): JSX.Element | null => {
  const {
    questions,
    index: questionIndex,
    points,
    maxPossiblePoints,
    answers,
  } = useQuiz();

  const numQuestions = questions?.length || 0;
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
