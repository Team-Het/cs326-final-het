// Placeholder server code from express as recommended by the instructions
// Will be updated based of our database later

const express = require('express')
const server = express()
const port = 3000

server.use(express.static('project_code'))

server.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
