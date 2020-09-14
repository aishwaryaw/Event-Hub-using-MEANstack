const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');

const api = require('./routes/api');
const index = require('./routes/index')
const port = 3000;

const app = express();
app.use(cors())
//app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.json()); 

app.use('/api', api);
// app.use('/', index);


app.use('*',function (req, res) {
    res.redirect('/');
});
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});