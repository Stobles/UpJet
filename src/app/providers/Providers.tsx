import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ReactNode } from "react";
import AntdConfigProvider from "./AntdConfigProvider";
import QueryProvider from "./QueryProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <AntdConfigProvider>
        <QueryProvider>{children}</QueryProvider>
      </AntdConfigProvider>
    </AntdRegistry>
  );
};

export default Providers;
