function getUf(){
    var opcoesUf = document.querySelector("#ufForm");

        var xhr = new XMLHttpRequest();
        xhr.open("GET", "https://eduardo-chaves.outsystemscloud.com/CoreMascaraDatabase/rest/ExportaUf/Uf_s");        
        xhr.addEventListener("load", function(){
            if(xhr.status == 200){                
                var resposta = xhr.responseText;
                var ufs = JSON.parse(resposta);
                ufs.forEach(function(uf){
                    opcoesUf.appendChild(preencheUf(uf));
                })
            }
            else{                
            }            
        })
        xhr.send();    
}

function preencheUf(uf){
    var ufOption = document.createElement("option");    
    ufOption.innerHTML = uf;
    return ufOption;
}





