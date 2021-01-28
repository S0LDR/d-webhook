function formatColor(color) {
    if (typeof color === 'string' && color.startsWith("#")){
        const rawHex = color.split('#')[1];

        return parseInt(rawHex, 16);
    }
    else {
        return Number(color);
    };
}

module.exports = class MessageEmbed {
    constructor() {
        this.payload = {
            embeds: [{
                fields: []
            }],
        }
    }

    getPayload() {
        return this.payload
    }

    setTitle(title) {
        this.payload.embeds[0].title = title
        return this
    }

    setDescription(desc) {
        this.payload.embeds[0].description = desc
        return this
    }

    setURL(url) {
        this.payload.embeds[0].url = url
        return this
    }

    setAuthor(name, url, iconUrl) {
        this.payload.embeds[0].author = {}
        this.payload.embeds[0].author.name = name
        if (url) this.payload.embeds[0].author.url = url
        if (iconUrl) this.payload.embeds[0].author.icon_url = iconUrl
        return this
    }

    addField(name, value, inline) {
        const field = {
            name: name,
            value: value,
            inline: inline || false
        }
        this.payload.embeds[0].fields.push(field)
        return this
    }

    setFooter(value, icon) {
        this.payload.footer = {
            value: value
        }
        if (icon) this.payload.footer.icon = icon
        return this
    }

    setTimestamp(date) {
        this.payload.timestamp = date || new Date()
        return this
    }

    setImage(url) {
        this.payload.embeds[0].image = {}
        this.payload.embeds[0].image.url = url
        return this
    }

    setColor(color) {
        this.payload.embeds[0].color = formatColor(color)
        return this
    }

    setThumbnail(url) {
        this.payload.embeds[0].thumbnail = {}
        this.payload.embeds[0].thumbnail.url = url
        return this
    }
}