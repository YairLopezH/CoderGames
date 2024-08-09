document.addEventListener("DOMContentLoaded", function() {
    renderProductos();
});

function renderProductos() {
    fetch('data/productos.json')
        .then(response => response.json())
        .then(productos => {
            const productosDestacados = productos.slice(0, 2); 
            let contenidoHTML = "";

            for (const producto of productosDestacados) {
                contenidoHTML += `<div class="col-md-6">
                    <div class="card border-0">
                        <img src="images/${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                        <div class="card-body text-center">
                            <p class="card-text">${producto.nombre}<br><span class="text-danger">$${producto.precio.toFixed(2)} USD</span></p>
                            <button class="btn btn-primary" onclick="agregarProducto(${producto.id});">Añadir al carrito</button>
                        </div>
                    </div>
                </div>`;
            }

            document.getElementById("productosDestacados").innerHTML = contenidoHTML;
            renderBotonCarrito();
        })
        .catch(error => console.error('Error al cargar productos:', error));
}

function agregarProducto(id) {
    fetch('data/productos.json')
        .then(response => response.json())
        .then(productos => {
            const producto = productos.find(item => item.id === id);
            if (producto) {
                const carrito = cargarCarritoLS();
                carrito.push(producto);
                guardarCarritoLS(carrito);
                renderBotonCarrito();
            }
        })
        .catch(error => console.error('Error al agregar producto:', error));
}

function cargarCarritoLS() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarritoLS(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function renderBotonCarrito() {
    const total = totalProductos();
    document.getElementById("totalCarrito").innerText = total || 0;
}

function totalProductos() {
    const carrito = cargarCarritoLS();
    return carrito.length;
}
