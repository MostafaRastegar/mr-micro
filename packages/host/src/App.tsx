import React from "react";
import RemoteButtonProps from "@mfTypes/Button";
const RemoteButton = React.lazy(
  () => import("Remote/Button")
) as unknown as typeof RemoteButtonProps;

import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  return (
    <div>
      <h1>Host Website2</h1>
      <h2>this button import from remote:</h2>
      <ErrorBoundary>
        <RemoteButton id="12">host button</RemoteButton>
      </ErrorBoundary>
    </div>
  );
};

export default App;
