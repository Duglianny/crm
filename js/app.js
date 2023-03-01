

(function(){ //PASO 1 el ifii para que no se puedan importar las variables entre archivos 

  let DB //PASO 9 donde se va a almacenar el valor de la base de datos 

  document.addEventListener('DOMContentLoaded', ()=>{ //PASO 2

    crearDB() //PASO 3 llamando la funcion de crear la base de datos una vez este listo el documento 

    if(window.indexedDB.open('crm', 1)){ //PASO 56 este codigo se va a ejecutar unicamente si la base de datos existe 

      obtenerClientes() //PASO 57 
    }

  })


  function obtenerClientes(){ //PASO 58

    const abrirConexion = window.indexedDB.open('crm', 1) //PASO 59 creando la conexion con e otro archivo y la base de datos 

    abrirConexion.onerror = function(){ //PASO 60

      console.log('hubo un error')
    }

    abrirConexion.onsuccess = function(){ //PASO 61

      DB = abrirConexion.result

      const objectStore = DB.transaction('crm').objectStore('crm') //creando el object store 

      objectStore.openCursor().onsuccess =  function(e){  //PASO 62  como es listar en la lista de clientes se utilizan los cursores en caso de que el cursor se habra correctamente 

        const cursor =  e.target.result //el resultado o lo que se haya ejecutado por medio del evento de esta funcion  PASO 63 

        if(cursor){ //PASO 64 para traernos los datos o registros  de index DB 

          // console.log(cursor.value) //me trae el objeto mas reciente 

          const {nombre, email, telefono, empresa, id} = cursor.value //extraer los datos de cursor.value

          const listadoClientes =  document.querySelector('#listado-clientes')

          listadoClientes.innerHTML += ` <tr>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
              <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
              <p class="text-sm leading-10 text-gray-700"> ${email} </p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
              <p class="text-gray-700">${telefono}</p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
              <p class="text-gray-600">${empresa}</p>
          </td>
          <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
              <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
              <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900">Eliminar</a>
          </td>
          </tr>
          `;  //para colocar todo el html de los registros de l base de datos  en el ultimo td en el enlace de editar se le pasa la referencia el href que al dar editar nos debe de llevar a la pagina de editar y el ? es una forma de pasar parametroa a la url y se le esta pasando un id que sera igual a la variable de id 

          cursor.continue() //pero con continue me trae el siguiente y asi todos se pone en cada posicion de la base de edatos y me trae ese registro 

        }else{

          console.log('no hay mas registros...')
        }
      }
    }


  }

  //crear la base de datos de indexDB

  function crearDB (){  // PASO 4 funcion que creara la base de datos 

    const crearDB = window.indexedDB.open('crm', 1)  // PASO 5 al ser una constante se puede llamar igual la funcion y el igual a la creacion de la base la cual  se llamara crm y sera la version 1 

    crearDB.onerror = function(){ //PASO 6 la variable. onerror hara esta funcion 

      console.log('hubo un error ') //PAOS 7
    }

    crearDB.onsuccess = function(){ //PASO 8

      DB = crearDB.result  //PASO 10 la variable que guardara los valores es igual a la variable que creo la base de datos . result que es el resutado 

    }


    crearDB.onupgradeneeded = function(e){ //PASO 11  codigo que se ejecuta una sola vez es decir cuando se crea la base de datos va a registrar todas las columnas 

      const db = e.target.result  //PASO 12 la nueva variballe sera igual a el resultado de esta funcion una vez se cree la base de datos 

      const objectStore = db.createObjectStore('crm', {keyPath: 'id', autoIncrement: true })  //PASO 13 creando el objectStore en una variable el cual se le da el nombre y un objeto con unas caracteristicas como el keypath el cual es la llave principal que se le esta pasando el id ya que se van a eliminar y editar los clientes y el autoincremenr para que se vayan agg los clientes a medida que uno los vaya anotando 


      objectStore.createIndex('nombre', 'nombre', {unique:false}) //PASO 14 para creando las columnas  donde vamos a escribir se le da un nombre luego el keypath tambien sera nombre y se le d un objeto con condiciones en este caso que el nombre no se aunico ya que pueden haber varios personas llamados igual 

      objectStore.createIndex('email', 'email', {unique: true})

      objectStore.createIndex('telefono', 'telefono', {unique: false})

      objectStore.createIndex('empresa', 'empresa', {unique: false})

      objectStore.createIndex('id', 'id', {unique: true})

      console.log('DB lista y creada')

    }
  }

})()