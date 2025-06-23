# Usa una imagen oficial de Nginx como base. Alpine es una versión muy ligera.
FROM nginx:stable-alpine

# Etiqueta para identificar al mantenedor de la imagen
LABEL maintainer="contacto@inmoprofit.com"

# Elimina la configuración por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos de tu página web (desde la carpeta actual) a la carpeta que Nginx utiliza para servir contenido
COPY . /usr/share/nginx/html

# Expón el puerto 80 para que el contenedor pueda recibir tráfico (Dockploid lo gestionará por ti)
EXPOSE 80

# Comando que se ejecuta cuando el contenedor arranca
CMD ["nginx", "-g", "daemon off;"]