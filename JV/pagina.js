// Carga de inventario base si es la primera sesión
const productosBase = [
    { id: 1, nombre: "Figura Luffy Gear 5", categoria: "Figuras Coleccionables", descripcion: "Figura detallada 25cm One Piece", precio: 85.00, stock: 10, requiere_receta: false, imagen_url: "img/luffy.jpg" },
    { id: 2, nombre: "Katana Metálica Nichirin", categoria: "Accesorio y Katanas", descripcion: "Réplica coleccionable acero de alto carbono", precio: 120.00, stock: 4, requiere_receta: true, imagen_url: "img/katana.jpg" },
    { id: 3, nombre: "Manga Chainsaw Man Vol. 1", categoria: "Mangas y Cómics", descripcion: "Tomo 1 en español editorial oficial", precio: 15.00, stock: 25, requiere_receta: false, imagen_url: "img/manga.jpg" },
    { id: 4, nombre: "Capa Akatsuki Naruto", categoria: "Cosplay y Ropa", descripcion: "Capa de tela bordada alta calidad", precio: 45.00, stock: 12, requiere_receta: false, imagen_url: "img/capa.jpg" }
];

let carrito = [];
let porcentajeDescuentoVIP = 0;
let categoriaActual = 'Todos';

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('productos')) {
        localStorage.setItem('productos', JSON.stringify(productosBase));
    }
    renderizarProductos();
});

function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
}

// TOGGLES Y NAVEGACIÓN
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('active');
}

function toggleNosotros() {
    const modal = document.getElementById('nosotros-modal');
    if (modal) modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
        actualizarCarritoUI();
    }
}

// RENDER Y FILTROS DE PRODUCTOS
function renderizarProductos(productosFiltrados = null) {
    const catalog = document.getElementById('product-catalog');
    if (!catalog) return;

    const productos = productosFiltrados || obtenerProductos();
    catalog.innerHTML = '';

    if (productos.length === 0) {
        catalog.innerHTML = '<p class="no-prods">No hay productos disponibles en esta categoría.</p>';
        return;
    }

    productos.forEach(p => {
        // --- NUEVO: Calcular el stock restando lo del carrito ---
        const itemEnCarrito = carrito.find(item => String(item.id) === String(p.id));
        const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
        const stockDisponible = p.stock - cantidadEnCarrito;
        const agotado = stockDisponible <= 0;

        catalog.innerHTML += `
            <div class="product-card ${agotado ? 'agotado' : ''}">
                <div class="product-image">
                    <img src="${p.imagen_url}" alt="${p.nombre}" onerror="this.src='img-pagina/Aniverse.png'">
                    ${p.requiere_receta ? '<span class="badge-receta">Edición Limitada</span>' : ''}
                </div>
                <div class="product-details">
                    <span class="product-cat">${p.categoria}</span>
                    <h3>${p.nombre}</h3>
                    <p>${p.descripcion}</p>
                    <div class="product-price-stock">
                        <span class="price">$${parseFloat(p.precio).toFixed(2)}</span>
                        <span class="stock">${agotado ? 'Sin Stock' : 'Stock: ' + stockDisponible}</span>
                    </div>
                    <button class="btn-add-cart" onclick="agregarAlCarrito('${p.id}')" ${agotado ? 'disabled' : ''}>
                        ${agotado ? 'Agotado' : 'Agregar al Carrito'}
                    </button>
                </div>
            </div>
        `;
    });
}

function filtrarPorCategoria(categoria) {
    categoriaActual = categoria;
    const catSpan = document.getElementById('nombre-categoria');
    if (catSpan) catSpan.textContent = categoria === 'Todos' ? '' : `- ${categoria}`;
    
    const productos = obtenerProductos();
    if (categoria === 'Todos') {
        renderizarProductos(productos);
    } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        renderizarProductos(filtrados);
    }
    toggleSidebar();
}

function buscarProducto() {
    const texto = document.getElementById('searchInput').value.toLowerCase();
    const productos = obtenerProductos();
    
    const filtrados = productos.filter(p => {
        const coincideNombre = p.nombre.toLowerCase().includes(texto) || p.descripcion.toLowerCase().includes(texto);
        const coincideCat = (categoriaActual === 'Todos') || (p.categoria === categoriaActual);
        return coincideNombre && coincideCat;
    });

    renderizarProductos(filtrados);
}

// MANEJO DEL CARRITO
function agregarAlCarrito(id) {
    const productos = obtenerProductos();
    const prod = productos.find(p => String(p.id) === String(id));

    if (!prod) return;

    // Calcular cuánto stock queda realmente disponible
    const itemExistente = carrito.find(item => String(item.id) === String(id));
    const cantidadActual = itemExistente ? itemExistente.cantidad : 0;
    const stockDisponible = prod.stock - cantidadActual;

    if (stockDisponible <= 0) {
        mostrarToast('No hay más stock disponible para agregar.');
        return;
    }

    // --- NUEVO: Preguntar la cantidad deseada al usuario ---
    let cantidadIngresada = prompt(`¿Cuántas unidades de "${prod.nombre}" deseas agregar? (Stock disponible: ${stockDisponible})`, "1");
    
    // Si el usuario da a cancelar en el cuadro de diálogo
    if (cantidadIngresada === null) return; 

    let cantidadAAgregar = parseInt(cantidadIngresada);

    if (isNaN(cantidadAAgregar) || cantidadAAgregar <= 0) {
        mostrarToast('Por favor, ingresa una cantidad válida.');
        return;
    }

    if (cantidadAAgregar > stockDisponible) {
        mostrarToast('La cantidad ingresada supera el stock disponible.');
        return;
    }

    if (itemExistente) {
        itemExistente.cantidad += cantidadAAgregar;
    } else {
        carrito.push({
            id: prod.id,
            nombre: prod.nombre,
            precio: parseFloat(prod.precio),
            cantidad: cantidadAAgregar,
            stockMax: prod.stock,
            requiere_receta: prod.requiere_receta
        });
    }

    mostrarToast(`"${prod.nombre}" añadido al carrito.`);
    
    actualizarCarritoUI();
    // --- NUEVO: Actualizar catálogo para bajar el stock visualmente ---
    renderizarProductos(); 
    // --- NUEVO: Animación de latido en el botón del carrito ---
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
        cartIcon.classList.remove('pulsar'); // Reinicia la animación si se hace clic rápido
        void cartIcon.offsetWidth; // Fuerza al navegador a recalcular el DOM
        cartIcon.classList.add('pulsar');
        
        // Quita la clase después de que termine la animación para poder reusarla
        setTimeout(() => {
            cartIcon.classList.remove('pulsar');
        }, 300);
    }
}

function cambiarCantidad(id, delta) {
    const item = carrito.find(i => String(i.id) === String(id));
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
        carrito = carrito.filter(i => String(i.id) !== String(id));
    } else if (item.cantidad > item.stockMax) {
        item.cantidad = item.stockMax;
        mostrarToast('Límite de stock alcanzado.');
    }

    actualizarCarritoUI();
    // --- NUEVO: Refrescar la tienda al sumar o restar desde el carrito ---
    renderizarProductos(); 
}

function actualizarCarritoUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    
    // Contar el total de unidades acumuladas en el carrito
    const totalItems = carrito.reduce((sum, i) => sum + i.cantidad, 0);
    if (cartCount) cartCount.textContent = totalItems;

    if (!cartItems) return;

    if (carrito.length === 0) {
        cartItems.innerHTML = '<p>Tu carrito está vacío.</p>';
        const recetaContainer = document.getElementById('receta-container');
        if (recetaContainer) recetaContainer.style.display = 'none';
    } else {
        cartItems.innerHTML = '';
        let requiereEspecial = false;

        carrito.forEach(item => {
            if (item.requiere_receta) requiereEspecial = true;

            cartItems.innerHTML += `
                <div class="cart-item-row">
                    <div>
                        <strong>${item.nombre}</strong><br>
                        <small>$${item.precio.toFixed(2)} c/u</small>
                    </div>
                    <div class="cart-controls">
                        <button onclick="cambiarCantidad('${item.id}', -1)">-</button>
                        <span>${item.cantidad}</span>
                        <button onclick="cambiarCantidad('${item.id}', 1)">+</button>
                    </div>
                </div>
            `;
        });

        const recetaContainer = document.getElementById('receta-container');
        if (recetaContainer) recetaContainer.style.display = requiereEspecial ? 'block' : 'none';
    }

    calcularTotales();
}

// CLIENTES, VIP Y CHECKOUT
function buscarClienteRTN() {
    const rtn = document.getElementById('rtn-input').value.trim();
    if (!rtn) return;

    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    const prevFactura = facturas.slice().reverse().find(f => f.rtn === rtn);

    if (prevFactura) {
        document.getElementById('nombre-input').value = prevFactura.cliente || '';
        document.getElementById('telefono-input').value = prevFactura.telefono || '';
        document.getElementById('direccion-input').value = prevFactura.direccion || '';
        mostrarToast('Datos del cliente recuperados.');
    }
}

function validarMembresiaVIP() {
    const dni = document.getElementById('dni-input').value.trim();
    const msg = document.getElementById('msg-descuento');

    if (!dni) {
        porcentajeDescuentoVIP = 0;
        if (msg) msg.textContent = '';
        calcularTotales();
        return;
    }

    const miembrosVIP = JSON.parse(localStorage.getItem('miembrosVIP')) || [];
    const miembro = miembrosVIP.find(m => m.dni === dni);

    if (miembro) {
        porcentajeDescuentoVIP = parseFloat(miembro.porcentaje);
        if (msg) {
            msg.style.color = '#2ed573';
            msg.textContent = `¡Membresía VIP Activa! Descuento aplicado: ${miembro.porcentaje}%`;
        }
    } else {
        porcentajeDescuentoVIP = 0;
        if (msg) {
            msg.style.color = '#ff4757';
            msg.textContent = 'DNI no registrado en el programa VIP.';
        }
    }

    calcularTotales();
}

function calcularTotales() {
    let subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    let descuento = (subtotal * porcentajeDescuentoVIP) / 100;
    let subtotalDescuento = subtotal - descuento;
    let impuesto = subtotalDescuento * 0.15;
    let total = subtotalDescuento + impuesto;

    const elemSubtotal = document.getElementById('cart-subtotal');
    const elemDescuento = document.getElementById('cart-descuento');
    const elemImpuesto = document.getElementById('cart-impuesto');
    const elemTotal = document.getElementById('cart-total-price');

    if (elemSubtotal) elemSubtotal.textContent = subtotal.toFixed(2);
    if (elemDescuento) elemDescuento.textContent = descuento.toFixed(2);
    if (elemImpuesto) elemImpuesto.textContent = impuesto.toFixed(2);
    if (elemTotal) elemTotal.textContent = total.toFixed(2);

    return { subtotal, descuento, impuesto, total };
}

function checkout() {
    if (carrito.length === 0) {
        alert('Agrega al menos un producto al carrito.');
        return;
    }

    const nombre = document.getElementById('nombre-input').value.trim();
    if (!nombre) {
        alert('Por favor ingresa tu Nombre Completo.');
        return;
    }

    // NUEVO: Validar que se haya seleccionado un país
    const paisSeleccionado = document.getElementById('pais-input').value;
    if (!paisSeleccionado) {
        alert('Por favor selecciona un país de envío.');
        return;
    }

    const tieneEspecial = carrito.some(i => i.requiere_receta);
    const recetaInput = document.getElementById('receta-file');
    const archivoFile = recetaInput ? recetaInput.files.length : 0;
    
    if (tieneEspecial && archivoFile === 0) {
        alert('Uno o más artículos de tu carrito requieren adjuntar un documento/permiso.');
        return;
    }

    const { subtotal, impuesto, total } = calcularTotales();
    const metodoPago = document.getElementById('metodo-pago').value;
    const rtn = document.getElementById('rtn-input').value.trim();
    const direccionExacta = document.getElementById('direccion-input').value.trim();

    // Actualizar inventario local
    let productos = obtenerProductos();
    carrito.forEach(item => {
        const prod = productos.find(p => String(p.id) === String(item.id));
        if (prod) {
            prod.stock -= item.cantidad;
        }
    });
    localStorage.setItem('productos', JSON.stringify(productos));

    // Registrar Factura
    let facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    const nuevaFactura = {
        numero: facturas.length + 1001,
        fecha: new Date().toLocaleDateString(),
        rtn: rtn || 'N/A',
        cliente: nombre,
        telefono: document.getElementById('telefono-input').value.trim(),
        // NUEVO: Concatenar la dirección exacta con el país seleccionado
        direccion: `${direccionExacta}, ${paisSeleccionado}`,
        subtotal: subtotal,
        isv: impuesto,
        total: total,
        metodoPago: metodoPago,
        productos: carrito.map(item => ({ nombre: item.nombre, cantidad: item.cantidad }))
    };

    facturas.push(nuevaFactura);
    localStorage.setItem('facturas', JSON.stringify(facturas));

    alert(`¡Gracias por tu compra, ${nombre}!\nTu número de orden/factura es #${nuevaFactura.numero}.\nEn el transcurso de una semana llegará su pedido a ${paisSeleccionado}.`);

    // Limpieza de campos del formulario
    document.getElementById('rtn-input').value = '';
    document.getElementById('nombre-input').value = '';
    document.getElementById('telefono-input').value = '';
    document.getElementById('direccion-input').value = '';
    document.getElementById('pais-input').selectedIndex = 0; // NUEVO: Resetear el select del país
    document.getElementById('dni-input').value = '';
    
    const msgDesc = document.getElementById('msg-descuento');
    if (msgDesc) msgDesc.textContent = '';
    if (recetaInput) recetaInput.value = '';

    document.getElementById('cuenta-input').value = '';
    document.getElementById('titular-tarjeta').value = '';
    document.getElementById('vencimiento-tarjeta').value = '';
    document.getElementById('cvv-tarjeta').value = '';

    // Resetear carrito y actualizar vista
    carrito = [];
    porcentajeDescuentoVIP = 0;
    actualizarCarritoUI();
    renderizarProductos();
    toggleCart();
}

function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = mensaje;
    toast.className = 'toast show';
    setTimeout(() => {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}