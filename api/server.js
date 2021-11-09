const express = require('express')
const app = express();
const db = require('./config/db')
const routes = require('./routes/index.js')

app.use('/api', routes)

db.sync({force: true})
.then(() => app.listen(3000, () => {
    console.log('listen on port 3000')
}))