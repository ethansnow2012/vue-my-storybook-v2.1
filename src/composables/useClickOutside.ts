import { onBeforeUnmount, onMounted } from "vue"

export function useClickOutside(elTargetRef: Ref<HTMLElement>, callbackFn: ()=>any){
    if(!elTargetRef) return

    let listener = (e)=>{
        if( e.target ==  elTargetRef.value ||
            e.composedPath().includes(elTargetRef.value)
        ){
            return
        }
        if( typeof callbackFn == 'function'){
            callbackFn()
        }
    }
    onMounted(()=>{
        window.addEventListener('click', listener)
    })
    onBeforeUnmount(()=>{
        window.removeEventListener('click', listener)
    })
    return {
        listener
    }
}