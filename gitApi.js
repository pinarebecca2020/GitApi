let input = document.getElementById('input');
const divRepo = document.getElementById('reposDiv');
const root = document.getElementById('root');
let btn = document.getElementById('btn');
let error = document.createElement('img');
error.src = "C:/Users/adari/Documents/RebeccaResilia/GitApi/imagens/baixados.jpg";



class UserModel {
    constructor() {
        this._user = "";
        this._picture = "";
    }
    getUser() {
        return this._user;

    }
    getPicture() {
        return this._picture;
    }
    setUser(response) {
        this._user = response.login;
        this._picture = response.avatar_url;
    }
    buscaDados(user) {
        const buscarDados = new XMLHttpRequest();
        buscarDados.open('GET', `https://api.github.com/users/${user}`, false);

        buscarDados.addEventListener('load', () => {

            if (buscarDados.status == 200) {
                let response = JSON.parse(buscarDados.responseText);
                this.setUser(response);
            }

        });
        buscarDados.send();
    }
}


class RepositorioModel {
    constructor() {
        this._repositorio = "";
    }

    buscarDadosRepo(user) {
        const buscarDados = new XMLHttpRequest();

        buscarDados.open('GET', `https://api.github.com/users/${user}/repos`, false);

        buscarDados.addEventListener('load', () => {

            if (buscarDados.status == 200) {
                let response = JSON.parse(buscarDados.responseText);
                this._repositorio = response;

            } else {

                divRepo.appendChild(error);
            }
        });
        buscarDados.send();
    }
}


class UserController {

    searchUser(user) {
        let modelUser = new UserModel;
        modelUser.buscaDados(user);
        let viewUser = new UserView;
        viewUser.desenharUser(modelUser);


    }
    searchRepositorio(user) {
        let repositorioModel = new RepositorioModel
        repositorioModel.buscarDadosRepo(user)

        let repositorioView = new RepositorioView
        repositorioView.desenharRepo(repositorioModel)
    }

}



class UserView {

    desenharUser(info) {
        let ele = document.createElement('img');
        ele.classList.add('avatar');
        ele.src = info.getPicture();
        let ele1 = document.createElement('p');
        ele1.classList.add('nome');
        ele1.textContent = info.getUser();
        root.appendChild(ele);
        root.appendChild(ele1);
    }



}


class RepositorioView {

    desenharRepo(model) {
        let repositorios = model._repositorio;
        for (let r of repositorios) {
            let p = document.createElement('a');
            p.classList.add('link');
            p.innerText = r.name;
            p.href = r.html_url;
            divRepo.appendChild(p);

            let para = document.createElement('p');
            para.classList.add('language')
            para.innerText = r.language;
            divRepo.appendChild(para);

        }
    }


}



btn.addEventListener('click', function() {
    let user = input.value;
    let controller = new UserController
    controller.searchUser(user);
    controller.searchRepositorio(user);
});