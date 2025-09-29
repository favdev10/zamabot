import type { NextConfig } from "next";
import createNextPluginTM from "next-transpile-modules";

// transpile @zama-fhe/relayer-sdk
const withTM = createNextPluginTM(["@zama-fhe/relayer-sdk"]);

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withTM(nextConfig);
