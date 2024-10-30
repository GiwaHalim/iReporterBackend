const logger = require('../logger')


module.exports = function(){
    process.on('uncaughtException', (err)=>{
        console.log('We caught an uncaught exception ')
        logger.error(err.message, err)
        process.exit(1)
    })
    
    process.on('unhandledRejection', (err) => {
        console.log('We caught an unhandled rejection ')
        logger.error(err.message, err)
        process.exit(1)
    })
}