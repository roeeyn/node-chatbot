# Tutorial Chatbot con Node y Bootbot

Un bot básico de Facebook Messenger que te responde lo que tú escribiste, y más.

### ¿Qué necesito?
Para este tutorial necesitas:

- [NodeJS](https://nodejs.org/es/)
- [npm](https://nodejs.org/es/)
- [Ngrok](https://ngrok.com/) instalado 

### 1. Haz tu aplicación en Facebook
* Lo primero que debes de hacer es una aplicación en Facebook, a la cual tu página estará suscrita.
Para hacer tu aplicación de facebook debes de entrar a https://developers.facebook.com/, e iniciar sesión (en caso de que no inicie sesión automáticamente).
Después deberás de ir a la esquina superior derecha, donde dice mis aplicaciones, y seleccionar '**añadir nueva aplicación**'

![alt_text](https://user-images.githubusercontent.com/13385000/27937010-b5db2354-6279-11e7-96d8-29742fafb4e1.png)

* Tendrás que ingresar un nuevo identificador de la aplicación. En **nombre para mostrar** pondrás el nombre de tu proyecto (en este caso _Tutorial Echobot_ y después tendrás que ingresar un **correo electrónico de contacto**.)

![alt_text](https://user-images.githubusercontent.com/13385000/27937622-267cfae8-627e-11e7-9bae-2fa7f25ab222.png)

* Probablemente y por seguridad te pida **llenar un captcha**. Llénalo y te llevará al dashboard principal.

* Dentro del **dashboard** principal te saldrán todos los productos que podemos utilizar. En este caso seleccionaremos **Messenger** y nos abrirá la pestaña de configuracón del producto. 

![alt_text](https://user-images.githubusercontent.com/13385000/27937670-6a003a6e-627e-11e7-9db9-b5ed554188a7.png)

### 2. Haz tu página de Facebook
* En caso de que **ya tengas** una página de Facebook, puedes usarla si ningún problema.
* Para hacer una página de FB existen varios métodos. En este caso lo haremos desde el **dashboard** del paso anterior. Dentro de la página de configuración de Messenger, hay una sección que dice **Generación de Identificador**, donde en pasos más adelante vincularemos la página y nuestra aplicación. Dentro de dicha sección, debajo del cuadro de identificador de acceso, hay un pequeño enlace que dice **Crea una nueva página**, le damos clic y nos llevara al panel de configuración de nuestra página.

![alt_text](https://user-images.githubusercontent.com/13385000/27937892-04d2aa3a-6280-11e7-8e07-19b0de9a12d2.png)

Dentro de dicho panel seleccionaremos la clase de paǵina que desees, y la nombraremos. En este caso yo la nombraré Echobot.

![alt_text](https://user-images.githubusercontent.com/13385000/27937904-1eed0532-6280-11e7-90dc-dd329e65b639.png)

![alt_text](https://user-images.githubusercontent.com/13385000/27938014-d2f79dda-6280-11e7-9914-4d6753cd4527.png)

### 3. Vincula tu página de Facebook y tu aplicación
* Dentro del dashboard de configuración de Messenger (Generación de Identificador), **seleccionamos nuestra página** de las opciones. Tal vez te salga un cuadro de confirmación que te sugiera enviar a revisión. Sólo tenemos que seleccionar **Continuar como *tu usuario***, y después te pedirá permisos para que tu aplicación pueda administrar tu página. De manera similar habrá que aceptar la ventana. Si todo salió bien se generará el **token de acceso de la página**. Es importante tenerlo a la mano. 

### 4. Ejecuta el código
* Si no has clonado este repo, hazlo ahora con el siguiente comando

``` 
git clone https://github.com/RN3r1/NodeChatbot.git
```

* Una vez clonado, debemos de ir al archivo `demo.json`, y cambiarle el nombre por `default.json`, modificando también el parámetro de `accessToken` que obtuvimos previamente.

* Asimismo debemos de escribir en `verifyToken` el token que nosotros queramos, yo escribí "MiToken".

* Puedes obtener el `appSecret` desde el dashboard de tu aplicación de Facebook, Configuración, Información Básica y del lado derecho estará el apartado de *clave secreta de tu aplicación*

* Por último para ejecutar el código, en la **carpeta raíz del proyecto**, ejecutamos:
```
node main.js
```

y te deberá imprimir un mensaje de que el webhook ya está corriendo adecuadamente.

### 5. "Súbelo" a internet
* Como sabemos, el servidor de Node se levantó en un ambiente local, pero Facebook requiere de un servidor con certificado de seguridad y protocolo https. Para resolver este tema usaremos **Ngrok**. Éste hace un tunneling a través de http, a un puerto designado. Esto quiere decir que tu puerto en el que se montó Node (en este caso el 3000), quedará expuesto para que cualquiera le pueda hacer peticiones. Para ejecutar ngrok los comandos varían con cada sistema operativo, pero debera ser un comando similar a 
```
./ngrok http 3000
```
, o si ya está instalado simplemente 
```
ngrok http 3000
```
* Si todo sale bien, deberás ver una pantalla como la siguiente:

![alt_text](https://user-images.githubusercontent.com/13385000/27938711-6a9fd1da-6285-11e7-9ed7-8d1a5d2da06f.png)

### 6. Configura el Webhook
* De nuevo regresamos al **dashboard** de configuración de Messenger, y nos iremos a la sección de **webhooks**. Ahí seleccionaremos la opción de **Configurar webhooks**. En la ventana que se abre, en el campo de URL deberemos de escribir la **url** de nuestro ngrok (selecciona el url de **https**, **IMPORTANTE** cada que reinicia Ngrok, te da una url diferente, por lo que cada vez que reinicies, deberás hacer este paso), y agregaremos al final ```/webhook```. En *verificar identificador*, escribiremos ```MiToken``` (siéntete con la libertad de cambiar el identificador, sólo recuerda cambiarlo también en el código dentro de ```verifyToken```), y en los campos de suscripción selecciona **messages**, **messaging_postbacks**, **messaging_optins**.

* Se debería de ver como la siguiente imagen:

![alt_text](https://user-images.githubusercontent.com/13385000/27938984-6499ff66-6287-11e7-8a81-0f03334a03aa.png)

* Por último, debes de **suscribir** tu página de facebook a tu aplicación. Esto se hace dentro de la misma sección de webhook dentro del dashboard. **IMPORTANTE** si no suscribes tu página a la aplicación no podrás interactuar con ella. Éste es uno de los errores más comunes.

![alt_text](https://user-images.githubusercontent.com/13385000/27939086-1e5c181c-6288-11e7-87ee-bab7ee397751.png)

### 7. Prueba tu app
* Ya has configurado todo. Ahora es momento de ir a https://www.messenger.com/, iniciar sesión en caso de que no lo haga automáticamente, buscar tu página, y mandarle un mensaje. La página debería de responder con tu mismo mensaje, y en caso de que no envies texto, éste lo detectará y te mandará otro mensaje. 
Se verá algo como la siguiente imagen:

![alt_text](https://user-images.githubusercontent.com/13385000/27943005-3b1d943a-62a1-11e7-9458-11b78bb7c228.png)

### Problemas comunes
Si tu bot no responde, prueba con lo siguiente:
 * Asegúrate que tengas internet.
 * Asegúrate que tu ```ngrok``` esté corriendo, y en el puerto 3000.
 * Asegúrate que ```main.js``` esté corriendo, y se esté ejecutando en el puerto 3000.
 * Recuerda que cada vez que reinicias ```ngrok``` se cambia la url, entonces asegúrate que en la configuración de tu webhook esté tu url actual, y que al final de la url, hayas escrito ```/webhook```.
 * Asegúrate que hayas cambiado en el archivo ```demo.json``` tu token de la página, y si cambiaste el código de verificación, asegúrate que esté igual tanto en la configuración del webhook como en la página.
 * Asegúrate que la aplicación esté suscrita a tu página (Paso 6).
  
### Pasos siguientes:
* En este repositorio hay otra rama que se llama `moreFeatures`. En ella se encuentra el código modificado con más ejemplos de lo que puede hacer Bootbot para Messenger.
* Como habrás notado, cada que terminas ngrok, tu bot "muere". Esto se debe a que tu computadora está sirviendo como servidor. Para solucionar este problema puedes meter tu aplicación a un contenedor con Docker, y subir dicho contenedor a alguna plataforma como Heroku. Así se mantendrá "vivo" todo el tiempo tu bot.
