#!/bin/bash

if ! command -v pnpm &> /dev/null
then
    echo "pnpm não encontrado. Instalando pnpm..."
    npm install -g pnpm
else
    echo "pnpm já está instalado."
fi

pnpm install --no-frozen-lockfile
