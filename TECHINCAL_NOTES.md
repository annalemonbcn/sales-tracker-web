# Technical notes

## Futuras mejoras

### Pruebas automatizadas

Actualmente no hay pruebas unitarias, de integración ni end-to-end. Conviene
incorporar una primera capa de pruebas que cubra, como mínimo:

- Mappers entre DTO y modelos de dominio.
- Conversión de filtros a parámetros de URL y de API.
- Hooks y operaciones principales de React Query.
- Flujos críticos de creación y actualización de negocios y tareas.

### Documentación del proyecto

El `README.md` conserva el contenido genérico de Vite. Debería documentar:

- Requisitos y puesta en marcha local.
- Variables de entorno, especialmente `VITE_API_URL`.
- Scripts disponibles.
- Arquitectura por funcionalidades y responsabilidades de cada capa.
- Generación del cliente OpenAPI mediante Orval.

### Autenticación

El usuario actual está definido temporalmente mediante un identificador fijo en
`src/auth/currentUser.ts`. Debe sustituirse por una sesión autenticada y por un
mecanismo centralizado para proporcionar la identidad y los permisos del usuario.

### Cliente HTTP duplicado

Existen dos implementaciones aparentemente idénticas del cliente Axios:

- `src/shared/api/apiClient.ts`
- `src/shared/config/api/apiClient.ts`

Se debería conservar una sola fuente de verdad y actualizar los imports para
evitar configuraciones divergentes en el futuro.

### Validación de configuración

`VITE_API_URL` se trata como `string` mediante un cast, pero no se valida durante
el arranque de la aplicación. Conviene validar las variables de entorno y mostrar
un error claro cuando falten o tengan un formato incorrecto.

### Herramientas de desarrollo

Los devtools de TanStack Router y React Query se montan siempre. Deberían
habilitarse solamente en desarrollo para no incluirlos innecesariamente en otros
entornos.

### Enrutado

El árbol de rutas se registra manualmente en `src/app/router/routeTree.tsx`, por
lo que cada nueva ruta requiere modificar ese archivo. Se puede valorar la
generación automática del árbol o, como mínimo, documentar este paso.

La validación de parámetros de búsqueda realiza casts de varios enums sin comprobar
que sus valores sean válidos. Sería preferible aplicar validación real, por
ejemplo con Zod, y definir valores por defecto o una estrategia para entradas
inválidas.

### Consistencia del estado de filtros

Los filtros de dashboard y tareas se sincronizan con la URL, mientras que los
del calendario viven únicamente en estado local. Conviene decidir una estrategia
común, especialmente si se quiere conservar o compartir la vista filtrada del
calendario.

### Manejo global de errores

No se observa una estrategia global para errores de aplicación, rutas no
encontradas o errores de autenticación. Se deberían definir boundaries y estados
de error comunes, además de un tratamiento consistente de errores HTTP.

### Escalabilidad de la funcionalidad de negocios

`features/businesses` es actualmente el módulo más grande. A medida que crezca,
convendrá vigilar las responsabilidades de sus componentes y subdividirlo por
casos de uso o secciones cuando esa separación mejore la navegación y el
mantenimiento.

### Dependencias

`zustand` figura como dependencia, pero actualmente no se utiliza en `src`. Se
debería eliminar si no está previsto usarlo o documentar el caso de uso futuro
que justifica mantenerlo.
