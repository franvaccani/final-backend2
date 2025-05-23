Arquitectura de Servidor E-commerce

Un servidor profesional de e-commerce desarrollado con Node.js que implementa los patrones DAO, DTO y Repositorio, con autorización mediante middleware y un sistema completo de flujo de compra.

⸻

Funcionalidades

🧱 Patrones Avanzados de Arquitectura
	•	Objetos de Acceso a Datos (DAO) para operaciones con la base de datos.
	•	Objetos de Transferencia de Datos (DTO) para transmisión segura de datos.
	•	Patrón Repositorio para mantener una lógica de negocio limpia.
	•	Capa de Servicios para la lógica de aplicación.

🔐 Autenticación
	•	Autenticación basada en JWT.
	•	Autorización basada en roles (admin, usuario).
	•	Manejo seguro de contraseñas con bcrypt.

📦 Gestión de Productos
	•	Operaciones CRUD para productos.
	•	Filtrado y paginación de productos.
	•	Gestión de productos solo disponible para administradores.

🛒 Sistema de Carrito
	•	Carritos específicos por usuario.
	•	Agregar, actualizar y eliminar productos del carrito.
	•	Flujo de compra con validación de stock.

💳 Proceso de Compra
	•	Verificación de stock durante el checkout.
	•	Generación de ticket para compras completadas.
	•	Soporte para compras parciales cuando hay productos sin stock.

  Endpoints de la API

🔑 Autenticación
	•	POST /api/auth/register – Registrar nuevo usuario
	•	POST /api/auth/login – Iniciar sesión
	•	GET /api/auth/current – Obtener usuario actual

📦 Productos
	•	GET /api/products – Obtener todos los productos
	•	GET /api/products/:id – Obtener producto por ID
	•	POST /api/products – Crear nuevo producto (solo admin)
	•	PUT /api/products/:id – Actualizar producto (solo admin)
	•	DELETE /api/products/:id – Eliminar producto (solo admin)

🛒 Carritos
	•	GET /api/carts/:cid – Obtener carrito por ID
	•	POST /api/carts – Crear nuevo carrito
	•	POST /api/carts/:cid/products/:pid – Agregar producto al carrito
	•	DELETE /api/carts/:cid/products/:pid – Eliminar producto del carrito
	•	PUT /api/carts/:cid/products/:pid – Actualizar cantidad de producto en el carrito
	•	DELETE /api/carts/:cid – Vaciar carrito
	•	POST /api/carts/:cid/purchase – Comprar carrito

⸻

Arquitectura

El proyecto sigue una arquitectura por capas:
	•	Routes – Definen los endpoints de la API
	•	Controllers – Manejan la solicitud y respuesta
	•	Services – Implementan la lógica de negocio
	•	Repositories – Implementan patrones de acceso a datos
	•	DAOs – Interactúan directamente con la base de datos
	•	Models – Definen la estructura de los datos
	•	DTOs – Aseguran la transferencia segura de datos
	•	Middlewares – Procesan las solicitudes
	•	Utils – Funciones auxiliares
	•	Config – Configuración de la aplicación

⸻

Base de Datos

La aplicación utiliza MongoDB junto con Mongoose como el ODM (Mapeador de Objetos-Documentos).

⸻

Seguridad
	•	Autenticación con JWT
	•	Hash de contraseñas con bcrypt
	•	Control de acceso basado en roles
	•	Sanitización de datos usando DTOs
