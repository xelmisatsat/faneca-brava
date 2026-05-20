# Proyecto Android Offline - Faneca Brava

Este proyecto está configurado para funcionar **completamente sin internet** como una aplicación nativa de Android (APK).

## Características Offline
- **Imágenes Locales:** Todas las imágenes que estaban en la nube han sido descargadas e integradas en la app.
- **Audio Local:** Toda la música y efectos de sonido están incluidos en el paquete.
- **Mapa Narrativo:** Se ha sustituido el mapa interactivo (que requiere internet) por un mapa artístico estilizado y offline.
- **Sin Dependencias Externas:** La app no intenta conectarse a ningún servidor.

## Instrucciones para generar la APK

Para generar la APK usando **Android Studio**, sigue estos pasos:

1. **Preparar el entorno:**
   Abre una terminal en esta carpeta (`android-project`) y ejecuta:
   ```bash
   npm install
   npm run build
   npx cap add android
   npx cap sync android
   ```

2. **Abrir en Android Studio:**
   Ejecuta el siguiente comando para abrir el proyecto en Android Studio:
   ```bash
   npx cap open android
   ```

3. **Generar la APK:**
   - Una vez abierto Android Studio, espera a que termine de indexar (Gradle Sync).
   - Ve al menú superior: **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
   - Cuando termine, aparecerá un aviso abajo a la derecha. Haz clic en **locate** para encontrar tu archivo `app-debug.apk`.

4. **Instalar en el móvil:**
   Copia ese archivo `.apk` a tu teléfono Android e instálalo (tendrás que permitir la instalación de aplicaciones de origen desconocido).

---
Desarrollado con Capacitor por Antigravity.
