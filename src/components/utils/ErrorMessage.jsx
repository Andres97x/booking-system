const ErrorMessage = ({ message, errorContainerClassName }) => {
  let className = 'error-message-container';

  if (errorContainerClassName)
    className = `${className} ${errorContainerClassName}`;

  return (
    <div className={className}>
      <p>Error: {message}</p>
    </div>
  );
};

export default ErrorMessage;
