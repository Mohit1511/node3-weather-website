const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


// Define paths for Express Config
const publicDirectorypath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

const app = express()

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)


// Setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Mohit Kumar'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'Weather App',
        name : 'Mohit Kumar'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help',
        msg : 'For more help contact the below person',
        name : 'Mohit Kumar'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error : 'You must have provided an address'
        })
    }  

    geocode(req.query.address,(error,{latitude,longitude,location} = {} )=>{
        if(error){
           return res.send ({
                error: 'Please select a valid address'
            })
        } 

        forecast(latitude,longitude,(error,Tempdata)=>{
            if(error){
                return res.send({
                    error: 'Not able to fetch it currently'
                })
            }

            console.log('latitude :',latitude)
            console.log('longitude :',longitude)
            console.log('location :',location)

            res.send({
                forecast: Tempdata,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/products',(req,res) => {
    console.log(req.query)
    res.send({
        products : [ ]
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404', {
        title : '404',
        name : 'Mohit Kumar',
        errormsg : 'Help not found'
    })
})
app.get('*', (req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Mohit Kumar',
        errormsg : 'Page not Found'
    })
})
// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})