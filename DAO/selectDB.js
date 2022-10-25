import { Schema } from "mongoose";

let arrayDB = ['txt','firebase','mongo'];
let cambiarBase = arrayDB[0]; //para probar cambiar el indice del arrayDB por : 0, 1, 3;

let chatDao;

switch (cambiarBase) {
    case 'txt':
        const { ContenedorArchivo } = await import('../containers/ContenedorArchivo.js');
        chatDao = new ContenedorArchivo('chat.txt');
        break;
    case 'firebase':
        const { ContenedorFirebase } = await import('../containers/ContenedorFirebase.js');
        chatDao = new ContenedorFirebase('chat');
        break;
    case 'mongo':
        const ContenedorMongoDb = await import('../containers/ContenedorMongoDb.js');
        chatDao = new ContenedorMongoDb('chat', chatSchema);
        break;
    default:
        // do nothing;           
        break
}

const chatSchema = Schema({
    author: {
        id: {
            type: String,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        apellido: {
            type: String,
            required: true
        },
        edad: {
            type: String,
            required: true
        },
        alias: {
            type: String,
            required: true
        },
        avatar: {
            type: String,
            required: true
        }
    },
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: false,
    versionKey: false
})

export default chatDao;