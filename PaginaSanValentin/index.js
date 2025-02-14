document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('song');
    const loader = document.querySelector('.loader');
    const lyrics = document.querySelectorAll('.lyric-line');
  
    // Array con los tiempos en segundos para cada línea de la letra
    const lyricTimes = [
      0,      // "Quiero"
      2.5,    // "Parar un momento"
      6.5,    // "Soñar que estoy dentro"
      11.5,   // "De tus ojos"
      15.5,   // "Quiero"
      18.5,   // "Soñar que te beso"
      22.5,   // "Después darme cuenta"
      24.5,   // "Que sigo despierto"
      26,     // "Y no me la creo"
      31,     // "Que tú estás aquí"
      34.5,   // "Simulando que no dices nada"
      39,     // "Y yo siento así"
      42.5,   // "Diez mil palabras"
      47,     // "Yo no te pido que seas normal..."
      51,     // "Que seas intensa cuando amanezca"
      53,     // "Que estés tan loca como tú quieras"
      55,     // "Como tú sientas, como tú estés"
      57.5,     // "Como tú sepas que solo eres tú"
      63,     // "Que digas todo sin preguntar..."
      67,     // "Que tengas miedo cuando te asustes"
      69,     // "Que sueltes lágrimas si te lucen"
      71,     // "Que rompas todo si es necesario"
      73,     // "Los dos estamos para arreglarlo"
      75,     // "Que a mí me gustas tal como eres"
      77,     // "A mí me gustas tal como estás"
      79,     // "Es la verdad"
      81.5,   // "Así"
      82.5,   // "Sin maquillar"
      87,     // "Es la verdad"
      89.5,   // "Así"
      90.5,   // "Sin maquillar"
      95,     // "Feliz San Valentin Mi Niña :3"
      99,      // "Eres la persona más especial en mi vida y quiero decirte cuánto te amo"
      106,     // "Gracias por estar a mi lado y hacer cada día más hermoso"
      110,     //"Desde el momento en que nuestras miradas se cruzaron, supe que había encontrado a alguien verdaderamente especial. Cada día a tu lado ha sido un regalo, y con cada sonrisa tuya, mi corazón se llena de una alegría indescriptible"
      123,    //"Admiro tu fortaleza, tu bondad y la forma en que haces que todo a tu alrededor brille. Mi amor por ti crece con cada día que pasa, y estoy agradecido por cada momento que compartimos"
      133,    //"Quiero que sepas que siempre estaré aquí para ti, para apoyarte, amarte y cuidarte. Eres la luz de mi vida y la razón de mis sonrisas. No hay palabras suficientes para describir lo mucho que significas para mí"
      143,    //"Te amo más de lo que las palabras pueden expresar y siempre te amaré mi niña bonita"
      160,   
    ];

    // Verifica que el audio y el loader existan
    if (!audio || !loader) return;

    const hideLoader = () => {
        loader.style.display = 'none';
        document.body.classList.remove("not-loaded");
    };

    audio.addEventListener('loadeddata', hideLoader); // Cuando los datos iniciales están cargados
    audio.addEventListener('canplay', hideLoader); // Cuando puede reproducirse
    audio.addEventListener('canplaythrough', hideLoader); // Cuando puede reproducirse sin interrupciones
    
    // 2. Timeout de respaldo por si falla la carga
    const backupTimeout = setTimeout(hideLoader, 5000); // 5 segundos máximo
    
    // 3. Manejar errores
    audio.addEventListener('error', () => {
        clearTimeout(backupTimeout);
        hideLoader();
    });

    let isPlaying = false;
    const handlePlayPause = () => {
        if (!isPlaying) {
            audio.play().catch(err => console.log("Esperando interacción..."));
            isPlaying = true;
        } else {
            audio.pause();
            isPlaying = false;
        }
    };
    
    // Agregar ambos tipos de eventos para móvil/desktop
    document.body.addEventListener('click', handlePlayPause);
    document.body.addEventListener('touchstart', handlePlayPause);

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        lyrics.forEach((lyric, index) => {
            if (currentTime >= lyricTimes[index] && currentTime < lyricTimes[index + 1]) {
                lyric.classList.add('active');
    
                if (index > 0) {
                    lyrics[index - 1].classList.remove('active');
                    lyrics[index - 1].classList.add('exit');
                }
            } else {
                lyric.classList.remove('active');
                lyric.classList.remove('exit');
            }
        });
    });
});

  
  
  
