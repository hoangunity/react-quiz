import React, { useEffect } from "react";
import { Action, InitialState } from "../App";

interface TimerProps {
  secondsRemaining: InitialState["secondsRemaining"];
  dispatch: React.Dispatch<Action>;
}

const Timer: React.FC<TimerProps> = ({
  secondsRemaining,
  dispatch,
}): JSX.Element | null => {
  const mins = Math.floor(secondsRemaining! / 60);
  const seconds = secondsRemaining! % 60;

  useEffect(() => {
    // Create a timer for 5 minutes
    const timer = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);
    return () => clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;
