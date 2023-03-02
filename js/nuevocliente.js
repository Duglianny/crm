
(function (){ //PASO 15  se crea un effi en el documento en el cual la pagina de nuevos clientes esta la referencia de este js para que las variables y el codigo de este archivo sea totalmente independoente de los demas 

  let DB //paso 16

  const formulario = document.querySelector('#formulario')  //PASO 24


  document.addEventListener('DOMContentLoaded', ()=>{ //PASO 17 cuando el documento este listo se llama la funcion 

    conectarDB()  //PASO 18 la funcion que va a conectar este documento con la base de datos ya creada en el otro archivo 

    formulario.addEventListener('submit', validarCliente)  //PASO 25
  })


  function validarCliente(e){ //PASO 26

    e.preventDefault(); //PASO 27
    
    // console.log('validando...')

    //leer los inputs para ver lo que el usuario escribe en cada uno de los campos  PASO 28

    const nombre = document.querySelector('#nombre').value
    const email = document.querySelector('#email').value
    const telefono = document.querySelector('#telefono').value
    const empresa = document.querySelector('#empresa').value


    if( nombre === '' || email === '' || telefono === '' || empresa === ''){ //PASO 29 validando 
 
      // console.error('error')   para verificar que todo este conectado y funcionando cprrectamnete 

      imprimirAlerta('Todos los campos son obligatorios', 'error') //PASO 30  llamando la funcion que toma el msj y el tipo 

      return //PASO 31
    }


    //crear un objeto con la informacion para agg a la DB 

    const cliente = { //PASO 45 

      nombre, //esto es igual a nombre : nombre el cual el primer nombre es la llave y el segundo el valor que se le dara de lo que escriba el usuario en ese campo perp gracias al object litearl si la llave y valor se escriben ogual se coloca una sola vez y se sobre entiende lo que se explica arriba 
      email,
      telefono,
      empresa
    }

    cliente.id = Date.now()
    // console.log(cliente)

    crearNuevoCliente(cliente)  //PASO 46 se llama la funcion de crrar cliente y se le pasa el valor de cliente 

  }


  function crearNuevoCliente(cliente){ //PASO 47 se le pasa el cliente completo que es el objet es decir nombre,email,etc 

    const transaction = DB.transaction(['crm'], 'readwrite')   //PASO 48  para agg a la abse de datos nos conectamos a la base de edatos 

    const objectStore = transaction.objectStore('crm') //PASO 49 creando el object store 

    objectStore.add(cliente)  //PASO 50 se le pasa el objeto completo 


    transaction.onerror = function(){ //PASO 51

      console.log('hubo un error')

      imprimirAlerta('hubo un error', 'error')  //PASO 54 
    }


    transaction.oncomplete = function(){ //PASO 52 

      console.log('cliente agregado ')

      imprimirAlerta('el cliente se agrego correctamente ') //PASO 53

      setTimeout(()=>{

        window.location.href = 'index.html' //PASO 55 ojooo una vez aggel cliente a los 3s nos lleve a la ventana o a la pagina de los clientes 

      }, 3000)
    }


  }


})()