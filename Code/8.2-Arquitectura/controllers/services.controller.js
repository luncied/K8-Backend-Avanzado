const { response, request } = require('express');

// Model - Schema
const Service = require('../models/services.model')

async function serviceGet(req=request, res=response){
  try {
    const queryParam =  { active : true } 
    const numeroEntradas = await Service.countDocuments()
    const service = await Service.find(queryParam) // el find encontrara todos los registros con { state:true } // como limte pasamos el valor del query (?)
    res.status(200).json({ 
      message:numeroEntradas,
      service
    })
  } catch (error) {
    res.status(500).json({
      message:'Algo ocurrio cuando buscabamos el servicio'
    })
  }
}

async function servicePost(req=request, res=response){
  try {
    // Obtenemos la información del Body, enviada por el usuario desde un formulario en el frontend
    const { name, active, price } = req.body
    const data = { name, active, price }
    // Hacemos uso de nuestro users.model para crear una instancia con los campos del body y poder generar una colección
    const service = new Service(data)
    // Guardamos esta conexión para posteriormente enviarla al servidor
    await service.save()

    res.status(200).json({ 
      message: "Servicio Route creado con post",
      service
    })
  } catch (error) {
    res.status(500).json({
      message:'Error en el servidor',
      error
    })
  }
}

async function servicePut(req=request, res=response){
  try {
    const { id } = req.params;
    const { name, active, price } = req.body;
    const data =  { name, active, price }

    await Service.findByIdAndUpdate(id, data) // Se encarga de buscar el registro por id y modificarl sus parametros con un objeto como parametro
    res.status(200).json({ 
      message: 'Servicio modificado con exito',
      ok:true
    })
  } catch (error) {
    res.status(500).json({
      message:'Algo salio mal cuando intentabamos actualizar el servicio'
    })
    
  }
}

async function serviceDel(req=request, res=response){
  try {
    const { id } = req.params;
    const falseActive = { active : false }
    await Service.findByIdAndUpdate(id, falseActive);

    res.status(200).json({ 
      message:`El servicio con ID = ${id} fue eliminado`,
    })
  } catch (error) {
    res.status(500).json({
      message:`El servicio con ID = ${id} no fue eliminado porque no está en la base de datos`
    })
  }
}

module.exports = {
  serviceGet,
  servicePost,
  servicePut,
  serviceDel
};