#!/bin/bash
# backup/backup.sh

# Crear carpeta si no existe
mkdir -p /backups

# Fecha y hora actual
DATE=$(date +"%Y-%m-%d_%H-%M-%S")

# Nombre del archivo de respaldo
FILE="/backups/backup_$DATE.sql"

echo "🕒 Iniciando respaldo a las $DATE..."

# Ejecutar pg_dump
pg_dump -h db -U postgres -d notas_db > $FILE

echo "✅ Respaldo completado: $FILE"
