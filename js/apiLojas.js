function getApi(){    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://eduardo-chaves.outsystemscloud.com/CoreMascaraDatabase/rest/Fornecedores/GetFornecedores")
    xhr.addEventListener("load", function(){
        if(xhr.status == 200){
            montaLojas(xhr.responseText, ".lista-lojas");                     
        }
        else{                
        }            
    })
    xhr.send();    
}


function getLojasHome(){    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://eduardo-chaves.outsystemscloud.com/CoreMascaraDatabase/rest/Fornecedores/GetFornecedores")
    xhr.addEventListener("load", function(){    
        if(xhr.status == 200){
            document.querySelector(".impossivel-carregar").classList.add("invisivel");            
            var lista = []
            var lojas = document.querySelector(".lista-lojas");
            var listaLojas = JSON.parse(xhr.responseText);
            for (let i = 0; i < 6; i++) {
                lista.push(listaLojas[i]); 
            }            
            lista.forEach(function(loja){
                lojas.appendChild(montaColunaCard(loja));
            })
        }
        else{
            document.querySelector(".impossivel-carregar").classList.remove("invisivel");
        }            
    })
    xhr.send();    
}

