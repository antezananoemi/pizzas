import React from "react";
import { PUBLIC_URL } from "../../utils/constants";

const NotFound = () => (
  <>
    <h1>This page is not found</h1>
    <p className="empty-subtitle">Click the button to go homepage</p>
    <a href={`${PUBLIC_URL}/`} className="btn btn-primary">
      Home
    </a>
  </>
);

export default React.memo(NotFound);
