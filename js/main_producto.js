let productos = [];

function cargarProductos() {
    fetch('data/productos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los datos.');
            }
            return response.json();
        })
        .then(data => {
            productos = data;
            renderProductos();
            renderBotonCarrito();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function renderProductos() {
    let contenidoHTML = "";

    for (const producto of productos) {
        contenidoHTML += `<div class="col-md-3">
            <div class="card border-0">
                <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body text-center">
                    <p class="card-text">${producto.nombre}<br><span class="text-danger">$${producto.precio.toFixed(2)} USD</span></p>
                    <button class="btn btn-primary" onclick="agregarProducto(${producto.id});">Añadir al carrito</button>
                </div>
            </div>
        </div>`;
    }

    document.getElementById("contenido").innerHTML = contenidoHTML;
}

function agregarProducto(id) {
    const producto = productos.find(item => item.id === id);
    if (producto) {
        const carrito = cargarCarritoLS();
        carrito.push(producto);
        guardarCarritoLS(carrito);
        renderBotonCarrito();
        console.log("El producto #" + id + " se ha agregado correctamente!");
    }
}

function cargarCarritoLS() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarritoLS(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderBotonCarrito() {
    const total = totalProductos();
    document.getElementById("totalCarrito").innerText = total;
}

function totalProductos() {
    const carrito = cargarCarritoLS();
    return carrito.length;
}

document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("contenido")) {
        cargarProductos(); // Cargar productos desde JSON
    }
    if (document.getElementById("totalCarrito")) {
        renderBotonCarrito();
    }
});
