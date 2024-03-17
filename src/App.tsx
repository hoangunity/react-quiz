import React, { useEffect, useReducer } from "react";

import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import ErrorElement from "./components/Error";
import StartScreen from "./components/StartScreen";
import DisplayQuestion from "./components/DisplayQuestion";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import BackButton from "./components/BackButton";

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
};

export type Action = {
  type: string;
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
};

const reducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload as Question[],
        status: "ready",
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

      return {
        ...state,
        answers: [...state.answers, action.payload as number],
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

const App: React.FC = (): JSX.Element => {
  const [
    { questions, status, index, answers, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions?.length;
  const maxPossiblePoints = questions?.reduce(
    (acc, curr) => acc + curr.points,
    0
  );

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
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorElement />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions!} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answers={answers}
            />
            <DisplayQuestion
              index={index}
              question={questions[index]}
              dispatch={dispatch}
              answers={answers}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answers={answers}
                index={index}
                numQuestions={numQuestions}
              />
              <BackButton
                answers={answers}
                dispatch={dispatch}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            dispatch={dispatch}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
