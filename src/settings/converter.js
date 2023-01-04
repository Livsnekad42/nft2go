import emojiData from 'emoji-datasource'
import _ from 'lodash'
require('string.fromcodepoint')


export const stringToEmoticon = (text) => {
    _.each(emojiData, (value, key) => {
        var reg = new RegExp('\\[' + value.name + '\\]', "g");
        const emoji = String.fromCodePoint(...value.unified.split('-').map(u => '0x' + u))
        if(text)
            text = text.replace(reg, emoji);
    })
    return text
}

export const emoticonToString = (text) => {
    let result = ''
    _.each(emojiData, (value, key) => {
        const emoji = String.fromCodePoint(...value.unified.split('-').map(u => '0x' + u))
        const pointAt = emoji.codePointAt()
        emojiData[key].pointAt = pointAt
    })

    const arr = _.toArray(text);

    _.each(arr, (value, key) => {
        const index = _.findIndex(emojiData, function (o) {
            return o.pointAt === value.codePointAt();
        })
        if (index > -1) {
            result += '[' + emojiData[index]['name'] + ']'
        } else {
            result += value;
        }
    })
    return result
}
