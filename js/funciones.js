

function conectarDB (){  //PASO 19 creando la funcipn para conectar es el mismo codigo que en el otro archivo aqui si no hay base de datos la crea y si la hay la conecta 

  const abrirConexion = window.indexedDB.open('crm', 1)  //PASO 20 en este caso como ya hay base de datos la conecta a ese valor que le esta os pasando que es crm version 1

  abrirConexion.onerror = function(){ //PASO 21

    console.log('hubo un error')
  }

  abrirConexion.onsuccess = function(){ //PASO 22

    DB = abrirConexion.result  //PASO 23
  }

}


function imprimirAlerta (mensaje, tipo){ //PASO 32

  const alerta = document.querySelector('.alerta')  //PASO 43 

  if(!alerta){ //PASO 44 si no hay una alerta previa muestra todo estos que esta dentro de este div para que no aparezca la alerta multiple veces 

    // crear la alerta 

  const divMensaje = document.createElement('div')  //PASO 33

  divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta')  //PASO 34


  if(tipo === 'error'){ //PASO 35

    divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700') //PASO 36

  } else{

    divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700')  //PASO 37
  }

  divMensaje.textContent = mensaje  //PASO 38

  formulario.appendChild(divMensaje) //PASO 40


  setTimeout (() =>{ //PASO 41

    divMensaje.remove() //PASO 42 

  }, 3000)

  }

  
}