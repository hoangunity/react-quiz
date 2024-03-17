import React from "react";

interface MainProps {
  children: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }): JSX.Element => {
  return <main className="main">{children}</main>;
};

export default Main;
