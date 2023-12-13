const { response, request } = require('express');
const User = require('../models/users.model');
const { schema } = require('../validators/user.validators')

async function userGet(req=request, res=response){
  try {
    const queryParam =  { state : true } 
    const { limit = 10 } = req.query // accedemos a los parametros del query y obtemenos el de nombre "limit"
    const numeroEntradas = await User.countDocuments()
    const usuario = await User.find(queryParam).pupulate('service').limit(Number(limit)) // el find encontrara todos los registros con { state:true } // como limte pasamos el valor del query (?) // populate nos sirve para traer los datos de la conexión que tenemos con Service
    res.status(200).json({ 
      message:numeroEntradas,
      usuario
    })
  } catch (error) {
    res.status(500).json({
      message:'Algo ocurrio cuando buscabamos el usuario'
    })
  }
}

async function userPost(req=request, res=response){
  try {
    // Obtenemos la información del Body, enviada por el usuario desde un formulario en el frontend
    const { userName, email, phoneNumber, password, state, service, address } = req.body
    const data = { userName, email, phoneNumber, password, state, service, address }
    // Hacemos uso de nuestro users.model para crear una instancia con los campos del body y poder generar una colección
    const user = new User(data)
    // Guardamos esta conexión para posteriormente enviarla al servidor
    await user.save()

    res.status(200).json({ 
      message: "Usuario Route creado con post",
      user
    })
  } catch (error) {
    res.status(500).json({
      message:'Error en el servidor',
      error
    })
  }
}

async function userPut(req=request, res=response){
  try {
    const { id } = req.params;
    const { userName, email, phoneNumber, password, state, service, address } = req.body;
    const data =  { userName, email, phoneNumber, password, state, service, address }

    const user = await User.findByIdAndUpdate(id, data) // Se encarga de buscar el registro por id y modificarl sus parametros con un objeto como parametro
    res.status(200).json({ 
      message: 'Usuarios modificados con exito',
      ok:true
    })
  } catch (error) {
    res.status(500).json({
      message:'Algo salio mal cuando intentabamos actualizar el usuario'
    })
    
  }
}

async function userDel(req=request, res=response){
  try {
    const { id } = req.params;
    const falseState = { state : false }
    const user = await User.findByIdAndUpdate(id, falseState);

    res.status(200).json({ 
      message:`El usuario con ID = ${id} fue eliminado`,
    })
  } catch (error) {
    res.status(500).json({
      message:`El usuario con ID = ${id} no fue eliminado porque no está en la base de datos`
    })
  }
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userDel
};