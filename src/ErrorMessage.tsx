interface ErrorMessageProps {
  error: String;
}

function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="ui-overlay">
      <div className="error-box">
        <div className="error-text">
        <p>{error}</p>
        
        </div>
        <button className="ok-btn">Ok</button>
      </div>
    </div>
  );
}

export default ErrorMessage;
