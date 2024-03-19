/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useEffect, useReducer } from "react";

interface QuizProviderProps {
  children: React.ReactNode;
}

const SECS_PER_QUESTIONS = 30;

export type Question = {
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type InitialState = {
  index: number;
  questions: Question[];
  status: "loading" | "error" | "ready" | "active" | "finished";
  answers: number[];
  points: number;
  highScore: number;
  secondsRemaining: number | null;
  dispatch: React.Dispatch<QuizContextAction>;
  maxPossiblePoints: number;
};

export type QuizContextAction = {
  type:
    | "dataReceived"
    | "dataFailed"
    | "start"
    | "newAnswer"
    | "nextQuestion"
    | "prevQuestion"
    | "finished"
    | "reset"
    | "tick";
  payload?: null | number | string | InitialState["questions"];
};

const initialState: InitialState = {
  questions: [],
  // 'loading' | 'error' | 'ready' | 'active' | 'finished'
  status: "loading",
  index: 0,
  answers: [],
  points: 0,
  highScore: 0,
  secondsRemaining: null,
  dispatch: () => {},
  maxPossiblePoints: 0,
};

const QuizContext = createContext<null | InitialState>(null);

const reducer = (
  state: InitialState,
  action: QuizContextAction
): InitialState => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload as Question[],
        status: "ready",
        maxPossiblePoints: (action.payload as Question[]).reduce(
          (acc: number, curQuestion: Question): number =>
            acc + curQuestion.points,
          0
        ),
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTIONS,
      };
    case "newAnswer": {
      const { questions, index } = state;
      const q = questions[index];
      const newAnswers = [...state.answers];
      newAnswers[index] = action.payload as number;

      return {
        ...state,
        answers: newAnswers,
        points:
          action.payload === q.correctOption
            ? state.points + q.points
            : state.points,
      };
    }
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
      };
    case "prevQuestion": {
      return {
        ...state,
        index: state.index === 0 ? 0 : state.index - 1,
      };
    }
    case "finished": {
      const { points, highScore } = state;

      return {
        ...state,
        status: "finished",
        highScore: points > highScore ? points : highScore,
        secondsRemaining: null,
      };
    }
    case "reset":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highScore: state.highScore,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining:
          typeof state.secondsRemaining === "number"
            ? state.secondsRemaining - 1
            : null,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
const QuizProvider: React.FC<QuizProviderProps> = ({
  children,
}): JSX.Element | null => {
  const [
    {
      answers,
      highScore,
      index,
      points,
      questions,
      secondsRemaining,
      status,
      maxPossiblePoints,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((res: Response) => res.json())
      .then((data: InitialState["questions"]) =>
        dispatch({
          type: "dataReceived",
          payload: data,
        })
      )
      .catch((err: Error) => {
        console.log(err.message);
        dispatch({ type: "dataFailed" });
      });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        answers,
        highScore,
        index,
        points,
        questions,
        secondsRemaining,
        status,
        dispatch,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
