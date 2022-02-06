import React from "react";
import CartDetails from "./container/Cart";
import "antd/dist/antd.css";
import "./global.scss";

const App: React.FC = () => {
  return (
    <div className="App">
      <CartDetails />
    </div>
  );
};

export default App;
