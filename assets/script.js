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
    // Agrega más noticias aquí con la misma estructura cuando sea necesario
];

// Función para crear tarjetas de noticias
function crearTarjetasNoticias() {
    const contenedorNoticias = document.getElementById('news-container');
    if (!contenedorNoticias) {
        console.error("El contenedor de noticias no se encontró en el DOM.");
        return;
    }
    
    contenedorNoticias.innerHTML = ''; // Limpia el contenedor
    noticias.forEach(noticia => {
        agregarTarjetaNoticia(noticia, contenedorNoticias);
    });
}

// Función para manejar las pestañas de categorías
function inicializarPestañas() {
    const pestañas = document.querySelectorAll('.category-tab');
    if (pestañas.length === 0) {
        console.error("No se encontraron pestañas de categorías en el DOM.");
        return;
    }
    
    pestañas.forEach(pestaña => {
        pestaña.addEventListener('click', () => {
            // Remover clase 'active' de todas las pestañas
            pestañas.forEach(p => p.classList.remove('active'));
            // Añadir clase 'active' a la pestaña seleccionada
            pestaña.classList.add('active');
            
            const categoriaSeleccionada = pestaña.textContent.trim();
            const contenedorNoticias = document.getElementById('news-container');
            if (!contenedorNoticias) return;
            
            contenedorNoticias.innerHTML = ''; // Limpia el contenedor
            
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
    // Mostrar todas las noticias al cargar la página
    crearTarjetasNoticias();
    
    // Inicializar las pestañas de categorías
    inicializarPestañas();
    
    // Manejar el formulario de newsletter
    const formularioNewsletter = document.querySelector('.newsletter-form');
    if (formularioNewsletter) {
        formularioNewsletter.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = formularioNewsletter.querySelector('input[type="email"]');
            if (!emailInput) {
                console.error("No se encontró el campo de email en el formulario.");
                return;
            }
            
            const email = emailInput.value.trim();
            if (email === '') {
                alert('Por favor, ingresa un email válido.');
                return;
            }
            
            console.log(`Email suscrito: ${email}`);
            alert(`¡Gracias por suscribirte! Te has registrado correctamente con el email: ${email}`);
            formularioNewsletter.reset();
        });
    } else {
        console.warn("El formulario de newsletter no se encontró en el DOM.");
    }
});