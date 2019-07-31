import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Frase({frase}) {
  return(
    <div className="frase">
      <h1>{frase.quote}</h1>
      <p>- {frase.author}</p>
    </div>
  );
}

function App() {

  // state
  const [frase, obtenerFrase] = useState({});

  // console.log(frase); // para ver q tiene el state, en este caso un objeto vacio q viene de useState({})

  // CONSULTA A UNA REST API
  // siempre se utiliza el metodo useEffect que siempre sera un arrow function
  // consultamos usando async and await con axios
  // podemos  ver   ue si tenemos la funcion dentro de useEffect nos arroja un error en la consola, asi que hay q crear la funcion consultaAPI fuera de la funcion useEffect. Seguimos usando el arrow function dentro de useEffect pq es una API

  const consultaAPI = async () => {
    const url = 'https://breaking-bad-quotes.herokuapp.com/v1/quotes';

    const resultado = await axios(url);

    // console.log(resultado);
    // console.log(resultado.data[0]);
    // agregamos el resultado de la API al state (similar a this.setState)
    obtenerFrase(resultado.data[0]);
  }

  useEffect(
    () => {
      consultaAPI()
    }, [] // definimos las dependencias vacias. Las dependencias es lo que se tiene q actualizar cada vez q haya un cambio, pero como no queremos q se acutalize nada, le pasamos un arreglo vacio.
  )

  console.log(frase);

  return(
    <div className="contenedor">
      <Frase frase={frase}/>
    </div>
  );
}

export default App;
