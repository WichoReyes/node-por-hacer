const { boolean } = require('yargs');

const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de la tarea por hacer'
}

const completado = {

    alias: 'c',
    default: true,
    type: 'boolean',
    desc: 'Marca como completado la tarea o pendiente'

}

const argv = require('yargs')
    .command('crear', 'Crea una nueva tarea por completar', {
        descripcion
    })
    .command('actualizar', 'Actualiza el estado completado de una tarea', {
        descripcion,
        completado
    })
    .command('listar', 'Lista todas las tareas dependiendo si ya fueron hechas o no', {
        completado
    })
    .command('borrar', 'Borra una tarea', {
        descripcion
    })
    .help()
    .argv;

module.exports = {
    argv
}