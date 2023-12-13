const mongoose = require('mongoose');

async function dataBaseConnection(){
  try{
    await mongoose.connect(process.env.MONGODB_CONN_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Conexion exitosa con la base de datos')

  } catch(error){
    console.log(error);
    throw new Error('No se pudo conectar a la base de datos')
  }
}

module.exports = {
  dataBaseConnection
}