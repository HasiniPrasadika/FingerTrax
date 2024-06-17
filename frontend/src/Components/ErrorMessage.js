import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 10, margin: 20 }}>
      <strong id="err">{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;