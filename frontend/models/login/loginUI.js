import loginService from './loginService'
import LoginService from './loginService'

const loginService = new LoginService()


class loginUI {

    async renderLogin(){
        const loginContainer = document.getElementById('loginContainer')
        loginContainer.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'container-sm my-5';
        // div.innerHTML = 

    }

    async validateUser (){
        // Obtener los datos del DOM.
        loginService.loginUser(usuario, constrasenia);
    }
}