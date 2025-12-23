# Eerste Dingen Eerst - Nederlands voor Spaanssprekenden

Un curso interactivo de holandés basado en la metodología de L.G. Alexander para hispanohablantes.

## 🌟 Características

- ✅ 10 lecciones iniciales (A1 nivel)
- 🔊 Pronunciación de texto a voz (Text-to-Speech) en holandés
- 📱 Diseño responsive (móvil, tablet, desktop)
- 🎨 Interfaz moderna con Tailwind CSS
- 🇪🇸 Traducciones al español
- 📚 Diálogos, vocabulario y ejercicios prácticos
- 🎯 Método progresivo Alexander

## 🚀 Instalación y Uso

### Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de Instalación

1. **Navegar al directorio del proyecto:**
   ```bash
   cd dutch-lessons
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   La aplicación se abrirá automáticamente en `http://localhost:3000`

### Otros Comandos

```bash
# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview
```

## 📖 Estructura del Curso

### Lecciones Incluidas

1. **Les 1** - Saludos básicos y "Pardon"
2. **Les 2** - Vocabulario: "Is dit uw...?"
3. **Les 3** - Diálogo en la guardarropa
4. **Les 4** - Práctica: Preguntas con objetos
5. **Les 5** - Presentaciones en clase
6. **Les 6** - Marcas de autos y nacionalidades
7. **Les 7** - Conversación en un café
8. **Les 8** - Profesiones
9. **Les 9** - Saludos formales
10. **Les 10** - Demostrativos: "Kijk naar..."

### Guía de Pronunciación

Incluye tips específicos para hispanohablantes:
- 'g' y 'ch' holandesas
- El sonido 'ui'
- Diferencias entre 'ij/ei'
- Y más...

## 🎯 Cómo Usar la Aplicación

### Navegación

- **Selector de Lecciones**: Haz clic en los números para saltar a cualquier lección
- **Botones de Navegación**: Usa "Anterior" y "Siguiente" para moverte secuencialmente
- **Guía de Pronunciación**: Haz clic en "Ver Pronunciación" en el header

### Audio

- Haz clic en el icono 🔊 al lado de cualquier texto en holandés
- El navegador pronunciará el texto usando síntesis de voz holandesa
- La velocidad está ajustada para aprendizaje (85% de velocidad normal)

### Ejercicios

- Los ejercicios tienen respuestas expandibles
- Haz clic en "Ver respuesta / Show answer" para revelar la solución
- Cada respuesta incluye traducción al español

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Iconos modernos
- **Web Speech API** - Text-to-speech nativo del navegador

## 📁 Estructura del Proyecto

```
dutch-lessons/
├── src/
│   ├── data/
│   │   └── lessons.json      # Todas las lecciones
│   ├── App.jsx               # Componente principal
│   ├── main.jsx              # Entry point de React
│   └── index.css             # Estilos globales + Tailwind
├── index.html                # HTML template
├── package.json              # Dependencias del proyecto
├── tailwind.config.js        # Configuración de Tailwind
├── vite.config.js            # Configuración de Vite
└── README.md                 # Este archivo
```

## 🔧 Personalización

### Agregar Más Lecciones

Edita el archivo `src/data/lessons.json` siguiendo la estructura existente:

```json
{
  "id": 11,
  "title": "Les 11",
  "subtitle": "Tu subtítulo",
  "type": "dialogue",  // o "vocabulary", "practice"
  "scenes": [
    {
      "sceneNumber": 1,
      "illustration": "Descripción de la escena",
      "text": "Texto en holandés",
      "translation": "Traducción al español"
    }
  ]
}
```

### Modificar Estilos

- Los colores y estilos están en componentes usando Tailwind
- Edita `tailwind.config.js` para cambiar el tema
- Los componentes principales están en `src/App.jsx`

**Nota**: La función de text-to-speech requiere navegadores modernos con soporte para Web Speech API.

## 📝 Roadmap

- [ ] Lecciones 11-20
- [ ] Lecciones hasta 200 (A1-A2 completo)
- [ ] Sistema de progreso del estudiante
- [ ] Ejercicios interactivos con validación
- [ ] Grabación de voz del estudiante
- [ ] Flashcards de vocabulario
- [ ] Tests de evaluación
- [ ] Modo offline (PWA)

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/NuevaLeccion`)
3. Commit tus cambios (`git commit -m 'Agregar Lección 11'`)
4. Push al branch (`git push origin feature/NuevaLeccion`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está basado en el método de L.G. Alexander adaptado para holandés.

## 🙏 Reconocimientos

- **L.G. Alexander** - Por su excepcional metodología de enseñanza
- **Método Alexander** - "First Things First" como inspiración
- Diseñado específicamente para hispanohablantes aprendiendo holandés

## 📧 Contacto

Para preguntas o sugerencias, abre un issue en el repositorio.

---

**¡Veel succes met Nederlands leren!** 🇳🇱
*(¡Mucho éxito aprendiendo holandés!)*
