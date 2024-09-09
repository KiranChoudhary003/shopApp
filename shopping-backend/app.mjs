import express from 'express'
import router from './src/routes/product.mjs'
import cors from 'cors'
import User from './src/user/user.mjs'

const PORT = process.env.PORT || 8000
const app = express()

const user = new User()

app.use(express.static('public'))
app.use(express.json())
app.use(cors())
app.use(router)

app.post('/api/user/login', user.login)
app.post('/api/user/add', user.add)
app.get('/api/user/read', user.read)

app.listen(PORT, err => err ? console.log(`Their is an error occur ${err}`) : console.log(`Server is running on PORT : ${PORT}`))