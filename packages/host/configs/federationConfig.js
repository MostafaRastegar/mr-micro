const { dependencies } = require("../package.json");

const federationConfig = (REMOTE_URL) => {
  console.log("===== start REMOTE_URL =======>");
  console.log(REMOTE_URL);
  console.log("<==== end   =======");
  return {
    name: "Host",
    filename: "remoteEntry.js",

    remotes: {
      Remote: `Remote@${REMOTE_URL}/remoteEntry.js`,
    },
    shared: {
      ...dependencies,
      react: {
        singleton: true,
        requiredVersion: dependencies["react"],
      },
      "react-dom": {
        singleton: true,
        requiredVersion: dependencies["react-dom"],
      },
    },
  };
};

module.exports = federationConfig;
