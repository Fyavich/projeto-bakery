var jsonList = {};

var listaDePedidos = [];

class Pedido{
    constructor(cod, item, valor, qtd){
        this.cod = cod;
        this.item = item;
        this.valor = valor;
        this.qtd = qtd;
    }
};

const tableSize = 5;

const dataList = document.getElementById('itemList');
const optionsName = [];
const optionsCod = [];

const carrinho = document.getElementById('listSize');
const somatoriaValores = document.getElementById('somatoria');
var lista = 0;
var somatoria = 0.00;

function inicializar(){
    // Lendo arquivo Json
    fetch('catalogo.json')
        .then(response => response.json())
        .then(jsonData => {
            jsonList = jsonData;

            Object.values(jsonList).forEach(valor => {
                optionsName.push(valor.nome);
            });
        
            Object.values(jsonList).forEach(valor => {
                optionsCod.push(valor.codigo);
            });
        
            for(var i = 0; i<optionsCod.length; i++){
                const optionElement = document.createElement('option');
                optionElement.label = optionsCod[i];
                optionElement.setAttribute('value', optionsName[i]);
                dataList.appendChild(optionElement);
            }

        })
    .catch(error => {
        // Tratar qualquer erro que ocorrer durante o carregamento do JSON
        console.error('Erro ao carregar o arquivo JSON:', error);
    });  
}

inicializar();

function incluirItem(){
    var item = document.getElementById('inputName');
    var itemCod;
    var itemPrice;
    var qtd = document.getElementById('inputQTD');
    
    Object.values(jsonList).forEach(cod => {
        if(cod.nome ===  item.value){
            itemCod = cod.codigo;
            itemPrice = cod.valor;
        }
    });

    var pedido = new Pedido();

    if(item.value == "" || qtd.value == ""){
        alert("Item ou Quantidade não informado!");
    }else{
        pedido.cod = itemCod;
        pedido.item = item.value;
        pedido.valor = itemPrice;
        pedido.qtd = qtd.value;

        listaDePedidos.push(pedido);
    }
        
    listarItens();    
    
    item.value = "";
    qtd.value = "";
}

var listSize = document.getElementById("listSize");
var somatoria1 = document.getElementById("somatoria1");
var somatoria2 = document.getElementById("somatoria2");

function listarItens(){
    const tableRow = document.getElementById('listTable');

    while (tableRow.firstChild){
        tableRow.removeChild(tableRow.firstChild);
    }

    for(var i = 0; i < listaDePedidos.length; i++){
        const newRow = document.createElement('tr');

        for(var j = 0; j < tableSize; j++){
            var tdElement = document.createElement('td');
            var valorUni = listaDePedidos[i].valor;
            var valorTotal = valorUni * parseFloat(listaDePedidos[i].qtd);

            // Código
            if(j == 0)tdElement.innerHTML = listaDePedidos[i].cod;

            // Nome
            if(j == 1) tdElement.innerHTML = listaDePedidos[i].item;

            // Quantidade
            if(j == 2) tdElement.innerHTML = listaDePedidos[i].qtd;

            // Valor Unitário
            if(j == 3) tdElement.innerHTML = valorUni.toFixed(2);

            // Valor Total
            if(j == 4) tdElement.innerHTML = valorTotal.toFixed(2);

            newRow.appendChild(tdElement);
        }

        tableRow.appendChild(newRow);
    }

    listSize.value = listaDePedidos.length;
    
    var total = 0;

    listaDePedidos.forEach(element => {
        total += parseInt(element.qtd) * element.valor;
    });

    somatoria1.value = total.toFixed(2); 
    somatoria2.value = total.toFixed(2); 
}

function removerItem(){ 
    var itemID = prompt("Digite o Código do Item:");
    var removerIndex;
 
    listaDePedidos.forEach(function (elemento, index){
        if(elemento.cod == parseInt(itemID)){
            removerIndex = index;
        }
    });

    listaDePedidos.splice(removerIndex, 1);

    listarItens();
}

var recebido = document.getElementById('valorRecebido');
var troco = document.getElementById('troco');

function calcTroco(){   
    var valorRecebido = recebido.value;
 
    var valorTroco = valorRecebido - parseFloat(somatoria2.value);
    
    troco.value = valorTroco.toFixed(2);
}

function concluirVenda(){

    listaDePedidos.splice(0, listaDePedidos.length);

    listarItens();

    recebido.value = "";
    troco.value = 0.00;
}