const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "date-fns/min": path.resolve(__dirname, "node_modules/date-fns/index.js"),
      "date-fns/subSeconds": path.resolve(
        __dirname,
        "node_modules/date-fns/index.js"
      ),
      "date-fns/isAfter": path.resolve(
        __dirname,
        "node_modules/date-fns/index.js"
      ),
    },
    resolve: {
      fallback: {},
    },
  },
};
