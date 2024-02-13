const express = require('express');
const database = require('./database');
const app = express();

// -- Movies endpoints

// REGLAS (RESTful API)
// 1. Todos los endpoints deben de tener el mismo "namespace"
// 2. El namespace siempre debe de estar en plural

// 1. Get Movies (Leer películas)
app.get('/movies', function(req, res) {
    return res.status(200).json(database.movies);
});

app.get('/movies/:id', function(req, res) {
    // const id = req.params.id
    // NOTA: Cuando leemos un valor de req.params
    // SIEMPRE llega como string
    const { id } = req.params;
    const movie = database.movies.find(function(movie) {
        return Number(id) === movie.id
    });

    if (!movie) {
        return res.status(404).json({
            message: 'No existe la película con el ID ' + id,
        })
    }
    return res.status(200).json(movie);
})
 
// Endpoint estático
// La repuesta no depende de algún parámetro o variable
// que se envié en la petición
app.get('/', function(req, res) {
    return res.status(200).json({
        message: 'Hola Mundo Mujer Digital!!!!!!'
    });
});

// Endpoints dinámicos
// La respuesta depende de algún valor proporcionado
// en la petición
// En este caso estoy utilizando QUERY PARAMS
app.get('/:name', function(req, res) {
    const { name } = req.params;
    if (name.length < 3) {
        return res.status(400).json({
            message: 'El nombre debe de tener al menos 3 caracteres'
        })
    }
    return res.status(200).json({
        message: `Hola ${name}, bienvenida a mi API`
    })
});


const PORT = 8080;
// funciones anónimas -> callbacks
app.listen(PORT, function() {
    console.log(`La API está corriendo en el puerto ${PORT}`);
}); // callback

// Query Params
// https://skills.yourlearning.ibm.com/activity/PLAN-3359D9276584 <- query params
// https://skills.yourlearning.ibm.com/activity/:planId


// Query Strings
// https://www.youtube.com/watch ?v=u5gWfiRnoMk <- query strings
// https://www.youtube.com/watch ?v=ZphtP22urW8 <- query strings

// Body (POST, PUT y PATCH) GET y DELETE no pueden tener un cuerpo
// https://www.google.com/search
// ?q=mujer+digital
// &sca_esv=7a12701d0fbd3cd4&sca_upv=1
// &sxsrf=ACQVn09ajPdMOFzdEJKJ6zygwpX1HVH1Qw%3A1707851560560&source=hp
// &ei=KL_LZbmWIJLHkPIPnYeukAk&iflsig=ANes7DEAAAAAZcvNONyhM7cJQcVe4Q_sQEUE-S64c4hJ
// &ved=0ahUKEwi5yuDsgqmEAxWSI0QIHZ2DC5IQ4dUDCA0
// &uact=5
// &oq=mujer+digital
// &gs_lp=Egdnd3Mtd2l6Ig1tdWplciBkaWdpdGFsMgoQIxiABBiKBRgnMgoQIxiABBiKBRgnMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIIEAAYgAQYywEyBRAAGIAEMgUQABiABDIFEAAYgARI_RdQAFiYFnADeACQAQCYAaoBoAHhD6oBBDAuMTa4AQPIAQD4AQHCAgQQIxgnwgILEAAYgAQYsQMYgwHCAhEQLhiABBixAxiDARjHARjRA8ICDhAuGIAEGMcBGK8BGI4FwgIREC4YgAQYigUYsQMYgwEY1ALCAhQQLhiABBixAxiDARjHARivARiOBcICERAuGIAEGLEDGMcBGK8BGI4FwgIIEAAYgAQYsQPCAggQLhiABBixA8ICCxAuGIAEGLEDGNQCwgIOEC4YgwEYsQMYgAQYigXCAggQLhixAxiABMICCxAuGIMBGLEDGIAEwgILEC4YgAQYsQMYgwHCAgUQLhiABMICCBAuGNQCGIAEwgIOEC4YgAQYywEYxwEYrwHCAgcQIxiwAhgnwgIHEAAYgAQYDQ&sclient=gws-wiz