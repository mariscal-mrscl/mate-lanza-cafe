@echo off
rem LANZA Lab en Windows: doble clic. Levanta un servidor local en esta carpeta y abre la portada.
cd /d "%~dp0"
set PY=
where py >nul 2>nul && set PY=py
if not defined PY where python >nul 2>nul && set PY=python
if not defined PY (
  echo No encontre Python. Instalalo desde https://www.python.org/downloads/ o desde Microsoft Store y volve a abrir este archivo.
  pause
  exit /b
)
start "LANZA Lab - servidor" /min %PY% -m http.server 8777
timeout /t 2 /nobreak >nul
start "" http://localhost:8777/
echo LANZA Lab abierto en http://localhost:8777/
echo Para instalarlo: espera "Lista para usar sin internet" y toca "Instalar LANZA Lab".
echo Cuando termines, cerra la ventana minimizada "LANZA Lab - servidor".
timeout /t 8 >nul
