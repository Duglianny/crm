

(function() { //PASO 65

  let DB //PASO 77

  document.addEventListener('DOMContentLoaded', ()=>{ //PASO 66

    //conectar base de datos a este archivo 

    conectarDB() //PASO 72 

    //verificar el id de la URL o leer los datos de la url

    const parametrosURL = new URLSearchParams(window.location.search)  // PASO 67 el new urlparams es un metodo para ver los parametros de una url 

    const idCliente = parametrosURL.get('id') //PASO 68 esta variable sera igual a la variable de arriba y dado a que ella es una instancia de urlsearchparams se le coloca o se le pasa el metodo get y se le pasa lo que se quiere obtener que en este caso es el id 

    // console.log(idCliente)

    if(idCliente){ //PASO 69 si hay un id de cliente se ejecuta este codigo 

      setTimeout(()=>{ //PASO 80 se coloca el settimeout debido a que no se pueden conectar a la base de datos y revisar la url al mismo tiempo entonces se coloca que revise la url 1s despues de conectarse a la base de datos 

        obtenerCliente(idCliente)  //PASO 70 lo primerp que hace este codigo es que va a leer la url y si tiene un query string que es el parametro ? y si hay uno llama esta funcion de obtener cliente 

       }, 1000)

      

    }

  })

  function obtenerCliente (id){ //PASO 71 va a tomar un id y como se le esta pasando el idCliente va a tomar este id 

    // console.log(id)

    const transaction = DB.transaction(['crm'], 'readwrite')  //PASO 78

    const objectStore = transaction.objectStore('crm') //PASO 79

    const cliente = objectStore.openCursor()

    cliente.onsuccess = function(e){

      const cursor = e.target.result

      if(cursor){

        console.log(cursor.value)

        cursor.continue()
      }
    }

  }

  function conectarDB(){ //PASO 73

    const abrirConexion = window.indexedDB.open('crm', 1) //PASO 74 creando la conexion con e otro archivo y la base de datos 

    abrirConexion.onerror = function(){ //PASO 75

      console.log('hubo un error')
    }

    abrirConexion.onsuccess = function(){ //PASO 76

      DB = abrirConexion.result
    }


  }

}) ()