# LANZA · labs

Herramientas para armar las piezas de LANZAPOST. Todo corre en el navegador: el material no se sube a ningún lado.

- **index.html**: portada con los dos labs y el botón para instalarlos como app.
- **LANZA_ASCII_LAB.html**: ASCII, palabra, dither y campo de lanzas sobre fotos y videos, con montaje por match cut, grilla BPM y exportación MP4.
- **LANZA_TD_LAB.html**: 22 estilos a la TouchDesigner en WebGL con 6 parámetros cada uno y velocidad por capa (túnel de feedback, feedback líquido, pantalla en pantalla, desplazamiento, cámara en mano, barrido, slit-scan, eco temporal, láminas, prisma, haces de luz, trama, matriz LED, nube de puntos, líneas Rutt-Etra, campo de agujas, esfera, malla 3D, partículas, seguimiento, red de datos, HUD), hasta 3 capas (cualquiera se puede apagar sin perder su memoria, reordenar, ver sola o encadenar para que procese lo de abajo) con un fade general del efecto, panel ASCII, controles de luz, separación de figura y fondo (IA, luz o movimiento, con pincel de corrección), keyframes y grabación de gestos en vivo (lo que movés mientras corre queda escrito cuadro a cuadro), desfase del reloj del efecto respecto del clip, controles de clip (velocidad, entrada y salida, repetir, ida y vuelta o congelar), duración por largo del clip × vueltas, en segundos o por un tramo elegido de la canción (con su forma de onda), exportación repetida con el efecto corriendo de largo, señal limpia (pantalla completa o ventana aparte), cámara en vivo como fuente, micrófono en vivo para que el efecto siga el sonido y máscara de salida (rectángulo, elipse o polígono editable, animable con keyframes). Mismo flujo: grilla BPM, música, encuadres, logo y cierre, exportación MP4 cuadro por cuadro a 24 fps.

## Usarlo como app

Publicado con https (GitHub Pages) o servido desde `localhost`, la portada ofrece **Instalar LANZA Lab** (Chrome y Edge; en iPhone/iPad: Safari → Compartir → Agregar a inicio). Instalada, abre en su propia ventana y funciona sin internet.

- `manifest.webmanifest` e `icons/`: nombre, íconos y accesos directos a cada lab.
- `sw.js`: guarda la app en la compu. Las páginas se piden primero a la red (así llegan los cambios); librerías, tipografías, íconos y el video de muestra salen de lo guardado. Si cambiás algo que no sea una página, subí `VERSION` en `sw.js`.
- `vendor/`: TensorFlow.js, mp4-muxer y las tipografías, para no depender de internet (ver `vendor/README.md`). Si faltan, los labs usan la versión de internet.
- `muestras/paraASCII-001.mp4`: video de muestra del TD Lab.

## Publicar con un dominio (GitHub Pages)

1. Settings → Pages → Deploy from a branch → la rama publicada, carpeta `/ (root)`.
2. Custom domain: el dominio o subdominio (crea el archivo `CNAME`).
3. En el DNS: un registro CNAME a `mariscal-mrscl.github.io` (subdominio) o los cuatro A `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (dominio pelado).
4. Cuando propague, activar Enforce HTTPS.

Para usarlo desde la compu sin publicar: doble clic en **Abrir LANZA Lab.command** (Mac) o **Abrir LANZA Lab.bat** (Windows). Levanta un servidor local en `http://localhost:8777/` y abre la portada; desde ahí se instala. A mano: `python3 -m http.server 8777` en esta carpeta.
