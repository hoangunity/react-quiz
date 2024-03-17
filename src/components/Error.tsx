const ErrorElement = (): JSX.Element | null => {
  return (
    <p className="error">
      <span>💥</span> There was an error fecthing questions.
    </p>
  );
};

export default ErrorElement;
