var poke_id = 1;

var pokedex = new Image();
pokedex.src = 'img/pokedex.png';
pokedex.classList.add('imagem');

var pokemon = new Image();
pokemon.src = '';
pokemon.classList.add('pokemon');

var pokemon_name = document.createElement('span');
pokemon_name.classList.add('pokemon_name');

var container = document.createElement("div");
container.classList.add('container');
container.appendChild(pokedex);
container.appendChild(pokemon);
container.appendChild(pokemon_name);

document.body.appendChild(container);

var button_next = document.createElement('button');
button_next.innerText = 'Próximo >>';
button_next.classList.add('button_pass');
button_next.addEventListener('click', function(){
    att_pokemon(poke_id+1);
})

var button_prev = document.createElement('button');
button_prev.innerText = "<< Anterior";
button_prev.classList.add('button_pass');
button_prev.addEventListener('click', function(){
    att_pokemon(poke_id-1);
})

var search = document.createElement('input');
search.setAttribute('type','text');
search.setAttribute('placeholder','Buscar Por Nome');
search.classList.add('search');
search.addEventListener('keypress', function (e){
    if(e.key == 'Enter'){
        att_pokemon(search.value);
    }
});

var div_button = document.createElement('div');
div_button.classList.add('div_buttons');

container.appendChild(search);
container.appendChild(div_button);
div_button.appendChild(button_prev);
div_button.appendChild(button_next);

async function req_pokemon(pokemon){
    let url = 'https://pokeapi.co/api/v2/pokemon/';
    //faz a requisição na api com a url + o pokemon pesquisado
    let result = await fetch(url+pokemon);
    if(result.status == 200){
        var dados = result.json();
        return dados;
    }
}

async function att_pokemon(pokemon){
    pokemon_name.innerText = 'Loading..'
    var dados = await req_pokemon(pokemon);
    if(dados){
        console.log(dados);
        let img_animated = dados.sprites.versions['generation-v']['black-white'].animated.front_default;
        let obj = {name: dados.name, img: '', id:dados.id};
        // verificando se a imagen animada existe pois alguns pokemons da api não tem a imagen animada
        if(img_animated != undefined){
            obj.img = img_animated;
        }else{
            let img = dados.sprites['front_default'];
            obj.img = img;
        }
        search.value ='';
        add_pokemon(obj);
    }else{
        //caso não encontrar o pokemon pesquisado
        let obj = {name: 'Não Achei :(', img: 'img/not_found.png', id:0};
        add_pokemon(obj);
    }
}

function add_pokemon(obj){
    poke_id = obj.id;
    pokemon.src = obj.img;
    pokemon_name.innerText = obj.id + " - " +obj.name;
}

att_pokemon(1);



