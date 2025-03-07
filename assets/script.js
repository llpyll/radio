// Datos de ejemplo para las noticias
const noticias = [
    {
        id: 1,
        categoria: "Política",
        titulo: "Senado aprueba nuevo presupuesto para infraestructura",
        extracto: "El Senado ha dado un paso histórico al aprobar un presupuesto de infraestructura que promete transformar significativamente el desarrollo urbano y rural del país.",
        imagen: "/api/placeholder/400/250",
        autor: "Roberto Gómez",
        tiempo: "15 de Enero, 2024",
        url: "noticias/noticia1.html"
    }
    // Puedes agregar más noticias aquí
];

// Función para crear tarjetas de noticias
function crearTarjetasNoticias() {
    const contenedorNoticias = document.getElementById('news-container');
    if (!contenedorNoticias) return;
    
    contenedorNoticias.innerHTML = '';
    noticias.forEach(noticia => {
        agregarTarjetaNoticia(noticia, contenedorNoticias);
    });
}

// Función para manejar las pestañas de categorías en el encabezado
function inicializarPestañas() {
    const pestañas = document.querySelectorAll('nav .category-tab');
    
    pestañas.forEach(pestaña => {
        pestaña.addEventListener('click', (e) => {
            e.preventDefault();
            pestañas.forEach(p => p.classList.remove('active'));
            pestaña.classList.add('active');
            
            const categoriaSeleccionada = pestaña.getAttribute('data-category');
            const contenedorNoticias = document.getElementById('news-container');
            contenedorNoticias.innerHTML = '';
            
            if (categoriaSeleccionada === 'Todas') {
                noticias.forEach(noticia => {
                    agregarTarjetaNoticia(noticia, contenedorNoticias);
                });
            } else {
                const noticiasFiltradas = noticias.filter(noticia => 
                    noticia.categoria === categoriaSeleccionada
                );
                
                if (noticiasFiltradas.length === 0) {
                    const mensaje = document.createElement('div');
                    mensaje.className = 'no-news-message';
                    mensaje.textContent = `No hay noticias disponibles en la categoría ${categoriaSeleccionada}`;
                    contenedorNoticias.appendChild(mensaje);
                } else {
                    noticiasFiltradas.forEach(noticia => {
                        agregarTarjetaNoticia(noticia, contenedorNoticias);
                    });
                }
            }
        });
    });
}

// Función auxiliar para crear y añadir una tarjeta de noticia
function agregarTarjetaNoticia(noticia, contenedor) {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'news-card';
    
    tarjeta.innerHTML = `
        <a href="${noticia.url}" class="news-link">
            <div class="news-image" style="background-image: url('${noticia.imagen}');"></div>
            <div class="news-content">
                <span class="news-category">${noticia.categoria}</span>
                <h3 class="news-title">${noticia.titulo}</h3>
                <p class="news-excerpt">${noticia.extracto}</p>
                <div class="news-meta">
                    <span>Por: ${noticia.autor}</span>
                    <span>${noticia.tiempo}</span>
                </div>
            </div>
        </a>
    `;
    
    contenedor.appendChild(tarjeta);
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    crearTarjetasNoticias();
    inicializarPestañas();
    
    const formularioNewsletter = document.querySelector('.newsletter-form');
    if (formularioNewsletter) {
        formularioNewsletter.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = formularioNewsletter.querySelector('input[type="email"]').value;
            console.log(`Email suscrito: ${email}`);
            alert(`¡Gracias por suscribirte! Te has registrado correctamente con el email: ${email}`);
            formularioNewsletter.reset();
        });
    }
});