import React from "react";
import { Action, InitialState } from "../App";

interface FinishScreenProps {
  points: InitialState["points"];
  highScore: InitialState["highScore"];
  dispatch: React.Dispatch<Action>;
  maxPossiblePoints: number;
}

const FinishScreen: React.FC<FinishScreenProps> = ({
  maxPossiblePoints,
  points,
  highScore,
  dispatch,
}): JSX.Element | null => {
  const percentage = (points / maxPossiblePoints) * 100;

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
