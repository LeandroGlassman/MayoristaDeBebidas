// Traer Productos con JSON
// Crear tarjetas de producto
// carrito

const cards = document.getElementById(`cards`)
const items = document.getElementById(`items`)
const footer = document.getElementById(`footer`)
const templateCard = document.getElementById(`template-card`).content
const templateFooter = document.getElementById(`template-footer`).content
const templateCarrito = document.getElementById(`template-carrito`).content
const fragment = document.createDocumentFragment()
let carrito = {}



document.addEventListener(`DOMContentLoaded`, () => {
    fetchData()
    if(localStorage.getItem(`carrito`)) {
        carrito = JSON.parse(localStorage.getItem(`carrito`))
        crearCarrito()
    }
})
cards.addEventListener(`click`, e => {
    addCarrito(e)
})

items.addEventListener(`click`, e => {
    btnAccion(e)
})

const fetchData = async () => {
    try {
        const res = await fetch (`productos.json`)
        const data = await res.json()
        crearCards(data)
    } catch (error) {
        console.log(error);
    }
}

const crearCards = data => {
    data.forEach(producto => {
    templateCard.querySelector(`h5`).textContent = producto.nombre
    templateCard.querySelector(`p`).textContent = producto.precio
    templateCard.querySelector(`img`).setAttribute("src", producto.imagen)
    templateCard.querySelector(`button`).dataset.id = producto.id
    const clone = templateCard.cloneNode(true)
    fragment.appendChild(clone)
    })

    cards.appendChild(fragment)
}

const addCarrito = e => {
    if(e.target.classList.contains(`btn-dark`)) {
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector(`.btn-dark`).dataset.id,
        nombre: objeto.querySelector(`h5`).textContent,
        precio: objeto.querySelector(`p`).textContent,
        cantidad:1
    }
    if(carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {...producto}
    crearCarrito()

}


const crearCarrito = () => {
    items.innerHTML = ``
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector(`th`).textContent = producto.id
        templateCarrito.querySelectorAll(`td`)[0].textContent = producto.nombre
        templateCarrito.querySelectorAll(`td`)[1].textContent = producto.cantidad
        templateCarrito.querySelector(`.btn-info`).dataset.id = producto.id
        templateCarrito.querySelector(`.btn-danger`).dataset.id = producto.id
        templateCarrito.querySelector(`span`).textContent = producto.cantidad * producto.precio

        const clone = templateCarrito.cloneNode(true)
        fragment.append(clone)
    })
    items.appendChild(fragment)

    crearFooter()

    localStorage.setItem(`carrito`, JSON.stringify(carrito))
} 

const crearFooter = () => {
    footer.innerHTML = ``
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacio - comience a comprar</th>
        `
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad,0)
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio,0)
    
    templateFooter.querySelectorAll(`td`)[0].textContent = nCantidad
    templateFooter.querySelector(`span`).textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const btnVaciar = document.getElementById(`vaciar-carrito`)
    btnVaciar.addEventListener(`click`, () => {
        carrito = {}
        crearCarrito()
    })

    const btnComprar = document.getElementById(`comprar-carrito`)
    btnComprar.addEventListener(`click`, () => {
        swal("Gracias por su compra!", "el total es $" + nPrecio, "success");
        carrito = {}
        crearCarrito()
    })
}

const btnAccion = e => {
    if(e.target.classList.contains(`btn-info`)) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        crearCarrito()
    }

    if(e.target.classList.contains(`btn-danger`)){
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if(producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        crearCarrito()
    }

    e.stopPropagation()
}

// animaciones en informacion

$("#info-1").click(function () {
   $(".informacion-1-elementos").slideToggle()
})


$("#info-2").click(function () {
    $(".informacion-2-elementos").slideToggle()
 })

 // envios

 $("#zona-sur").click(function(){
     $("#zona-sur-mensaje").slideToggle()
 })
 

 $("#zona-norte").click(function(){
    $("#zona-norte-mensaje").slideToggle()
})



$("#zona-oeste").click(function(){
    $("#zona-oeste-mensaje").slideToggle()
})


$("#zona-caba").click(function(){
    $("#zona-caba-mensaje").slideToggle()
})
// mensaje de confirmacion del form
// form sin recargar la pagina

$("#enviar").click(function (){
    $("#form--p").show();
});

$("#formulario").click(function (e) {
    e.preventDefault()
});

