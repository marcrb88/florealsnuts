# Estructura de Rutas y SEO

## Árbol de Navegación de la Aplicación

```
/
├── / (HOME - Página Principal)
│   └── Contenido: Hero carousel, features, experiencia
│   └── Archivo: src/pages/home/index.tsx
│
├── /catalog (CATEGORÍA MADRE - Catálogo Completo)
│   └── Contenido: Lista de todas las variedades
│   └── Archivo: src/pages/catalog/index.tsx
│   │
│   └── /variedad/:id (CATEGORÍA HIJA - Detalle de Variedad)
│       └── Contenido: Descripción, características, precio
│       └── Archivo: src/pages/catalog/variedad.tsx
│
└── /contact (CONTACTO)
    └── Contenido: Formulario, información de contacto
    └── Archivo: src/pages/contact/index.tsx
```

## Estructura de Ficheros

```
src/
├── pages/
│   ├── home/
│   │   └── index.tsx          (Página de inicio)
│   ├── catalog/
│   │   ├── index.tsx          (Listado de variedades)
│   │   └── variedad.tsx       (Detalle de variedad)
│   └── contact/
│       └── index.tsx          (Formulario de contacto)
├── components/
│   ├── Navigation.tsx         (Navegación con rutas)
│   ├── ImageCarousel.tsx      (Carrusel de imágenes)
│   └── LanguageSelector.tsx   (Selector de idioma)
├── lib/
│   ├── supabase.ts           (Cliente Supabase)
│   ├── recaptcha.ts          (Configuración reCAPTCHA)
│   └── seo.ts                (Utilidades SEO)
├── locales/
│   ├── ca.json               (Traducción Català)
│   ├── es.json               (Traducción Español)
│   └── en.json               (Traducción English)
└── App.tsx                    (Router principal)
```

## Rutas y SEO

### Nivel 1: HOME
- **Ruta:** `/`
- **Título:** "Ametllers Premium - Especialistes en ametllers de qualitat"
- **Descripción:** Presentación de la empresa, valores y propuesta de valor
- **Keywords:** ametllers, venta almendros, variedades ametllera

### Nivel 2: CATEGORÍA MADRE - CATÁLOGO
- **Ruta:** `/catalog`
- **Título:** "Catàleg de Varietats d'Ametllers - Ametllers Premium"
- **Descripción:** Listado completo de variedades de almendros disponibles
- **Keywords:** catálogo ametllers, varietats almendros, comprar almendros

### Nivel 3: CATEGORÍA HIJA - VARIEDAD ESPECÍFICA
- **Ruta:** `/variedad/:id` (ej: `/variedad/marcona-id`)
- **Título:** "[Nombre Variedad] - Ametllers Premium"
- **Descripción:** "Variedad de ametlla [nombre] - Características, origen, floración..."
- **Keywords:** [nombre variedad], ametlla [nombre], almendro [nombre]

### Nivel 4: CONTACTO
- **Ruta:** `/contact`
- **Título:** "Contacte'ns - Ametllers Premium"
- **Descripción:** "Formulario de contacto para solicitar información sobre nuestras variedades"
- **Keywords:** contacto ametllers, formulario, información almendros

## Ventajas SEO de esta Estructura

1. **Rutas Semánticas:** URLs claras y descriptivas
2. **Jerarquía Lógica:** La estructura refleja la relación entre contenidos
3. **Profundidad Controlada:** Máximo 3 niveles de profundidad
4. **URLs Amigables:** Fáciles de recordar y compartir
5. **Meta Tags Dinámicos:** Diferentes títulos y descripciones por página
6. **Breadcrumbs Implícitos:** La navegación muestra la ruta actual
7. **Contenido Organizado:** Cada página tiene propósito específico
8. **Enlaces Internos:** Conexiones lógicas entre páginas relacionadas

## Implementación

La aplicación utiliza React Router para manejar las rutas:

```typescript
<Route path="/" element={<HomePage />} />
<Route path="/catalog" element={<CatalogPage />} />
<Route path="/variedad/:id" element={<VariedadPage />} />
<Route path="/contact" element={<ContactPage />} />
```

Cada página puede actualizar los meta tags usando la función `setMetaTags` del archivo `src/lib/seo.ts`.
