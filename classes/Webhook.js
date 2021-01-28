const fetch = require('node-fetch')
const agent = require('https-proxy-agent')

const sendHook = (url, payload, agent) => new Promise((resolve, reject) => {
    let aaa
    if (agent) {
        aaa = new agent(agent)
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        agent: aaa
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

    async send(data, agent) {
        let toSendPayload = {
            ...data.payload
        }
        if (this.payload.username) toSendPayload.username = this.payload.username
        if (this.payload.avatar_url) toSendPayload.avatar_url = this.payload.avatar_url

        try {
            const res = await sendHook(this.hookURL, toSendPayload, this.agent)
            if (res.status === 429) {
                const body = await res.json()
                const timeToWait = body['retry_after']
                setTimeout(async () => await this.send(data), timeToWait)
            } else if (res.status !== 204) {
                throw new Error('Got unexpected response from API:\nStatus Code: ' + res.status + 'Message: ' + res.text())
            }
        } catch(e) {
            throw new Error(e.message)
        }
    }
}