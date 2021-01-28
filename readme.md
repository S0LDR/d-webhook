# d-webhook

Discord webhook library

## Example Usage

```js
// send text
const webhook = new dwebhook.ChannelWebhook("url")

webhook.send("test")

// send embed

const embed = new dwebhook.MessageEmbed()
    .setTitle('test')
webhook.send(embed)
```

## Embed methods

```js
const embed = new dwebhook.MessageEmbed()
    .setTitle('title')
    .setDescription('desc')
    .setURL('url') // url of title
    .setFooter('value', 'iconURL') // icon url is optional
    .setTimestamp() // you can put a custom date inside if you want
    .setImage('url')
    .setThumbnail('url')
    .addField('name', 'value', true) // last value means inline or not
    .setAuthor('name', 'url', 'iconURL') // url and icon url are optional
    .setColor('#FF0000') // accepts hex values  
```

## Webhook methods

```js
const webhook = new dwebhook.ChannelWebhook('url')

webhook.setUsername('username')
webhook.setAvatar('avatarURL')
webhook.send('data') // send embed or text
```