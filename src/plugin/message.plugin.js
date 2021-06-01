import M from 'materialize-css'
export default {
    install(app) {
        const message = () =>{
            app.config.globalProperties.$message = val =>{
                M.toast({html : val})
            }}
        app.config.globalProperties.$error = val =>{
            M.toast({html : `[Ошибка] : ${val}` })
        }  
        app.provide('message', message)
    }

}