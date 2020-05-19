/*pega todos os itens de uma string e deixa só os numeros e retorna esta nova string*/
function intsDeString(string){
    nova_string = ""
    for (var i = 0; i < string.length; i++) {
        if(!isNaN(parseInt(string[i], 10))){            
            nova_string += string[i];            
        }                        
    }
    return nova_string;  
}