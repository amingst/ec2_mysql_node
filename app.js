const express = require('express')
const path = require('path');
const { newInstance, defineModel, syncModel } = require('./db');

const PORT = 3000 || process.env.PORT
const app = express();


const opts = {
    host: 'database-1.ceqtg6wzmn7w.us-east-1.rds.amazonaws.com',
    port: 3306,
    dialect: 'mysql'
}

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

const db = newInstance('my_db', 'root', 'rootpassword', opts);
const User = defineModel(db);
syncModel(db)

const publicpath = path.join(__dirname, '/public/')

app.get('/', (req, res) => {
    res.sendFile(publicpath + "html/index.html")
})

app.post('/submit', (req, res) => {
    const newUser = User.build({ id: 1, username: req.body.username, password: req.body.password })
    console.log(newUser instanceof User);
    console.log(newUser.username);

    newUser.save();
    console.log('Saved')
})

app.listen(PORT, () => console.log(`Server listening on port:${PORT}`));
