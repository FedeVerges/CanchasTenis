function login(){
  var user = document.getElementById('usuario').value;
  console.log(user);
  if(user == "admin"){
    location.href = './Reserva_Cancha_Usuario_Administrador.html';
  }else if(user == "socio"){
    location.href = './Reserva_Cancha_Socio.html';
  }else{
    alert("Usuario incorrecto");
  }
}
