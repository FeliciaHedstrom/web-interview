import express from 'express'
import cors from 'cors'
import todoLists from './routes/todoListsRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(todoLists)

const PORT = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
