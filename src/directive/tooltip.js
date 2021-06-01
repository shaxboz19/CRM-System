import M from 'materialize-css'
export default {
    mounted(el, {value}) {
        M.Tooltip.init(el, {html : value})

    },
    unmounted(el) {
       const elem = M.Tooltip.getInstance(el)
       if(elem && elem.destroy) {
           elem.destroy()
       }
    },
    
}