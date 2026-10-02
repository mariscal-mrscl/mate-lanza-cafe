#!/bin/bash
# LANZA Lab en Mac: doble clic. Levanta un servidor local en esta carpeta y abre la portada.
# La primera vez macOS puede pedir permiso: clic derecho → Abrir.
cd "$(dirname "$0")"
PORT=8777
if ! lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  python3 -m http.server $PORT >/dev/null 2>&1 &
  SRV=$!
  sleep 1
fi
open "http://localhost:$PORT/"
echo "LANZA Lab abierto en http://localhost:$PORT/"
echo "Para instalarlo: esperá «Lista para usar sin internet» y tocá «Instalar LANZA Lab»."
echo "Cuando termines, cerrá esta ventana."
[ -n "$SRV" ] && wait $SRV
