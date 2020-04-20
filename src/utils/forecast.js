const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=da708f2e9861a8f4756244d2441eb979&query=' + latitude + ',' + longitude
    request({ url,json: true }, (error,{ body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const Tempdata =body.current
            callback(undefined, Tempdata.weather_descriptions[0] + '. It is currently ' + Tempdata.temperature + ' degress out. There is a ' + Tempdata.precip + '% chance of rain.' + ' It feels like '+Tempdata.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast