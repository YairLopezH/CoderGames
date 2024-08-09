function agregarProducto(id) {
    const producto = productos.find(p => p.id === id);
    const carrito = cargarCarritoLS();
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderBotonCarrito();
}

function renderBotonCarrito() {
    const carrito = cargarCarritoLS();
    document.getElementById("totalCarrito").innerText = carrito.length;
}

function cargarProductoLS() {
    const id = JSON.parse(localStorage.getItem("producto"));
    return productos.find(p => p.id === id);
}

function cargarCarritoLS() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarritoLS(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}