import React from "react";
const Button = React.lazy(() => import("./components/Button"));
const App = () => {
  return (
    <div>
      <h1>Host Website2</h1>
      <h2>this button import from remote:</h2>
      <Button>Remote button</Button>
    </div>
  );
};

export default App;
