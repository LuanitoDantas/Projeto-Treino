export class Categoria {
    //Encapsulamento
    #nome;
    #valor;
    constructor(nome){
        this.#nome = nome;
        this.#valor = 0;
    }

    //Uso dos Getters
        get valor(){
            return this.#valor;
        }
        get nome(){
            return this.#nome;
        }

    //Manipulação do estado 
    adicionarValor (valor){
        this.#valor += parseFloat(valor);
    }
}

export class ListaGastoPorCategoria{
    #categorias;
    //Rest Operator (quer dizer que pode receber diversas categorias nesse parametro)
    constructor(...categorias){
        this.#categorias = categorias;
    }
    get categorias(){
        return this.#categorias;
    }
    //Progrmação funcional
    obterCategoriaPorNome(nome){
        return this.#categorias.find((categoria) => categoria.nome == nome);
    }
    obterTotal(){
        //Reduce
        return this.#categorias.reduce((total, categoria) => total + categoria.valor, 0);
    }
}