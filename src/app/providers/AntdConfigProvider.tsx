"use client";

import { ConfigProvider } from "antd";
import { ReactNode } from "react";

const AntdConfigProvider = ({ children }: { children: ReactNode }) => {
  return <ConfigProvider>{children}</ConfigProvider>;
};

export default AntdConfigProvider;
