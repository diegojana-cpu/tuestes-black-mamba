# Tuestes Black Mamba

Registro de tuestes de Black Mamba como app instalable (Mac, iPhone y Android).
Los datos se guardan en Firebase (Google) y se comparten con todo el equipo.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa |
| `firebase-config.js` | La conexión con tu proyecto de Firebase (lo llenas una vez) |
| `manifest.webmanifest`, `sw.js`, íconos `.png` | Lo que permite instalarla y abrirla sin internet |
| `firestore.rules` | Quién puede ver y editar los datos (lista de correos del equipo) |

## Puesta en marcha (una sola vez, ~20 minutos)

### 1. Crear el proyecto en Firebase

1. Entra a <https://console.firebase.google.com> con tu cuenta de Google y toca **Crear un proyecto**. Nombre: `tuestes-black-mamba`. Google Analytics: desactivado.
2. En el menú izquierdo: **Compilación → Authentication → Comenzar**. En **Método de acceso** activa **Correo electrónico/contraseña** y guarda.
3. En **Authentication → Usuarios → Agregar usuario**, crea tu cuenta (tu correo y una contraseña). Repite por cada persona del equipo.
4. En **Authentication → Configuración → Dominios autorizados → Agregar dominio**, escribe `diegojana-cpu.github.io`.
5. En **Compilación → Firestore Database → Crear base de datos**. Ubicación: `southamerica-east1 (São Paulo)`. Modo: **producción**.
6. En **Firestore → Reglas**, borra todo, pega el contenido de `firestore.rules` y toca **Publicar**. Si hay más personas en el equipo, agrega sus correos a la lista antes de publicar.
7. Toca el engranaje ⚙ → **Configuración del proyecto** → baja a **Tus apps** → ícono **</>** (Web). Nombre: `tuestes`. No marques Hosting. Copia los valores de `firebaseConfig` (apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId).

### 2. Subir la app a GitHub

1. En GitHub, crea un repositorio nuevo **público** llamado `tuestes-black-mamba`.
2. Toca **uploading an existing file** y arrastra **todo el contenido** de esta carpeta.
3. Antes de confirmar, abre `firebase-config.js` en GitHub (ícono del lápiz) y pega los valores del paso 1.7 entre las comillas. Guarda con **Commit changes**.
4. Ve a **Settings → Pages → Branch: `main` / `(root)` → Save**. En uno o dos minutos la app queda en
   `https://diegojana-cpu.github.io/tuestes-black-mamba/`

### 3. Traer tus datos actuales

1. Abre la app y entra con tu correo y contraseña.
2. Toca **Cuenta → Importar respaldo…** y elige el archivo `Respaldo tuestes … .json` que te entregó Claude.
3. Listo: aparecen tus tuestes, cafés y lotes de verde.

### 4. Instalarla

- **iPhone:** abre el enlace en Safari → **Compartir** → **Agregar a pantalla de inicio**.
- **Android:** abre el enlace en Chrome → **⋮** → **Instalar app**.
- **Mac:** abre el enlace en Chrome → **⋮** → **Transmitir, guardar y compartir** → **Instalar página como app**. Queda en Aplicaciones con su propio ícono en el Dock (ya no necesitas el lanzador anterior).

## Uso diario

- Funciona sin internet: lo que registres se sube solo cuando vuelve la conexión.
- **Cuenta → Descargar respaldo** guarda una copia completa de los datos. Hazlo de vez en cuando.
- Para sumar a alguien al equipo: créale usuario en Authentication (paso 1.3) y agrega su correo a las reglas (paso 1.6).
- Para actualizar la app: sube el nuevo `index.html` al repositorio. Los celulares toman la versión nueva al abrirla con internet.

## Costo

El plan gratuito de Firebase (Spark) alcanza de sobra para una tostaduría: 50.000 lecturas y 20.000 escrituras por día, y 1 GB de datos.
