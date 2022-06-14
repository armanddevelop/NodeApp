const config = {
  dbUrl:
    process.env.DB_URL ||
    "mongodb+srv://messageAppNode:gmtmdq5Tk6Wwq1rz@cluster0.n14oscc.mongodb.net/platziMessage_db",
  port: process.env.PORT || 3000,
  host: process.env.HOST || "http://localhost",
  publicRoute: process.env.PUBLIC_ROUTE || "/app",
  filesRoute: process.env.FILES_ROUTE || "/files",
};

module.exports = config;
