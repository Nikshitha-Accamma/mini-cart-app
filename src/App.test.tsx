import React from "react";
import App from "./App";
import "./global.scss";
import ReactDOM from "react-dom";

const getApp = (): JSX.Element => {
  return <App />;
};
describe("<App /> - component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(getApp(), div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
