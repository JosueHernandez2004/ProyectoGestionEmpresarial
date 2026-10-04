let carrito = [];
let porcentajeDescuentoVIP = 0;

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar productos por defecto en localStorage si no existen
    if (!localStorage.getItem('productos')) {
        const productosBase = [
            { id: 1, nombre: "Figura Luffy Gear 5", categoria: "Figuras Coleccionables", descripcion: "Figura detallada 25cm One Piece", precio: 85.00, stock: 10, requiere_receta: false, imagen_url: "img/luffy.jpg" },
            { id: 2, nombre: "Katana Metálica Nichirin", categoria: "Accesorio y Katanas", descripcion: "Réplica coleccionable acero de alto carbono", precio: 120.00, stock: 4, requiere_receta: true, imagen_url: "img/katana.jpg" },
            { id: 3, nombre: "Manga Chainsaw Man Vol. 1", categoria: "Mangas y Cómics", descripcion: "Tomo 1 en español editorial oficial", precio: 15.00, stock: 25, requiere_receta: false, imagen_url: "img/manga.jpg" },
            { id: 4, nombre: "Capa Akatsuki Naruto", categoria: "Cosplay y Ropa", descripcion: "Capa de tela bordada alta calidad", precio: 45.00, stock: 12, requiere_receta: false, imagen_url: "img/capa.jpg" }
        ];
        localStorage.setItem('productos', JSON.stringify(productosBase));
    }
    renderizarProductos();
});

function obtenerProductos() {
    return JSON.parse(localStorage.getItem('productos')) || [];
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.style.display = (modal.style.display === 'block') ? 'none' : 'block';
        actualizarCarritoUI();
    }
}

function renderizarProductos(productosFiltrados = null) {
    const catalog = document.getElementById('product-catalog');
    if (!catalog) return;

    const productos = productosFiltrados || obtenerProductos();
    catalog.innerHTML = '';

    if (productos.length === 0) {
        catalog.innerHTML = '<p class="no-prods">No hay productos disponibles.</p>';
        return;
    }

    productos.forEach(p => {
        const itemEnCarrito = carrito.find(item => String(item.id) === String(p.id));
        const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
        const stockDisponible = p.stock - cantidadEnCarrito;
        const agotado = stockDisponible <= 0;

        catalog.innerHTML += `
            <div class="product-card ${agotado ? 'agotado' : ''}">
                <div class="product-image">
                    <img src="${p.imagen_url}" alt="${p.nombre}" onerror="this.src='img-pagina/Aniverse.png'">
                </div>
                <div class="product-details">
                    <span class="product-cat">${p.categoria}</span>
                    <h3>${p.nombre}</h3>
                    <div class="product-price-stock">
                        <span class="price">$${parseFloat(p.precio).toFixed(2)}</span>
                        <span class="stock">${agotado ? 'Sin Stock' : 'Stock: ' + stockDisponible}</span>
                    </div>
                    <button class="btn-add-cart" onclick="agregarAlCarrito('${p.id}')" ${agotado ? 'disabled' : ''}>
                        ${agotado ? 'Agotado' : 'Agregar a la Orden'}
                    </button>
                </div>
            </div>
        `;
    });
}

function buscarProducto() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    const texto = input.value.toLowerCase();
    const productos = obtenerProductos();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
    renderizarProductos(filtrados);
}

function agregarAlCarrito(id) {
    const productos = obtenerProductos();
    const prod = productos.find(p => String(p.id) === String(id));
    if (!prod) return;

    const itemExistente = carrito.find(item => String(item.id) === String(id));
    const cantidadActual = itemExistente ? itemExistente.cantidad : 0;
    const stockDisponible = prod.stock - cantidadActual;

    if (stockDisponible <= 0) {
        mostrarToast('No hay más stock disponible.');
        return;
    }

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: prod.id,
            nombre: prod.nombre,
            precio: parseFloat(prod.precio),
            cantidad: 1,
            stockMax: prod.stock
        });
    }

    actualizarCarritoUI();
    renderizarProductos(); 
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
    renderizarProductos(); 
}

function actualizarCarritoUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    
    const totalItems = carrito.reduce((sum, i) => sum + i.cantidad, 0);
    if (cartCount) cartCount.textContent = totalItems;

    if (cartItems) {
        if (carrito.length === 0) {
            cartItems.innerHTML = '<p>La orden está vacía.</p>';
        } else {
            cartItems.innerHTML = '';
            carrito.forEach(item => {
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
        }
    }
    calcularTotales();
}

function buscarClienteRTN() {
    const rtnInput = document.getElementById('rtn-input');
    if (!rtnInput) return;
    const rtn = rtnInput.value.trim();
    if (!rtn) return;

    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    const prevFactura = facturas.slice().reverse().find(f => f.rtn === rtn);
    if (prevFactura) {
        const nombreInput = document.getElementById('nombre-input');
        if (nombreInput) nombreInput.value = prevFactura.cliente || 'Cliente Final';
    }
}

function validarMembresiaVIP() {
    const dniInput = document.getElementById('dni-input');
    const msg = document.getElementById('msg-descuento');
    if (!dniInput) return;

    const dni = dniInput.value.trim();
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
            msg.textContent = `¡Membresía VIP Activa! Descuento: ${miembro.porcentaje}%`;
        }
    } else {
        porcentajeDescuentoVIP = 0;
        if (msg) {
            msg.style.color = '#ff4757';
            msg.textContent = 'DNI no registrado.';
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

    return { subtotal, impuesto, total };
}

function cambiarMetodoPago() {
    const elemMetodo = document.getElementById('metodo-pago');
    if (!elemMetodo) return;

    const metodo = elemMetodo.value;
    const elemEfectivo = document.getElementById('pago-efectivo');
    const elemTarjeta = document.getElementById('pago-tarjeta');

    if (elemEfectivo) elemEfectivo.style.display = metodo === 'Efectivo' ? 'block' : 'none';
    if (elemTarjeta) elemTarjeta.style.display = metodo === 'Tarjeta' ? 'block' : 'none';
    
    // Limpiar campos de pago
    const montoRecibido = document.getElementById('monto-recibido');
    const cambioVuelto = document.getElementById('cambio-vuelto');
    const numTarjeta = document.getElementById('num-tarjeta');
    const expTarjeta = document.getElementById('exp-tarjeta');
    const cvvTarjeta = document.getElementById('cvv-tarjeta');

    if (montoRecibido) montoRecibido.value = '';
    if (cambioVuelto) cambioVuelto.textContent = '0.00';
    if (numTarjeta) numTarjeta.value = '';
    if (expTarjeta) expTarjeta.value = '';
    if (cvvTarjeta) cvvTarjeta.value = '';
}

function calcularCambio() {
    const { total } = calcularTotales();
    const elemRecibido = document.getElementById('monto-recibido');
    const recibido = elemRecibido ? (parseFloat(elemRecibido.value) || 0) : 0;
    const cambio = recibido - total;
    
    const vueltoSpan = document.getElementById('cambio-vuelto');
    if (vueltoSpan) {
        if (cambio >= 0) {
            vueltoSpan.textContent = cambio.toFixed(2);
            vueltoSpan.style.color = '#2ed573';
        } else {
            vueltoSpan.textContent = "Monto insuficiente";
            vueltoSpan.style.color = '#ff4757';
        }
    }
}

function checkoutCajero() {
    if (carrito.length === 0) {
        alert('Agrega al menos un producto a la orden.');
        return;
    }

    const nombre = document.getElementById('nombre-input')?.value.trim() || 'Cliente Final';
    const rtn = document.getElementById('rtn-input')?.value.trim() || '';
    const metodoPago = document.getElementById('metodo-pago')?.value || 'Efectivo';
    const { subtotal, impuesto, total } = calcularTotales();

    // Validaciones de pago
    if (metodoPago === 'Efectivo') {
        const recibido = parseFloat(document.getElementById('monto-recibido')?.value) || 0;
        if (recibido < total) {
            alert('El monto recibido es menor al total a cobrar.');
            return;
        }
    } else {
        const numTarjeta = document.getElementById('num-tarjeta')?.value || '';
        if (numTarjeta.length < 16) {
            alert('Por favor ingrese un número de tarjeta válido (16 dígitos).');
            return;
        }
    }

    // Descontar inventario
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
    const numeroFactura = facturas.length > 0 ? Math.max(...facturas.map(f => f.numero || 0)) + 1 : 1001;
    
    const nuevaFactura = {
        numero: numeroFactura,
        fecha: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        rtn: rtn || 'CF',
        cliente: nombre,
        telefono: 'N/A',
        direccion: 'Venta en Mostrador (Caja)',
        subtotal: subtotal,
        isv: impuesto,
        total: total,
        metodoPago: metodoPago,
        origen: 'Cajero',
        productos: carrito.map(item => ({ nombre: item.nombre, cantidad: item.cantidad, precio: item.precio }))
    };

    facturas.push(nuevaFactura);
    localStorage.setItem('facturas', JSON.stringify(facturas));

    // Generar el Ticket visual
    generarTicket(nuevaFactura);

    // Limpiar formulario y carrito
    if (document.getElementById('rtn-input')) document.getElementById('rtn-input').value = '';
    if (document.getElementById('nombre-input')) document.getElementById('nombre-input').value = 'Cliente Final';
    if (document.getElementById('dni-input')) document.getElementById('dni-input').value = '';
    
    cambiarMetodoPago();
    
    const msgDesc = document.getElementById('msg-descuento');
    if (msgDesc) msgDesc.textContent = '';
    
    carrito = [];
    porcentajeDescuentoVIP = 0;
    actualizarCarritoUI();
    renderizarProductos();
}

function generarTicket(factura) {
    toggleCart();
    
    const ticket = document.getElementById('ticket-imprimir');
    if (!ticket) return;
    
    let itemsHtml = factura.productos.map(p => `
        <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
            <span>${p.cantidad}x ${p.nombre}</span>
            <span>$${(p.precio * p.cantidad).toFixed(2)}</span>
        </div>
    `).join('');

    let infoPagoExtra = '';
    if (factura.metodoPago === 'Efectivo') {
        const recibido = parseFloat(document.getElementById('monto-recibido')?.value) || factura.total;
        infoPagoExtra = `
            <p>Efectivo Recibido: $${recibido.toFixed(2)}</p>
            <p>Cambio: $${(recibido - factura.total).toFixed(2)}</p>
        `;
    } else {
        const numTarjeta = document.getElementById('num-tarjeta')?.value || '';
        const ultimosDigitos = numTarjeta.slice(-4) || '****';
        infoPagoExtra = `<p>Tarjeta Aprobada: **** **** **** ${ultimosDigitos}</p>`;
    }

    ticket.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px;">
            <h2 style="margin:0; font-size: 1.5em; color: black;">AniVerse Corp.</h2>
            <p style="margin:2px 0;">Sucursal Principal</p>
            <p style="margin:2px 0;">Fecha: ${factura.fecha}</p>
            <p style="margin:2px 0; font-weight: bold;">Ticket #${factura.numero}</p>
        </div>
        
        <div style="border-top: 1px dashed #000; border-bottom: 1px dashed #000; padding: 10px 0; margin-bottom: 10px;">
            <p style="margin:2px 0;"><strong>Cliente:</strong> ${factura.cliente}</p>
            <p style="margin:2px 0;"><strong>RTN/ID:</strong> ${factura.rtn}</p>
        </div>
        
        <div style="margin-bottom: 15px;">
            ${itemsHtml}
        </div>
        
        <div style="border-top: 1px dashed #000; padding-top: 10px; text-align: right;">
            <p style="margin:2px 0;">Subtotal: $${factura.subtotal.toFixed(2)}</p>
            <p style="margin:2px 0;">ISV (15%): $${factura.isv.toFixed(2)}</p>
            <h3 style="margin:5px 0; font-size: 1.2em; color: black;">TOTAL: $${factura.total.toFixed(2)}</h3>
        </div>
        
        <div style="border-top: 1px dashed #000; padding-top: 10px; margin-top: 10px; text-align: center; font-size: 0.9em;">
            <p style="margin:2px 0;"><strong>Método de Pago: ${factura.metodoPago.toUpperCase()}</strong></p>
            ${infoPagoExtra}
            <p style="margin-top: 15px;">¡Gracias por su preferencia!</p>
            <p>aniversecorp.com</p>
        </div>
    `;
    
    const modalFactura = document.getElementById('factura-modal');
    if (modalFactura) modalFactura.style.display = 'block';
}

function cerrarFactura() {
    const modalFactura = document.getElementById('factura-modal');
    if (modalFactura) modalFactura.style.display = 'none';
}

function imprimirFactura() {
    window.print();
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