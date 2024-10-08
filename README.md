# discord-bot

- [discord-bot](#discord-bot)
  - [DESCRIPCIÓN](#descripción)
  - [CONFIGURACIÓN](#configuración)
  - [COMANDOS NORMALES](#comandos-normales)
    - [echo](#echo)
  - [COMANDOS DE BARRA](#comandos-de-barra)
    - [admin](#admin)
      - [echo](#echo-1)
      - [triggers](#triggers)
      - [clanes](#clanes)
      - [logs](#logs)
      - [channelautomaticmessages](#channelautomaticmessages)
      - [messagesformats](#messagesformats)
  - [EJECUCIÓN](#ejecución)

## DESCRIPCIÓN

Este es un bot de discord para administrar triggers, clanes, mensajes automáticos, formatos de mensajes, etc...

## CONFIGURACIÓN

Crear un archivo `config.json` en la raiz del proyecto con la configuración.\
Debería parecerse a algo como lo siguiente

```json
{
  "token": "TOKEN",
  "prefix": "!",
  "admin_id": "1111111111111111111",
  "guild_id": "1111111111111111111",
  "client_id": "1111111111111111111",
  "moderator_role_id": "11111111111111111111"
}
```

**Explicación:**

`token`     => Esto el es token del bot, se encuentra en la página de discord donde se crea, no compartirlo con nadie.\
`prefix`    => El prefijo para los comandos.\
`admin_id`  => El ID del admin, esto se usa para enviarle mensajes directos cuando hay algun problema con el bot o cuando se inicia.\
`guild_id`  => El ID del servidor.\
`client_id` => El ID del bot.

Las ID's se consiguen dando click derecho a un usuario, hay una opción de copiar id del usuario. Si no aparece la opción se deben activar las opciones de desarrollador de discord

## COMANDOS NORMALES

Se usan con el prefijo definido en el archivo de configuración

### echo

`!echo #canal`

Con este comando se pueden enviar mensajes a cualquier canal del servidor (siempre que el bot tenga permisos en dicho canal).\
Se envía un mensaje primero y después se ejecuta el comando y el bot lo recoje y envía al canal seleccionado.

Por ejemplo, se envía un mensaje

```txt
Buenos días, este es un mensaje para...
```

Después se ejecuta el comando `!echo #general`

El bot cogerá el último mensaje y lo enviará por el canal general.

Se puede enviar tanto un mensaje normal como un embed, para enviar un embed el mensaje debe parecerse a lo siguiente:

```txt
{richmessage}
{embed}
{title}
Título del embed
{endtitle}

{description}
Descripción del mensaje embed
{enddescription}

{color}
#ff0000
{endcolor}

{content}
Contenido del mensaje
{endcontent}
```

Es importante que lo que esta entre {} se llame exactamente igual, con lo que está entre {embed} y {endembed} se creará un embed, el titulo y descripcion son obligatorios y el color es opcional (si no se pone color, se pondrá azul por defecto).\
Y lo que esta entre {content} y {endcontent} es el mensaje que se enviará junto al embed.
> Este mismo formato se puede usar en las respuestas de los triggers

## COMANDOS DE BARRA

### admin

#### echo

`/admin echo`

Para enviar un mensaje simple por un canal

#### triggers

Para configurar triggers.\
Hay dos acciones para los triggers, `eliminar` o `responder`\
Si se elige la opcion `eliminar`, el mensaje se eliminará, con la opción `responder`, el bot responderá al mensaje con la respuesta que se ha especificado

#### clanes

Para ver y administrar los clanes y sus configuraciones

#### logs

Para activar o desactivar los logs

| LOG          |                          DESCRIPCIÓN                         |
|--------------|--------------------------------------------------------------|
| chatlog      | Para cuando un usuario borra o edita un mensaje              |
| voicelog     | Para cuando un usuario se conecta a un canal, desconecta...  |
| claneslog    | Para cuando alguien añade a un usuario a su clan, expulsa... |
| commandslog  | Para cuando se usa cualquier comando                         |

#### channelautomaticmessages

`/admin automaticmessages`

Con este comando se pueden configurar mensajes automáticos que se envía cada vez que se crea un canal dentro de la categoría especificada.\
Se elegirá una categoría y un formluario para rellenar con la siguiente información:

```txt
título => El título del mensaje a enviar
mensaje => El mensaje a enviar
tiempo de espera => Esto es opcional, es un tiempo de espera para enviar el mensaje, en segundos. Por ejemplo si se pone 5, al crearse el canal tardará 5 segundos en enviarse el mensaje
color => El color del mensaje

Hay varias variables que se pueden usar en el mensaje:
```

| Variable            | Descripción                                         |
|---------------------|-----------------------------------------------------|
| `{channelName}`     | Nombre del canal creado                             |
| `{channelMention}`  | Menciona el canal creado                            |
| `{categoryName}`    | Nombre de la categoría donde se ha creado el canal  |
| `{categoryMention}` | Menciona la categoría donde se ha creado el canal   |
| `{date}`            | La fecha actual                                     |

Estas variables se sustituirán por su valor correspondiente

#### messagesformats

`/admin messagesformats`

Con este comando se pueden configurar los canales para que tengan un formato especifico.\
Se tendrá que poner el canal y una expresión regular que será la que especifique el formato.
> Por ejemplo, esta expresión regular\
> ^\+[1-3] grupo (1[0-2]|[0-9])$\
> Hará que solo se puedan enviar mensajes como +1 grupo 5, los demás mensajes se borrarán

## EJECUCIÓN

Es recomendable tener la versión de node 20.0.0 o superior, que es la que se ha utilizado para la creación del bot

```bash
cd discord-bot
npm install
node index.js
```

O si se quiere se puede ejecutar con pm2, ésta es la forma recomendada

```bash
cd discord-bot
npm install
pm2 start ecosystem.config.cjs
```
