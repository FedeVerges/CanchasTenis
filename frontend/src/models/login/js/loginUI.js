import LoginService from './loginService'


const loginService = new LoginService()


class loginUI {

    async renderLogin(){
        const loginContainer = document.getElementById('loginContainer')
        loginContainer.innerHTML = '';
        const div = document.createElement('div');
        div.className = 'container-sm my-5';
        div.innerHTML = `
        <div class="container-sm my-5">
        <div class="row">
          <div class="col-1">
          </div>
          <div class="col-10">
            <h1 class="text-center titulo">Iniciar sesión</h1>
            <form>
              <div class="form-group">
                <label for="usuario">Usuario</label>
                <input type="text" class="form-control" id="usuario" aria-describedby="emailHelp">
                <small id="emailHelp" class="form-text text-muted">Este usuario es proveido por la La Strega</small>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password">
              </div>
              <button type="submit" class="btn btn-primary">Ingresar</button>
            </form>
          </div>
          <div class="col-1">
          </div>
        </div>
      </div>
        `;
    }

    async validateUser (){
        // Obtener los datos del DOM.
        loginService.loginUser(usuario, constrasenia);
    }
}

export default loginUI