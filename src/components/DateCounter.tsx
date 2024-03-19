import React, { useReducer } from "react";

type Action =
  | { type: string; payload: number }
  | { type: "incCount"; payload: number }
  | { type: "decCount"; payload: number }
  | { type: "setCount"; payload: number }
  | { type: "setStep"; payload: number }
  | { type: "reset" };

type State = {
  count: number;
  step: number;
};

type StateReducer = (state: State, action: Action) => State;

const initialState: State = { count: 0, step: 1 };

const reducer: StateReducer = (state, action) => {
  // console.log(state, action);
  switch (action.type) {
    case "incCount":
      return {
        ...state,
        count: state.count + state.step,
      };
    case "decCount":
      return {
        ...state,
        count: state.count - state.step,
      };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const DateCounter: React.FC = (): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "decCount", payload: 1 });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: "incCount", payload: 1 });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e: React.ChangeEvent<HTMLInputElement>) {
    // Using isNaN to check if the input value is not a number
    if (isNaN(Number(e.target.value))) {
      return;
    }
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
};
export default DateCounter;
