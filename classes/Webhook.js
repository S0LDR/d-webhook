const fetch = require('node-fetch')

const sendHook = (url, payload) => new Promise((resolve, reject) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
    })
        .then(r => resolve(r))
        .catch(e => reject(e))
})

module.exports = class ChannelWebhook {
    constructor (hookUrl) {
        this.hookURL = hookUrl.toString()
        this.payload = {}
    }

    setUsername(username) {
        this.payload.username = username
        return this
    }

    setAvatar(url) {
        this.payload.avatar_url = url
        return this
    }

    getURL() {
        return this.hookURL
    }

    async send(data) {
        let toSendPayload
        switch (typeof(data)) {
            case 'string':
                toSendPayload = {
                    content: data
                }
                break
            case 'object':
                toSendPayload = {
                    ...data.payload
                }
                break
            default:
                return throw new TypeError('Invalid data')
        }
        if (this.payload.username) toSendPayload.username = this.payload.username
        if (this.payload.avatar_url) toSendPayload.avatar_url = this.payload.avatar_url

        try {
            const res = await sendHook(this.hookURL, toSendPayload)
            if (res.status === 429) {
                const body = await res.json()
                const timeToWait = body['retry_after']
                setTimeout(async () => await this.send(data), timeToWait)
            } else if (res.status !== 204) {
                throw new Error('Got unexpected response from API:\nStatus Code: ' + res.status + '\nMessage: ' + res.text())
            }
        } catch(e) {
            throw new Error(e.message)
        }
    }
}