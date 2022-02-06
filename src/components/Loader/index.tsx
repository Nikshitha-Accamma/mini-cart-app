import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { FunctionComponent } from "react";
import './index.scss';

type LoaderProps = {
  size?: "small" | "default" | "large";
  fontSize?: number;
  className?: string;
};

const Loader: FunctionComponent<LoaderProps> = ({
  size = "large",
  fontSize = 32,
  className,
}: LoaderProps) => {
  const antIcon = <LoadingOutlined spin style={{ fontSize: fontSize }} />;

  return (
    <Spin className={`loader ${className}`} indicator={antIcon} size={size} />
  );
};

export default Loader;
