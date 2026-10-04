const productosBase = [
    { id: 1, nombre: "Figura Luffy Gear 5", categoria: "Figuras Coleccionables", descripcion: "Figura detallada 25cm One Piece", precio: 85.00, stock: 10, requiere_receta: false, imagen_url: "img/figure-luffy.jpg" },
    { id: 2, nombre: "Katana Metalica Nichirin Tanjiro", categoria: "Accesorio y Katanas", descripcion: "Réplica coleccionable acero de alto carbono", precio: 120.00, stock: 4, requiere_receta: true, imagen_url: "img/katana-tanjiro.jpg" },
    { id: 3, nombre: "Manga Chainsaw Man Vol. 1", categoria: "Mangas y Cómics", descripcion: "Tomo 1 en español editorial oficial", precio: 15.00, stock: 25, requiere_receta: false, imagen_url: "img/manga-chainsaw.jpg" },
    { id: 4, nombre: "Capa Akatsuki Naruto", categoria: "Cosplay y Ropa", descripcion: "Capa de tela bordada alta calidad", precio: 45.00, stock: 12, requiere_receta: false, imagen_url: "img/capa-akatsuki.jpg" },
    { id: 5, nombre: "Figura Gojo Satoru", categoria: "Figuras Coleccionables", descripcion: "Figura detallada de alta calidad Jujutsu Kaisen", precio: 90.00, stock: 8, requiere_receta: false, imagen_url: "img/figure-gojo.jpg" },
    { id: 6, nombre: "Figura All Might", categoria: "Figuras Coleccionables", descripcion: "Figura de colección My Hero Academia", precio: 70.00, stock: 5, requiere_receta: false, imagen_url: "img/figure-All-Might.jpg" },
    { id: 7, nombre: "Figura Anya Forger", categoria: "Figuras Coleccionables", descripcion: "Figura Spy x Family", precio: 40.00, stock: 15, requiere_receta: false, imagen_url: "img/figure-anya.jpg" },
    { id: 8, nombre: "Figura Eren Jaeger", categoria: "Figuras Coleccionables", descripcion: "Figura Attack on Titan", precio: 80.00, stock: 6, requiere_receta: false, imagen_url: "img/figure-eren.jpg" },
    { id: 9, nombre: "Figura Goku Super Saiyan 4", categoria: "Figuras Coleccionables", descripcion: "Figura Dragon Ball GT", precio: 95.00, stock: 7, requiere_receta: false, imagen_url: "img/figure-goku-ss4.jpg" },
    { id: 10, nombre: "Figura Ichigo Bankai", categoria: "Figuras Coleccionables", descripcion: "Figura Bleach Thousand-Year Blood War", precio: 85.00, stock: 9, requiere_receta: false, imagen_url: "img/figure-ichigo-bankai.jpg" },
    { id: 11, nombre: "Figura Levi Ackerman", categoria: "Figuras Coleccionables", descripcion: "Figura detallada Capitán Levi", precio: 88.00, stock: 4, requiere_receta: false, imagen_url: "img/figure-levi.jpg" },
    { id: 12, nombre: "Figura Naruto Modo Barion", categoria: "Figuras Coleccionables", descripcion: "Figura coleccionable Boruto / Naruto", precio: 100.00, stock: 5, requiere_receta: false, imagen_url: "img/figure-naruto-barion.jpg" },
    { id: 13, nombre: "Figura Nezuko Kamado", categoria: "Figuras Coleccionables", descripcion: "Figura Demon Slayer", precio: 65.00, stock: 10, requiere_receta: false, imagen_url: "img/figure-nezuko.jpg" },
    { id: 14, nombre: "Figura Rem Re:Zero", categoria: "Figuras Coleccionables", descripcion: "Figura escala Re:Zero", precio: 75.00, stock: 8, requiere_receta: false, imagen_url: "img/figure-rem.jpg" },
    { id: 15, nombre: "Figura Saitama", categoria: "Figuras Coleccionables", descripcion: "Figura One Punch Man", precio: 60.00, stock: 12, requiere_receta: false, imagen_url: "img/figure-saitama.jpg" },
    { id: 16, nombre: "Figura Vegeta Majin", categoria: "Figuras Coleccionables", descripcion: "Figura Dragon Ball Z", precio: 90.00, stock: 6, requiere_receta: false, imagen_url: "img/figure-vegeta-M.jpg" },
    { id: 17, nombre: "Figura Roronoa Zoro", categoria: "Figuras Coleccionables", descripcion: "Figura One Piece 3 Espadas", precio: 85.00, stock: 8, requiere_receta: false, imagen_url: "img/figure-zoro.jpg" },
    { id: 18, nombre: "Manga Berserk", categoria: "Mangas y Cómics", descripcion: "Tomo de colección Berserk", precio: 18.00, stock: 20, requiere_receta: false, imagen_url: "img/manga-berserk.jpg" },
    { id: 19, nombre: "Manga Blue Lock", categoria: "Mangas y Cómics", descripcion: "Tomo oficial Blue Lock", precio: 14.00, stock: 15, requiere_receta: false, imagen_url: "img/manga-blue-lock.jpg" },
    { id: 20, nombre: "Manga Demon Slayer", categoria: "Mangas y Cómics", descripcion: "Tomo Kimetsu no Yaiba", precio: 14.00, stock: 18, requiere_receta: false, imagen_url: "img/manga-demon-slayer.jpg" },
    { id: 21, nombre: "Manga Haikyu!!", categoria: "Mangas y Cómics", descripcion: "Tomo oficial Haikyu!!", precio: 13.50, stock: 22, requiere_receta: false, imagen_url: "img/manga-haikyuu.jpg" },
    { id: 22, nombre: "Manga Spy x Family", categoria: "Mangas y Cómics", descripcion: "Tomo oficial Spy x Family", precio: 13.00, stock: 25, requiere_receta: false, imagen_url: "img/manga-spyfamily.jpg" },
    { id: 23, nombre: "Poster Eren Jaeger", categoria: "Decoración y Pósters", descripcion: "Póster decorativo Attack on Titan", precio: 10.00, stock: 30, requiere_receta: false, imagen_url: "img/poster-eren.jpg" },
    { id: 24, nombre: "Poster Ichigo Kurosaki", categoria: "Decoración y Pósters", descripcion: "Póster decorativo Bleach", precio: 10.00, stock: 30, requiere_receta: false, imagen_url: "img/poster-ichigo.jpg" },
    { id: 25, nombre: "Poster Pochita", categoria: "Decoración y Pósters", descripcion: "Póster decorativo Chainsaw Man", precio: 8.00, stock: 35, requiere_receta: false, imagen_url: "img/poster-pochita.jpg" },
    { id: 26, nombre: "Llavero Espada Kirito", categoria: "Accesorios y Bisutería", descripcion: "Llavero metálico Sword Art Online", precio: 7.50, stock: 40, requiere_receta: false, imagen_url: "img/llavero-espada-kirito.jpg" },
    { id: 27, nombre: "Llavero Sukuna", categoria: "Accesorios y Bisutería", descripcion: "Llavero metálico Jujutsu Kaisen", precio: 7.00, stock: 35, requiere_receta: false, imagen_url: "img/llavero-sukuna.jpg" },
    { id: 28, nombre: "Kunai Naruto", categoria: "Accesorio y Katanas", descripcion: "Réplica coleccionable Kunai", precio: 15.00, stock: 20, requiere_receta: false, imagen_url: "img/kunai.jpg" }
];

document.addEventListener('DOMContentLoaded', () => {
    inicializarInventario();
    listarProductos();
    listarMiembrosVIP();
    listarFacturas();
    listarProblemasEnvio();
    listarStockCritico();
    listarPedidosEspeciales();

    const formProducto = document.getElementById('form-producto');
    if (formProducto) {
        formProducto.addEventListener('submit', guardarProducto);
    }
});

function cambiarTab(tab) {
    const tabs = ['inventario', 'vip', 'facturas', 'pagos', 'encargos', 'encargos_med'];
    tabs.forEach(t => {
        const sec = document.getElementById(`sec-${t}`);
        const btn = document.getElementById(`tab-${t}`);
        if (sec) sec.style.display = (t === tab) ? 'block' : 'none';
        if (btn) btn.classList.toggle('active', t === tab);
    });
}

function inicializarInventario() {
    if (!localStorage.getItem('productos')) {
        localStorage.setItem('productos', JSON.stringify(productosBase));
    }
}

function listarProductos() {
    const tabla = document.getElementById('tabla-inventario');
    if (!tabla) return;

    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    tabla.innerHTML = '';

    productos.forEach(p => {
        tabla.innerHTML += `
            <tr>
                <td><img src="${p.imagen_url}" alt="${p.nombre}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"></td>
                <td><strong>${p.nombre}</strong><br><small>${p.descripcion}</small></td>
                <td>${p.categoria}</td>
                <td>$${parseFloat(p.precio).toFixed(2)}</td>
                <td>${p.stock}</td>
                <td>${p.requiere_receta ? 'Sí' : 'No'}</td>
                <td>
                    <button onclick="editarProducto(${p.id})" style="background:#ffa502; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;">Editar</button>
                    <button onclick="eliminarProducto(${p.id})" style="background:#ff4757; color:white; border:none; padding:5px 8px; border-radius:4px; cursor:pointer;">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function guardarProducto(e) {
    e.preventDefault();

    const id = document.getElementById('prod-id').value;
    const nombre = document.getElementById('prod-nombre').value.trim();
    const categoria = document.getElementById('prod-categoria').value;
    const descripcion = document.getElementById('prod-descripcion').value.trim();
    const precio = parseFloat(document.getElementById('prod-precio').value);
    const stock = parseInt(document.getElementById('prod-stock').value);
    const imagen_url = document.getElementById('prod-imagen').value;
    const requiere_receta = document.getElementById('prod-receta').checked;

    let productos = JSON.parse(localStorage.getItem('productos')) || [];

    if (id) {
        const index = productos.findIndex(p => p.id == id);
        if (index !== -1) {
            productos[index] = { id: parseInt(id), nombre, categoria, descripcion, precio, stock, requiere_receta, imagen_url };
        }
    } else {
        const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;
        productos.push({ id: nuevoId, nombre, categoria, descripcion, precio, stock, requiere_receta, imagen_url });
    }

    localStorage.setItem('productos', JSON.stringify(productos));
    limpiarFormulario();
    listarProductos();
    listarStockCritico();
    mostrarMensaje('Producto guardado correctamente');
}

function editarProducto(id) {
    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const p = productos.find(prod => prod.id == id);

    if (p) {
        document.getElementById('prod-id').value = p.id;
        document.getElementById('prod-nombre').value = p.nombre;
        document.getElementById('prod-categoria').value = p.categoria;
        document.getElementById('prod-descripcion').value = p.descripcion;
        document.getElementById('prod-precio').value = p.precio;
        document.getElementById('prod-stock').value = p.stock;
        document.getElementById('prod-imagen').value = p.imagen_url;
        document.getElementById('prod-receta').checked = p.requiere_receta;

        document.getElementById('form-titulo').textContent = 'Editar Producto';
        document.getElementById('btn-cancelar').style.display = 'inline-block';
    }
}

function eliminarProducto(id) {
    if (confirm('¿Estás seguro de eliminar este producto del inventario?')) {
        let productos = JSON.parse(localStorage.getItem('productos')) || [];
        productos = productos.filter(p => p.id != id);
        localStorage.setItem('productos', JSON.stringify(productos));
        listarProductos();
        listarStockCritico();
        mostrarMensaje('Producto eliminado');
    }
}

function limpiarFormulario() {
    document.getElementById('form-producto').reset();
    document.getElementById('prod-id').value = '';
    document.getElementById('form-titulo').textContent = 'Añadir Producto al Inventario';
    document.getElementById('btn-cancelar').style.display = 'none';
}

function guardarMiembroVIP(e) {
    if (e) e.preventDefault();

    const dni = document.getElementById('vip-dni').value.trim();
    const nombre = document.getElementById('vip-nombre').value.trim();
    const porcentaje = parseFloat(document.getElementById('vip-descuento').value);

    if (!dni || !nombre || isNaN(porcentaje)) {
        alert('Por favor completa todos los campos correctamente.');
        return;
    }

    let miembrosVIP = JSON.parse(localStorage.getItem('miembrosVIP')) || [];

    const existe = miembrosVIP.some(m => m.dni === dni);
    if (existe) {
        alert('Este DNI ya está registrado como Miembro VIP.');
        return;
    }

    miembrosVIP.push({ dni, nombre, porcentaje });
    localStorage.setItem('miembrosVIP', JSON.stringify(miembrosVIP));

    document.getElementById('vip-dni').value = '';
    document.getElementById('vip-nombre').value = '';
    document.getElementById('vip-descuento').value = '15';

    listarMiembrosVIP();
    mostrarMensaje('Miembro VIP registrado con éxito');
}

function listarMiembrosVIP() {
    const tabla = document.getElementById('tabla-vip');
    if (!tabla) return;

    let miembrosVIP = JSON.parse(localStorage.getItem('miembrosVIP')) || [];
    tabla.innerHTML = '';

    miembrosVIP.forEach((m, index) => {
        tabla.innerHTML += `
            <tr>
                <td><strong>${m.dni}</strong></td>
                <td>${m.nombre}</td>
                <td>${m.porcentaje}%</td>
                <td>
                    <button onclick="eliminarVIP(${index})" class="btn-eliminar-vip">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function eliminarVIP(index) {
    let miembrosVIP = JSON.parse(localStorage.getItem('miembrosVIP')) || [];
    miembrosVIP.splice(index, 1);
    localStorage.setItem('miembrosVIP', JSON.stringify(miembrosVIP));
    listarMiembrosVIP();
}

function listarFacturas() {
    const tabla = document.getElementById('tabla-facturas');
    if (!tabla) return;

    const facturas = JSON.parse(localStorage.getItem('facturas')) || [];
    tabla.innerHTML = '';

    facturas.forEach(f => {
        // Extraer y formatear los productos si existen en la factura
        let detallesProductos = 'N/A';
        if (f.productos && f.productos.length > 0) {
            detallesProductos = f.productos.map(p => `${p.nombre} <strong>(x${p.cantidad})</strong>`).join('<br>');
        }
        
        // Manejar el caso de facturas antiguas que no tenían dirección guardada
        const direccionEnvio = f.direccion ? f.direccion : 'No especificada';

        tabla.innerHTML += `
            <tr>
                <td>#${f.numero}</td>
                <td>${f.fecha}</td>
                <td>${f.cliente}</td>
                <td>${direccionEnvio}</td> <!-- NUEVA CELDA AQUÍ -->
                <td>${detallesProductos}</td> 
                <td>$${parseFloat(f.subtotal).toFixed(2)}</td>
                <td>$${parseFloat(f.isv).toFixed(2)}</td>
                <td><strong>$${parseFloat(f.total).toFixed(2)}</strong></td>
                <td>${f.metodoPago}</td>
            </tr>
        `;
    });
}

function listarProblemasEnvio() {
    const tabla = document.getElementById('tabla-problemas');
    if (!tabla) return;

    const reportes = JSON.parse(localStorage.getItem('problemasEnvio')) || [];
    tabla.innerHTML = '';

    reportes.forEach(r => {
        tabla.innerHTML += `
            <tr>
                <td>#${r.id}</td>
                <td>${r.cliente}</td>
                <td>${r.correo}</td>
                <td>${r.descripcion}</td>
            </tr>
        `;
    });
}

function listarStockCritico() {
    const tabla = document.getElementById('tabla-encargos-criticos');
    if (!tabla) return;

    const productos = JSON.parse(localStorage.getItem('productos')) || [];
    const criticos = productos.filter(p => p.stock <= 5);
    tabla.innerHTML = '';

    criticos.forEach(p => {
        tabla.innerHTML += `
            <tr>
                <td><img src="${p.imagen_url}" alt="${p.nombre}" style="width: 40px; height: 40px; object-fit: cover;"></td>
                <td>${p.nombre}</td>
                <td>${p.categoria}</td>
                <td><strong style="color:#ff4757;">${p.stock}</strong></td>
                <td><span style="background:#ff4757; color:white; padding:2px 6px; border-radius:3px; font-size:0.8em;">ALTA</span></td>
            </tr>
        `;
    });
}

function listarPedidosEspeciales() {
    const tabla = document.getElementById('tabla-encargos-especiales');
    if (!tabla) return;

    const pedidos = JSON.parse(localStorage.getItem('pedidosEspeciales')) || [];
    tabla.innerHTML = '';

    pedidos.forEach(p => {
        tabla.innerHTML += `
            <tr>
                <td>#${p.id}</td>
                <td>${p.cliente} (${p.contacto})</td>
                <td>${p.articulo}</td>
                <td>${p.cantidad}</td>
                <td>${p.notas}</td>
                <td>${p.estado}</td>
            </tr>
        `;
    });
}

function mostrarMensaje(texto) {
    const msgDiv = document.getElementById('msg');
    if (msgDiv) {
        msgDiv.textContent = texto;
        msgDiv.classList.remove('oculto');
        setTimeout(() => {
            msgDiv.classList.add('oculto');
        }, 3000);
    }
}

document.getElementById('btn-cargar-carpeta').addEventListener('click', async () => {
    try {
        // Abre la ventana para seleccionar la carpeta img
        const dirHandle = await window.showDirectoryPicker();
        const select = document.getElementById('prod-imagen');
        
        // Limpia el select dejando solo la primera opción
        select.innerHTML = '<option value="">-- Selecciona una imagen --</option>';

        // Recorre y agrega cada imagen encontrada en la carpeta
        for await (const entry of dirHandle.values()) {
            if (entry.kind === 'file' && /\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) {
                const option = document.createElement('option');
                option.value = `img/${entry.name}`;
                option.textContent = entry.name;
                select.appendChild(option);
            }
        }

        alert('¡Imágenes cargadas correctamente!');
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Error al acceder a la carpeta:', err);
            alert('No se pudo acceder a la carpeta o el navegador no soporta esta función.');
        }
    }
});