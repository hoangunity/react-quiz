import { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

export { useQuiz };
