import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReactNode } from "react";
import AntdConfigProvider from "./AntdConfigProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <AntdConfigProvider>{children}</AntdConfigProvider>
    </AntdRegistry>
  );
};

export default Providers;
