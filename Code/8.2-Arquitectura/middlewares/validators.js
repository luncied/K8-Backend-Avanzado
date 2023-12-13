// function validatePost ( schema ){
//   return (req, res, next) => {
//     // Esta es la validación con joi
//     const { error } = schema.validate(req.body)

//     if(error){
//       return res.status(400).json({
//         message: error.details[0].message
//       })
//     }
//     next()
//   }
// }

// module.exports = {
//   validatePost
// }
