import React from "react";
import { useQuiz } from "../hooks/useQuiz";

interface FinishScreenProps {
  //
}

const FinishScreen: React.FC<FinishScreenProps> = (): JSX.Element | null => {
  const { points, maxPossiblePoints, dispatch, highScore } = useQuiz();
  const percentage = Number((points / maxPossiblePoints) * 100);

  let emoji: string = "";
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage < 50 && percentage > 0) emoji = "🤷‍♂️";
  if (percentage === 0) emoji = "🤦‍♂️";

  const handleRestartQuiz = () => {
    dispatch({ type: "reset" });
  };

  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {maxPossiblePoints}{" "}
        ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">
        (<strong>Highscore:</strong> {highScore} points)
      </p>
      <button className="btn btn-ui" onClick={handleRestartQuiz}>
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
