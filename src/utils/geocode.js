const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicmlzaGFiaDIxMDgiLCJhIjoiY2s5NDBianE3MDcwZTNlbzE3bTZ1enRrayJ9.d_snh-I10ZAb0I9b3Yi8Fw'

    request({url,json:true},(error,{ body }) => {
        if(error){
            callback('Unable to connect. Check Internet Connection.',undefined)
        } else if(body.features.length === 0){
            callback('Unable to fetch location. Make sure that the location entered is correct',undefined)
        } else {
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude: body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode