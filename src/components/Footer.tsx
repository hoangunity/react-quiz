import React from "react";

interface FooterProps {
  children: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ children }): JSX.Element | null => {
  return <footer>{children}</footer>;
};

export default Footer;
