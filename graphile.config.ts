import type { GraphileConfig } from "graphile-config";
import type {} from "graphile-worker";

const preset: GraphileConfig.Preset = {
  worker: {
    connectionString: process.env.DB_CONNECTION_STRING,
    concurrentJobs: 1,
    fileExtensions: [".js", ".cjs", ".mjs", ".ts", ".cts", ".mts"],
  },
};

export default preset;
