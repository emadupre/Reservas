document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Use getAttribute and querySelector to handle the href
            const targetId = this.getAttribute('href').substring(1); // Remove the '#'
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Existing Servicios and Reservation Logic
    const serviciosContainer = document.getElementById('serviciosContainer');
    const formularioReserva = document.getElementById('formularioReserva');
    const reservaForm = document.getElementById('reservaForm');
    const tituloServicio = document.getElementById('tituloServicio');
    const cancelarReserva = document.getElementById('cancelarReserva');
    const horarioInput = document.getElementById('horario');
    const serviciosGrid = document.getElementById('serviciosGrid');
    const categoriaButtons = document.querySelectorAll('.categoria-btn');

    const serviceImages = {
        'Esmaltado Semipermanente Manos': 'src/img/uñas-manos.jpg',
        'Esmaltado Semipermanente Pies': 'src/img/uñas-pies.jpg',
        'Esmaltado Semipermanente + Capi': 'src/img/uñas-capi.jpg',
        'Softgel': 'src/img/uñas-softgel.jpg',
        'Esculpidas': 'src/img/uñas-esculpidas.jpg',
        'Depilación Axilas': 'src/img/depilacion-axilas.jpg',
        'Depilación Piernas Completas': 'src/img/depilacion-piernas.jpg',
        'Depilación Bikini Simple': 'src/img/depilacion-bikini.jpg',
        'Depilación Bikini Completo': 'src/img/depilacion-bikini-completa.jpg',
        'Depilación Rostro': 'src/img/depilacion-rostro.jpg'
    };

    // Servicios expanded 
    const servicios = [
        // Uñas
        { 
            nombre: 'Esmaltado Semipermanente Manos', 
            descripcion: 'Esmaltado duradero para manos',
            precio: '$3500',
            categoria: 'Uñas'
        },
        { 
            nombre: 'Esmaltado Semipermanente Pies', 
            descripcion: 'Esmaltado duradero para pies',
            precio: '$4000',
            categoria: 'Uñas'
        },
        { 
            nombre: 'Esmaltado Semipermanente + Capi', 
            descripcion: 'Esmaltado con tratamiento de cutículas',
            precio: '$4500',
            categoria: 'Uñas'
        },
        { 
            nombre: 'Softgel', 
            descripcion: 'Técnica de uñas con gel suave',
            precio: '$5000',
            categoria: 'Uñas'
        },
        { 
            nombre: 'Esculpidas', 
            descripcion: 'Uñas esculpidas profesionales',
            precio: '$6000',
            categoria: 'Uñas'
        },
        // Depilación
        {
            nombre: 'Depilación Axilas',
            descripcion: 'Depilación completa de axilas',
            precio: '$1500',
            categoria: 'Depilacion'
        },
        {
            nombre: 'Depilación Piernas Completas',
            descripcion: 'Depilación de piernas por completo',
            precio: '$4000',
            categoria: 'Depilacion'
        },
        {
            nombre: 'Depilación Bikini Simple',
            descripcion: 'Depilación de zona de bikini básica',
            precio: '$2000',
            categoria: 'Depilacion'
        },
        {
            nombre: 'Depilación Bikini Completo',
            descripcion: 'Depilación integral de zona de bikini',
            precio: '$3500',
            categoria: 'Depilacion'
        },
        {
            nombre: 'Depilación Rostro',
            descripcion: 'Depilación facial (bigote, mentón, etc.)',
            precio: '$1000',
            categoria: 'Depilacion'
        }
    ];

    // Initialize Swiper
    const swiper = new Swiper('.servicios-swiper', {
        slidesPerView: 'auto',
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });

    // Configurar horario
    const now = new Date();
    const minTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0);
    const maxTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 21, 0);
    
    horarioInput.min = minTime.toISOString().slice(0,16);
    horarioInput.max = maxTime.toISOString().slice(0,16);

    // Render servicios function modified according to the plan
    function renderServicios(categoria = 'todas') {
        serviciosGrid.innerHTML = '';
        
        const filteredServicios = categoria === 'todas' 
            ? servicios 
            : servicios.filter(servicio => 
                servicio.categoria.toLowerCase() === categoria.toLowerCase()
            );
        
        // Debug log to verify filtered services
        console.log(`Rendering services for category: ${categoria}`, filteredServicios);
        
        filteredServicios.forEach(servicio => {
            const card = document.createElement('div');
            card.classList.add('servicio-card');
            card.style.backgroundImage = `url('${serviceImages[servicio.nombre] || 'default-image-url'}')`;
            
            card.innerHTML = `
                <div class="servicio-card-content">
                    <h3>${servicio.nombre}</h3>
                    <p>${servicio.descripcion}</p>
                    <p><strong>Precio: ${servicio.precio}</strong></p>
                </div>
            `;
            
            card.addEventListener('click', () => mostrarFormularioReserva(servicio));
            serviciosGrid.appendChild(card);
        });

        // If no services found, show a message
        if (filteredServicios.length === 0) {
            const noServicesMessage = document.createElement('div');
            noServicesMessage.classList.add('no-services');
            noServicesMessage.textContent = 'No hay servicios disponibles en esta categoría.';
            serviciosGrid.appendChild(noServicesMessage);
        }
    }

    // Modify categoria button event listeners to use lowercase
    categoriaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoriaButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderServicios(btn.dataset.categoria.toLowerCase());
        });
    });

    renderServicios(); // Initial render

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mostrar formulario de reserva
    function mostrarFormularioReserva(servicio) {
        tituloServicio.textContent = `Reservar: ${servicio.nombre}`;
        formularioReserva.classList.remove('hidden');
        
        // Añadir una capa de overlay para desenfocar el fondo
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
    }

    // Cancelar reserva
    cancelarReserva.addEventListener('click', () => {
        formularioReserva.classList.add('hidden');
        document.querySelector('.overlay')?.remove();
        reservaForm.reset();
    });

    // Manejar envío de reserva
    reservaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const telefono = document.getElementById('telefono').value;
        const horario = document.getElementById('horario').value;
        const metodoPago = document.getElementById('metodoPago').value;
        const notas = document.getElementById('notas').value;

        // Aquí podrías agregar lógica para enviar la reserva 
        // (por ejemplo, a un backend o servicio de reservas)
        alert(`Reserva confirmada:\n
        Servicio: ${tituloServicio.textContent}\n
        Nombre: ${nombre}\n
        Teléfono: ${telefono}\n
        Horario: ${horario}\n
        Método de Pago: ${metodoPago}\n
        Notas: ${notas}`);

        // Limpiar y ocultar formulario
        reservaForm.reset();
        formularioReserva.classList.add('hidden');
        document.querySelector('.overlay')?.remove();
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
  
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('contactNombre').value;
        const telefono = document.getElementById('contactTelefono').value;
        const email = document.getElementById('contactEmail').value;
        const servicio = document.getElementById('contactServicio').value;
        const mensaje = document.getElementById('contactMensaje').value;

        // Aquí podrías agregar lógica para enviar la consulta 
        // (por ejemplo, a un backend o servicio de contacto)
        alert(`Consulta enviada:\n
        Nombre: ${nombre}\n
        Teléfono: ${telefono}\n
        Email: ${email}\n
        Servicio: ${servicio}\n
        Mensaje: ${mensaje}`);

        // Limpiar formulario
        contactForm.reset();
    });

    // About Section Animation
    const aboutSection = document.querySelector('.about-section');
    const aboutParagraphs = aboutSection.querySelectorAll('p');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    aboutParagraphs.forEach(paragraph => {
        observer.observe(paragraph);
    });
});