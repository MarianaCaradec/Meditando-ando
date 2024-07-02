// Inicialización
const darBienvenida = () => {
    Swal.fire({
        title: "¡Bienvenidx!",
        imageUrl: "./img/logo.png",
        imageWidth: 80,
        imageHeight: 70,
        imageAlt: "Logo",
        text: "¿Listx para reunirte con tu paz interior?",
        width: "60%",
        background: "#B865B8",
        backdrop: "#B865B8",
        allowOutsideClick: true,
        allowEnterKey: true,
    });
};

// Manejo del DOM
let seccionesMeditaciones = document.querySelector('.secciones-meditaciones');
let meditacionElegida = document.querySelector('.meditacion-elegida');
let timerMeditacion = document.getElementById('timer');
let startButton = document.getElementById('startbtn');
let pauseButton = document.getElementById('pausebtn');

// Declaración de variables necesarias
let timer;
let isRunning = false;
let minutes = 0;
let seconds = 0;


// Crear div de cada meditación
const meditaciones = [
    {
        titulo: 'Meditación mindfulness',
        iframe: {
            style: 'border-radius:12px',
            src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZqd5JICZI0u?utm_source=generator&theme=0',
            width: '100%',
            height: '152',
            frameBorder: '0',
            allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
            loading: 'lazy'
        },
        boton: 'Utilizar esta playlist'
    },
    {
        titulo: 'Meditación guiada',
        iframe: {
            style: 'border-radius:12px',
            src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DWZKyP0tcxlDn?utm_source=generator&theme=0',
            width: '100%',
            height: '152',
            frameBorder: '0',
            allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
            loading: 'lazy'
        },
        boton: 'Utilizar esta playlist'
    },
    {
        titulo: 'Cuencos tibetanos',
        iframe: {
            style: 'border-radius:12px',
            src: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX57hHpm3vGiU?utm_source=generator&theme=0',
            width: '100%',
            height: '152',
            frameBorder: '0',
            allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
            loading: 'lazy'
        },
        boton: 'Utilizar esta playlist'
    },
    {
        titulo: 'Meditación cimática con mantras',
        iframe: {
            style: 'border-radius:12px',
            src: 'https://open.spotify.com/embed/album/1CikRyBaWALgQpA6li1pNh?utm_source=generator&theme=0',
            width: '100%',
            height: '152',
            frameBorder: '0',
            allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
            loading: 'lazy'
        },
        boton: 'Utilizar esta playlist'
    },
    {
        titulo: 'Meditación de los 7 chakras con mantras',
        iframe: {
            style: 'border-radius:12px',
            src: 'https://open.spotify.com/embed/album/7B94qrIFbxZdo08FXKFnDb?utm_source=generator&theme=0',
            width: '100%',
            height: '152',
            frameBorder: '0',
            allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
            loading: 'lazy'
        },
        boton: 'Utilizar esta playlist'
    },
    {
        titulo: 'Meditación (30 minutos) para sanar',
        iframe: {
            src: 'https://www.youtube.com/embed/VFXI9HPWQvk?si=JuYVR6Xk6JLINLSE',
            width: '560',
            height: '315',
            frameBorder: '0',
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; fullscreen; picture-in-picture; web-share',
            referrerPolicy: 'strict-origin-when-cross-origin'
        },
        boton: 'Mirar este video'
    }
]

// Crear div selección de meditación
const crearOpcionesMeditaciones = () => {
    meditacionElegida.style.display = 'none';
    meditaciones.forEach(meditacion => {
        const opcion = document.createElement('div');
        opcion.classList = 'meditacion';
        opcion.innerHTML = `
                            <h3>${meditacion.titulo}</h3>
                            <button>${meditacion.boton}</button>
                            `
        const boton = opcion.querySelector('button');
        boton.classList = 'boton-playlist';
        boton.addEventListener('click', () => crearMeditacion(meditacion));

        seccionesMeditaciones.appendChild(opcion)
    })
}


// Crear divs para cada meditación
const crearMeditacion = (meditacion) => {
        meditacionElegida.style.display = 'block';

        const seccion = document.createElement('div');
        seccion.classList = 'meditacion-elegida';

        const title = document.createElement('h3');
        title.textContent = meditacion.titulo;
        title.classList = 'titulo-elegido';
        
        const iframe = document.createElement('iframe');
        iframe.style = meditacion.iframe.style;
        iframe.src = meditacion.iframe.src;
        iframe.width = meditacion.iframe.width;
        iframe.height = meditacion.iframe.height;
        iframe.allow = meditacion.iframe.allow;
        iframe.loading = meditacion.iframe.loading;
        iframe.classList = 'iframe';
        
        seccion.appendChild(title)
        seccion.appendChild(iframe)

        meditacionElegida.appendChild(seccion)
        seccionesMeditaciones.style.display = 'none'
}

const esconderTimer = () => {
    const iframe = meditacionElegida.querySelector('iframe');
    if (iframe && iframe.src === 'https://www.youtube.com/embed/VFXI9HPWQvk?si=JuYVR6Xk6JLINLSE') {
        timerMeditacion.style.display = 'none';
    }
}


// Creación del temporizador
const crearTimer = () => {
    timerMeditacion.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    seconds++;

    if(seconds >= 60){
        seconds = 0;
        minutes++;
    }

    if (minutes >= 10) {
        stopTimer();
    }
}

// Lógica de inicio del temporizador
const startTimer = () => {
    if (!isRunning){
        timer = setInterval(crearTimer, 1000);
        isRunning = true;
        startButton.disabled = true;
    }
}

// Pausar al terminar el temporizador
const pauseTimer = () => {
        clearInterval(timer);
        isRunning = false;
        startButton.disabled = false;
}

// Lógica de finalización del temporizador
const stopTimer = () => {
    if(isRunning){
        clearInterval(timer);
        isRunning = false;
        startButton.disabled = false;
        minutes = 0;
        seconds = 0;
        timerMeditacion.textContent = '00:00';
        Swal.fire({
            icon: "success",
            position: "top-end",
            toast: false,
            title: "Has terminado la meditación del día de hoy, ¡felicitaciones!",
            showConfirmButton: false,
            timer: 2000,
            });
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);


if(seccionesMeditaciones) {
    darBienvenida()
    crearOpcionesMeditaciones()
} else{
    esconderTimer()
}
