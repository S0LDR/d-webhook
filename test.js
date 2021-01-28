const lib = require('./index.js')

const data = new lib.MessageEmbed()
    .setTitle('test')

const webh = new lib.ChannelWebhook('https://discord.com/api/webhooks/800684474232602645/OfdDQjyXaULuE2raQon8g6qyMabOaKk1EcO_ivfGixgOmdiXLKekEokCnRGiMQ95TyCw')
webh.setUsername('test')
webh.send(data)
console.log('Sent payload to ' + webh.getURL())