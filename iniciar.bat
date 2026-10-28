@echo off
title Con Yesion Aprendes - Tutor Educativo IA
cd /d "%~dp0"

echo ======================================================
echo       Iniciando Con Yesion Aprendes (IA)
echo ======================================================
echo.
echo 1. Abriendo la aplicacion interactiva en tu navegador...
start http://localhost:3000

echo 2. Iniciando el servidor local...
echo (Manten esta ventanita abierta mientras uses la plataforma)
echo.

if exist "C:\Users\mrtro\AppData\Local\Programs\nodejs-portable\node-v24.22.1-win-x64\node.exe" (
    "C:\Users\mrtro\AppData\Local\Programs\nodejs-portable\node-v24.22.1-win-x64\node.exe" server.js
) else if exist "C:\Users\mrtro\AppData\Local\Programs\node-v24.22.1-win-x64\node.exe" (
    "C:\Users\mrtro\AppData\Local\Programs\node-v24.22.1-win-x64\node.exe" server.js
) else (
    node server.js
)

echo.
echo Presiona cualquier tecla para cerrar...
pause
