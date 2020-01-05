import React from "react";

const Crash = ({
  summary = "something went wrong",
  error = "Error from Server",
  errorInfo,
  small = false
}) => (
  <div>
    <div className="empty-icon">
      <details className="empty-title">
        <summary className={small ? "h6" : "h5"}>{summary}</summary>
        <br />
        {error && small ? (
          <p className="text-left">
            <small>{error}</small>
          </p>
        ) : (
          <p className="text-left">{error}</p>
        )}
        {errorInfo && (
          <p className="text-left">
            <small>
              <code>{errorInfo}</code>
            </small>
          </p>
        )}
      </details>
    </div>
  </div>
);

export default Crash;
