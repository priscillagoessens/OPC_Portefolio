const modal = document.querySelector(".modal")
export function openmodal(e){
    e.preventDefault()
    modal.style.visibility = "visible";
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal','true')
    const close =  document.querySelector(".close-modal")
    close.addEventListener('click', closeModal)
}
function closeModal(){
    modal.style.visibility = "hidden";
    modal.removeAttribute('aria-modal')
    modal.setAttribute('aria-hidden','true')
}

window.addEventListener('keydown', function(e){
    if(e.key === "Escape"|| e.key ==="Esc"){
        closeModal(e)
    }
})