const config = {
  env: process.env.NODE_ENV,
  server: {
    port: Number(process.env.PORT),
    version: process.env.API_VERSION
  },
  database: {
    connection: process.env.MONGO_URI
  }
};

export default config;
