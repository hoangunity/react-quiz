import React from "react";
import { useQuiz } from "../hooks/useQuiz";

interface StartScreenProps {
  //
}

const StartScreen: React.FC<StartScreenProps> = (): JSX.Element | null => {
  const { questions, dispatch } = useQuiz();
  const handleStart = (): void => {
    dispatch({ type: "start" });
  };

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleStart}>
        Let&#39;s start
      </button>
    </div>
  );
};

export default StartScreen;
