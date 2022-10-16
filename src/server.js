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

soap.createClient(url, params, function (err, client) {
    if (err) throw err;
    client.ListarAutor({}, function (err, result) {  //   {} = args = req.body
        if (err) throw err;
        // console.log("Function: ",result.ListarResult.diffgram.NewDataSet);

        // console.log(result.ListarAutorResult.diffgram.NewDataSet.Table);
        resultado = result.ListarAutorResult.diffgram.NewDataSet.Table;
        // final = resultado.splice(0,1)
        console.log(resultado) 
        // req.resulatadoSoap = resultado
    });
});


app.get('/', (req, res) => {
    res.json({ final })
})


app.listen(1000, () => {
    console.log("listen on 1000")
})