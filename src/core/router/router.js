const {config } =require('../../utils')

const routeRegister= new Array()

const routeDecorator = (router)=>{
    return (target, property)=>{
        target[property]=router;
        routeRegister.push(router);
    }
}

function setRoutes(app){
    app.use('/api'+config.apiPath, routeRegister)
}
module.exports = {routeRegister, routeDecorator,setRoutes}