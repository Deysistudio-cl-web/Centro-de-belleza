#!/bin/bash
# Script para subir cambios al repositorio GitHub de Deysi Studio

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/github.env"
REPO_URL="https://github.com/Deysistudio-cl-web/Centro-de-belleza"

# Leer credenciales
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: No se encontró github.env"
  exit 1
fi

GH_USER=$(grep '^user=' "$ENV_FILE" | cut -d'=' -f2- | tr -d '\r')
GH_PASS=$(grep '^pass=' "$ENV_FILE" | cut -d'=' -f2- | tr -d '\r')

if [ -z "$GH_USER" ] || [ -z "$GH_PASS" ]; then
  echo "ERROR: Faltan credenciales en github.env"
  exit 1
fi

cd "$SCRIPT_DIR" || exit 1

# Inicializar git si no existe
if [ ! -d ".git" ]; then
  echo "Inicializando repositorio git..."
  git init
  git branch -M main
fi

# Configurar usuario
git config user.email "$GH_USER"
git config user.name "Deysi Studio"

# Configurar remote con credenciales
REMOTE_WITH_CREDS="https://oauth2:${GH_PASS}@github.com/Deysistudio-cl-web/Centro-de-belleza.git"
if git remote get-url origin &>/dev/null; then
  git remote set-url origin "$REMOTE_WITH_CREDS"
else
  git remote add origin "$REMOTE_WITH_CREDS"
fi

# Agregar todos los archivos (respetando .gitignore)
git add -A

# Verificar si hay cambios
if git diff --cached --quiet; then
  echo "No hay cambios nuevos para subir."
  exit 0
fi

# Commit con fecha y hora
TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
git commit -m "Actualización sitio web - $TIMESTAMP"

# Push
echo "Subiendo cambios a GitHub..."
if git push origin main 2>&1; then
  echo "Listo. Cambios subidos correctamente."
else
  # Si la rama remota no existe aún, forzar primer push
  git push -u origin main
fi
