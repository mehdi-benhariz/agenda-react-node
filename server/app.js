const express = require('express')
const app = express()
const port =  process.env.PORT||3000;
const debug = require('debug')('server:server');
const mongoose = require('mongoose');
const morgan = require('morgan');
const {dbURL} = require('./keys');
const eventRoutes= require('./routes/eventRoutes');
const bodyParser =require('body-parser');
const cors = require('cors');
//midileware 
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json());

mongoose.connect(dbURL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        app.listen(port, () => console.log(`Example app listening on port  http://localhost:${port} !`))
    })
    .catch((err)=>{
        console.log(err)
    })


    app.use(eventRoutes);
    app.get('/', (req, res) => res.send('Hello World!'))
