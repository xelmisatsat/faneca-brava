@echo off
echo PREPARANDO PROXECTO ANDROID (ULTRA FIXED)...
cd %~dp0
echo Instalando dependencias e CLI...
call pnpm install
echo Xerando archivos da web (Solo Client)...
call npx vite build
echo Sincronizando con Android...
call pnpm exec cap sync android
echo.
echo LISTO! Agora abre Android Studio e selecciona a carpeta:
echo %~dp0android
echo.
pause
