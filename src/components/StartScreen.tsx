import React from "react";
import { Action } from "../App";

interface StartScreenProps {
  numQuestions: number;
  dispatch: React.Dispatch<Action>;
}

const StartScreen: React.FC<StartScreenProps> = ({
  numQuestions = 10,
  dispatch,
}): JSX.Element | null => {
  const handleStart = (): void => {
    dispatch?.({ type: "start" });
  };

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStart}>
        Let&#39;s start
      </button>
    </div>
  );
};

export default StartScreen;
