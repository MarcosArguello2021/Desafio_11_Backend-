import chatProducto from './routes/routes.js'
import express from 'express'
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import socket from './utils/socket.js'
import { engine } from 'express-handlebars';
const app = express()
const http = new HTTPServer(app)
const io = new IOServer(http)
import session from './utils/session.js'

socket(io);
app.use(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', chatProducto);

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.get('/', async (req, res) => {
  let usuario = req.session.userName;
    if(usuario){
      res.render('form', {usuario}); 
    }
    else{ 
      res.render('login')
    }
})

const PORT = process.env.PORT || 8080
const connectedServer = http.listen(PORT, () => {
  console.log(`Servidor http con web sockets, escuchando en puerto: ${PORT}`)
})
connectedServer.on("error", error => console.log)