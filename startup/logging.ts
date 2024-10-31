import logger from '../logger';


export default function(){
    process.on('uncaughtException', (err: any)=>{
        console.log('We caught an uncaught exception ')
        logger.error(err.message, err)
        process.exit(1)
    })
    
    process.on('unhandledRejection', (err: any) => {
        console.log('We caught an unhandled rejection ')
        logger.error(err.message, err)
        process.exit(1)
    })
}