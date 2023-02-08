import React from "react";
import "./remote.d";
const Button = React.lazy(() => import("Remote/Button"));
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  return (
    <div>
      <h1>Host Website2</h1>
      <h2>this button import from remote:</h2>
      <ErrorBoundary>
        <Button id={2121}>Remote button</Button>
      </ErrorBoundary>
    </div>
  );
};

export default App;
