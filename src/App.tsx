import React from "react";

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
import { useQuiz } from "./hooks/useQuiz";

const App: React.FC = (): JSX.Element => {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorElement />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <DisplayQuestion />
            <Footer>
              <Timer />
              <NextButton />
              <BackButton />
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
};

export default App;
