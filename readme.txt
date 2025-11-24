# NoteSpace – App de Notas

Aplicación web contenerizada con Docker, compuesta por:

Frontend (Nginx)  
Backend (Node.js + Express)  
Base de datos PostgreSQL  
Proxy inverso Nginx  
Sistema de backup automatizado con pg_dump  
Escalabilidad simulada (docker compose up --scale backend=3)

## Arquitectura
- El frontend se sirve en `/`
- El backend expone la API REST en `/notas`
- Nginx redirige tráfico según ruta
- La BD guarda notas de manera persistente
- Un contenedor auxiliar ejecuta backups cada minuto

## Endpoints
- GET /notas
- POST /notas
- DELETE /notas/:id

## Comandos básicos
docker compose up --build
docker compose up --scale backend=3
