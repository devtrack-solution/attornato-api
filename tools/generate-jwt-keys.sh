#!/bin/bash

export PROJECT=attornato

openssl genrsa -out ./tools/${PROJECT}-private.pem 2048

openssl rsa -in ./tools/${PROJECT}-private.pem -pubout > ./tools/${PROJECT}-public.pem

echo -e "\e[32m\e[1mTo setup the JWT keys, please add the following values to your .env file:\e[0m"
echo "SECURITY_JWT_PUBLIC_KEY_BASE64=\"$(base64 -i ./tools/${PROJECT}-public.pem)\""
echo "SECURITY_JWT_PRIVATE_KEY_BASE64=\"$(base64 -i ./tools/${PROJECT}-private.pem)\""

