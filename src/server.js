import express from 'express';
import soap from 'soap'
const app = express();
import xml2js from 'xml2js';

// Get data
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// var url = 'http://dais-w-05.somee.com/Categoria.asmx?wsdl';
var url = 'http://dais-w-02.somee.com/WSCliente.asmx?wsdl';
var params = {
    Username: "hespetia",
    Password: "Dais2022II"
}

let resultado = {}
let final = {}

    /*
    //promises
    soap.createClientAsync(url).then((client) =>{
        return client.AgregarAutor(args);
    }).then((resultado) =>{
        console.log(resultado)
    })


    //async
    var client = await soap.createClientAsync(url);
    var resultado = await client.AgregarAutor
    console.log(res)
    */

soap.createClient(url, {}, function (err, client) {
    if (err) throw err;
    client.ListarAutor({}, function (err, result) {  //   {} = args = req.body
        if (err) throw err;
        // console.log("Function: ",result.ListarResult.diffgram.NewDataSet);

        // console.log(result.ListarAutorResult.diffgram.NewDataSet.Table);
        resultado = result.ListarAutorResult.diffgram.NewDataSet.Table;
        // final = resultado.splice(0,1)
        // console.log(resultado) 
        // req.resulatadoSoap = resultado
        
    });
});


app.get('/', (req, res) => {
    res.json({ final: resultado })
})

app.post('/illust', async (req, res) => {
    const codAutor = req.body.CodAutor;
    const apellidos = req.body.Apellidos;
    const nombres = req.body.Nombres;
    const nacionalidad = req.body.Nacionalidad;
    const args = { codAutor, apellidos, nombres, nacionalidad }


})

app.listen(1000, () => {
    console.log("listen on 1000")
})

//https://stackoverflow.com/questions/8217419/how-to-determine-if-javascript-array-contains-an-object-with-an-attribute-that-e
