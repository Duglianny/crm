

(function() { //PASO 65

  let DB //PASO 77

  let idCliente //PASO 96 para utilizar solamente dentro de las llaves de donde se coloque el valor de la variable 

  const nombreInput = document.querySelector('#nombre') //PASO 88 
  const emailInput = document.querySelector('#email') //PASO 88 
  const telefonoInput = document.querySelector('#telefono') //PASO 88 
  const empresaInput = document.querySelector('#empresa') //PASO 88 

  const formulario = document.querySelector('#formulario')

  document.addEventListener('DOMContentLoaded', ()=>{ //PASO 66

    //conectar base de datos a este archivo 

    conectarDB() //PASO 72 

    //actualizar el registro 

    formulario.addEventListener('submit', actualizarCliente) //PASO 91

    //verificar el id de la URL o leer los datos de la url

    const parametrosURL = new URLSearchParams(window.location.search)  // PASO 67 el new urlparams es un metodo para ver los parametros de una url 

     idCliente = parametrosURL.get('id') //PASO 68 esta variable sera igual a la variable de arriba y dado a que ella es una instancia de urlsearchparams se le coloca o se le pasa el metodo get y se le pasa lo que se quiere obtener que en este caso es el id 

    // console.log(idCliente)

    if(idCliente){ //PASO 69 si hay un id de cliente se ejecuta este codigo 

      setTimeout(()=>{ //PASO 80 se coloca el settimeout debido a que no se pueden conectar a la base de datos y revisar la url al mismo tiempo entonces se coloca que revise la url 1s despues de conectarse a la base de datos 

        obtenerCliente(idCliente)  //PASO 70 lo primerp que hace este codigo es que va a leer la url y si tiene un query string que es el parametro ? y si hay uno llama esta funcion de obtener cliente 

       }, 100)

      

    }

  })


  function actualizarCliente(e){ //PASO 92

    e.preventDefault();  //PASO 93
    
    //validar para editar 

    if(nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || empresaInput.value === ''){ //PASO 94

      imprimirAlerta('Todos los campos son obligatorios', 'error') //PASO 95 

      return
    }

    //ctualizar cliente 

    const clienteActualizado = { //PASO 97 

      nombre: nombreInput.value,
      email: emailInput.value,
      telefono: telefonoInput.value,
      empresa: empresaInput.value,
      id: Number(idCliente)
    }

    // console.log(clienteActualizado)

    const transaction = DB.transaction(['crm'], 'readwrite') //PASO 98

    const objectStore = transaction.objectStore('crm') //PASO 99

    objectStore.put(clienteActualizado) //PASO 100


    transaction.oncomplete = function(){ //PASO 101

      imprimirAlerta('Editado correctamente') //PASO 102

      setTimeout(()=>{ //PASO 104

        window.location.href = 'index.html'

      }, 3000)
    }

    transaction.onerror = function(){ //PASO 103

      imprimirAlerta('hubo un error', 'error')
    }
  }

  function obtenerCliente (id){ //PASO 71 va a tomar un id y como se le esta pasando el idCliente va a tomar este id 

    // console.log(id)

    const transaction = DB.transaction(['crm'], 'readwrite')  //PASO 78

    const objectStore = transaction.objectStore('crm') //PASO 79

    const cliente = objectStore.openCursor() //PASO 80

    cliente.onsuccess = function(e){  //PASO 81  que se halla obtenido correctamente 

      const cursor = e.target.result //PASO 82

      if(cursor){ //PASO 83

        // console.log(cursor.value) // me trae los objetos de la base de datos es decir los resultados  

        if(cursor.value.id === Number(id)){ //PASO 85 para traer el registro actual se crea este div dentro del otro el .id es el id de cada uno ce los clientes si es igual al numero del id el cual el id es lo que se esta obteniendo de la url en idCliente por ende al pasa la revision de la url hace una iteracion en cada uno de los registro y si uno es igual 

          // console.log(cursor.value) // me trae solamente ese registro en especifico es decir el que sea igual al que seleccionamos es el que se va a extraer 

          llenarFormulario(cursor.value) //PASO 86 a esta funcion se le pasa el registro actual para que se llene ese formulario con los datos del objeto actual 
        }  

        cursor.continue()  //PASO 84 me trae todos los clientes ya que esta funcion obtiene un cliente de acuerdo a su id
      }
    }

  }


  function llenarFormulario(datosCliente){ //PASO 87 

    const {nombre, email, telefono, empresa} = datosCliente //PASO 89 extraer nombre de datos clientes que es el valor del cursor.value el cual es el nombre de la propiedad del objeto seria el nombre del cliente lo que escriba en el campo de nombre 

    nombreInput.value = nombre //PAso 90 por ende nombre input que es el campo de nombre sera igual al nombre del cliente que estamos extreayendo de esta manera al editar se llenara este camo automaticamente con ese nombre que se registro el cliente 

    emailInput.value = email

    telefonoInput.value = telefono

    empresaInput.value = empresa
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