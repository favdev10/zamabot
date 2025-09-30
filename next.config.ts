import type { NextConfig } from "next";
import createNextPluginTM from "next-transpile-modules";

// transpile @zama-fhe/relayer-sdk
const withTM = createNextPluginTM(["@zama-fhe/relayer-sdk"]);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@zama-fhe/relayer-sdk"],
};

export default withTM(nextConfig);
