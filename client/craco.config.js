const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@features": path.resolve(__dirname, "src/features"),
      "@queries": path.resolve(__dirname, "src/features/graphql/queries"),
      "@mutations": path.resolve(__dirname, "src/features/graphql/mutations"),
      "@components": path.resolve(__dirname, "src/app/components"),
      "@forms": path.resolve(__dirname, "src/app/components/forms"),
      "@players": path.resolve(__dirname, "src/app/components/players"),
      "@teams": path.resolve(__dirname, "src/app/components/teams"),
      "@images": path.resolve(__dirname, "src/assets/images"),
      "@generics": path.resolve(__dirname, "src/app/components/generics"),
      "@utils": path.resolve(__dirname, "src/app/utils")
    },
  },
};
