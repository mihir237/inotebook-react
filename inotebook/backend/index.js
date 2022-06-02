const connectTOMongo = require("./db")
const express = require('express')
var cors = require('cors') 

connectTOMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json()) // It parses incoming JSON requests and puts the parsed data in req.body

// available routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require("./routes/auth"))
app.use('/api/notes', require("./routes/notes"))

app.listen(port, () => {
  console.log(`iNote app listening on port http://localhost:${port}`)
})