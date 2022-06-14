const db = require("mongoose");
db.Promise = global.Promise;

//create conexion to data base
const connectDb = async (url) => {
  try {
    await db.connect(url, {
      useNewUrlParser: true,
    });
    console.log("[dataBase]: Connected successfull");
  } catch (error) {
    console.error("[conexionDataBaseError]: ", error);
  }
};

module.exports = { connectDb };
