import router from './routes/routes.js'
import express from 'express'
import { Server as HTTPServer } from 'http'
import { Server as IOServer } from 'socket.io'
import socket from './utils/socket.js'
import { engine } from 'express-handlebars';
import session from './utils/session.js'

import passport from './utils/passport.js'
import {User} from "./models/user.js"
import { auth } from './controllers/userController.js'

const app = express()
const http = new HTTPServer(app)
const io = new IOServer(http)
socket(io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session);
app.use(passport.initialize())
app.use(passport.session())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.get('/', auth ,async (req, res) => {
  let idSession = await req.session.passport.user
  let infoUser = await User.findOne({ '_id': idSession })
  const userInfo = infoUser.email;
  
    if(userInfo){
      res.render('form', {userInfo}); 
    }
    else{ 
      res.render('login')
    }
})

app.use('/api', router);

const PORT = process.env.PORT || 8080
const connectedServer = http.listen(PORT, () => {
  console.log(`Servidor http con web sockets, escuchando en puerto: ${PORT}`)
})
connectedServer.on("error", error => console.log)
