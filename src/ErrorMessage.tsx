interface ErrorMessageProps {
  isActive: Boolean;
  error: String;
  onClose: () => void;
}

function ErrorMessage({ error, isActive, onClose }: ErrorMessageProps) {
  if (!isActive) {
    return null;
  }
  return (
    <div className="ui-overlay">
      <div className="error-box">
        <div className="error-text">
          <p>{error}</p>
        </div>
        <button className="ok-btn" onClick={onClose}>
          Ok
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
