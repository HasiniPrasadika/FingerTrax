import React from "react";
import { Alert } from "react-bootstrap";

const SuccessMessage = ({ variant = "success", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 10, margin: 20 }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default SuccessMessage;