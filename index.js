import express from 'express'
import sportsRoute from './routes/sports.route.js'
import { engine } from 'express-handlebars'

const app = express()
const PORT = process.env.PORT || 3000
const __dirname = import.meta.dirname

// middleware
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Handlebars
app.engine('.hbs',engine({extname:'.hbs'}))
app.set('view engine','.hbs')
app.set('views','./views')

// ROUTER
app.use('/sports',sportsRoute)

app.get('/', (req,res)=>{res.render('home')})
app.get('/edit', (req,res)=>{res.render('editSport')})
app.get('/remove', (req,res)=>{res.render('deleteSport')})



app.get('*', (req,res)=>{res.render('404')})




app.listen(PORT, console.log(`listening on port ${PORT}`))