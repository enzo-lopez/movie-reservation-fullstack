// restore-mongo.js
const {exec} = require('child_process')

const MONGO_URI = 'TU_MONGO_URI' // Cambia esto por tu URI real de MongoDB Atlas
const BACKUP_PATH = './backup' // Cambia esto si tu backup está en otra ruta

const command = `mongorestore --drop --uri="${MONGO_URI}" "${BACKUP_PATH}"`

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error al restaurar la base de datos: ${error.message}`)
    return
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`)
    return
  }
  console.log(`Restauración completada:\n${stdout}`)
})
