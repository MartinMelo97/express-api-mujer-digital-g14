const express = require('express');
const app = express();

app.get('/', function(req, res) {
    return res.status(200).json({
        message: 'Hola Mundo Mujer Digital!'
    });
});

app.get('/:name', function(req, res) {
    const name = req.params.name
    if (name.length < 3) {
        return res.status(400).json({
            message: 'El nombre debe de tener al menos 3 caracteres'
        })
    }
    return res.status(200).json({
        message: `Hola ${name}, bienvenida a mi API`
    })
})

const PORT = 8080;
app.listen(PORT, function() {
    console.log(`La API está corriendo en el puerto ${PORT}`);
});

// Query Params
// https://skills.yourlearning.ibm.com/activity/PLAN-3359D9276584

// Query Strings
