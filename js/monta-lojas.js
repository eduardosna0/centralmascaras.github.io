function arrumaArray(array){
    var lojas = {
        Nome: array.Nome,
        cpf_cnpj: array.CPF_CNPJ,
        Endereco : array.Endereco +"\n"+ array.Cidade +"/"+  array.Estado,
        cep : array.CEP,
        Telefone : array.Telefone,
        Email : array.Email
    }
    return lojas;
}



function montaLojas(responseApi, classCss){
    var lojas = document.querySelector(classCss)
    var resposta = responseApi;
    var lojasLista = JSON.parse(resposta);
    var listaLojasArrumada = []                        
    lojasLista.forEach(function(loja){
        listaLojasArrumada.push(arrumaArray(loja));                
    })            
    listaLojasArrumada.forEach(function (loja){                
        lojas.appendChild(montaColunaCard(loja));
    })            
}

function montaColunaCard(lojasResponse){
    var coluna = document.createElement("div");
    coluna.classList.add('col', 'mb-4', 'col-md-6', 'col-lg-4');
    coluna.appendChild(montaMeuCard(lojasResponse))
    return coluna;
}

function montaMeuCard(conteudo){
    var meuCard = document.createElement("div");
    meuCard.classList.add('meu-card', 'lojas');    
    meuCard.appendChild(montaCardHeader())
    meuCard.appendChild(montaCardDivisor())
    meuCard.appendChild(montaCardContent(conteudo.Nome, conteudo.Endereco, conteudo))    
    return meuCard;

}

function montaCardHeader(){
    var cardHeader = document.createElement("div");
    cardHeader.classList.add('meu-card-header');
    cardHeader.appendChild(insereImagem())
    return cardHeader;    
}

function montaCardDivisor(){
    var cardDivisor = document.createElement("div");
    cardDivisor.classList.add('meu-card-divisor');
    return cardDivisor;
}

function montaCardContent(titulo, endereco, lojas){
    var cardContent = document.createElement("div");    
    cardContent.classList.add('meu-card-content');
    cardContent.appendChild(montaTitulo(titulo))
    cardContent.appendChild(montaParagrafo(endereco))
    cardContent.appendChild(montaCardFooter(lojas.Email, lojas.Telefone))
    cardContent.classList.add('loja-conteudo')
    return cardContent;

}

function montaCardFooter(email, telefone){
    var cardFooter = document.createElement("div");
    cardFooter.classList.add('meu-card-footer');
    cardFooter.appendChild(montaParagrafo(email));   
    cardFooter.appendChild(montaParagrafo(telefone));
    return cardFooter;
}

function montaTitulo(titulo){
    var h4 = document.createElement("h4")
    h4.classList.add('nome-loja')
    h4.innerHTML = titulo;
    return h4;
}

function montaParagrafo(texto){
    var paragrafo = document.createElement("p");
    paragrafo.innerHTML = texto
    return paragrafo
}


function insereImagem(){
    var imagem = document.createElement("img");
    imagem.src = "img/lojas-img.png";
    imagem.classList.add("meu-card-image-header")
    imagem.alt = "Sem Imagem";
    return imagem;
}