console.log("hola mundo");


/*Al cargar la pagina asignamos valores a las variables del script que se corresponden con los campos ingresados
en la pagina tras presionar el boton de "crear cuenta" */
window.addEventListener('load', () => {
  const submitButton = document.querySelector('#crear-cuenta-submit');
  submitButton?.addEventListener('click', (event) => {
    event.preventDefault();
    const varNombre= document.querySelector('#text-field-nombre').value;
    const varApellido= document.querySelector('#text-field-apellido').value;
    const varidMago= document.querySelector('#text-field-idMago').value;
    /* verificamos que no tenga los campos vacios*/ 
    if(varNombre !=='' && varApellido !== '' && varidMago !==''){
      /* mañana continuo desde aca */

    }
    else{
          document.querySelector('#error').classList.add('show-error')
    }
  });
   
  /*esta seccion la hice mas que nada para practicar la funcion "Fetch" para conectar con alguna API externa
  o algun endpoint */
  document.querySelector('#get-user').addEventListener('click',getUser);
  function getUser() {
    fetch('https://randomuser.me/api/')
      .then((data) =>{
        return data.json();
      })
      .then((response) =>{
        const userData = response.results[0].name;
        document.querySelector('#user-name').innerHTML = `${userData.title} ${userData.first} ${userData.last}`;  
      })
  }
});
