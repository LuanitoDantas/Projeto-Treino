
//Modularização ES
import { Categoria, ListaGastoPorCategoria } from "./classes.js";
import { valorNegativo, atualizarInterface } from "./utils.js";

const gastosPorCategoria = new ListaGastoPorCategoria (
    new Categoria ("Alimentação"),
    new Categoria ("Transporte"),
    new Categoria ("Lazer"),
    new Categoria ("Outros")
)
const matrizGastos = [
   // ["Alimentação", 0],
   // ["Transporte", 0],
   // ["Lazer", 0],
   // ["Outros", 0],
   // ["Total", 0],
]

//Manipulação do DOM
const formulario = document.querySelector("form");

formulario.addEventListener("submit", (evento) =>{
    //Prevenção do comportamento padrão
    evento.preventDefault();

    const valorInformado = formulario.elements.valor.value;
    const categoriaInformada = formulario.elements.categoria.value;

    if(valorNegativo(valorInformado)){
        alert("Valor Invalido. Não pode ser negativo!");
        return;
    }

    const categoria = gastosPorCategoria.obterCategoriaPorNome(categoriaInformada);
    categoria.adicionarValor(valorInformado);

    atualizarInterface(gastosPorCategoria);

   formulario.reset();
})

