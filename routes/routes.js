
import { Router } from "express";
const chatProducto = Router();
import { productosRandom } from '../utils/faker.js';

chatProducto.get('/login', (req, res) => {
    let usuario = req.session.userName;
    if(usuario){
        res.redirect('/')  
    }
    else{ 
        res.render('login', {usuario})
    }
})

chatProducto.post('/login', (req, res) => {
    req.session.userName = req.body.nombre;
    res.redirect('/')
})

chatProducto.get('/logout', (req, res) => {
    let infoUser = req.session.userName;
    req.session.destroy(err => {
        if (err) {
            res.send(err);
        }
    })
    res.render('logout', {infoUser});
})



chatProducto.get('/productos-test', async (req, res) => {
    try {
        const productosFaker = productosRandom();
        res.json(productosFaker);
    } catch (err) {
        res.status(500).send(`No se puede recuperar los datos ${err}`);
    }
});

export default chatProducto;