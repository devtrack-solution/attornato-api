#!/bin/bash

export PROJECT=attornato

# Cria o diretório caso não exista
mkdir -p ./tools/pems

# Gera chave privada
openssl genrsa -out ./tools/pems/${PROJECT}-private.pem 2048

# Gera chave pública a partir da chave privada
openssl rsa -in ./tools/pems/${PROJECT}-private.pem -pubout > ./tools/pems/${PROJECT}-public.pem

# Exibe instruções formatadas para adicionar ao .env
echo -e "\e[32m\e[1mTo setup the JWT keys, please add the following values to your .env file:\e[0m"
echo "SECURITY_JWT_PUBLIC_KEY_BASE64=\"$(base64 -i ./tools/pems/${PROJECT}-public.pem)\""
echo "SECURITY_JWT_PRIVATE_KEY_BASE64=\"$(base64 -i ./tools/pems/${PROJECT}-private.pem)\""
