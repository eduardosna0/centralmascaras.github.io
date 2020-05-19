/* Altera campos de pessoa fisica/juridica*/

var isCpf = document.querySelector('#pessoaFisica')
var isCnpj = document.querySelector('#pessoaJuridica')

isCpf.addEventListener("click", function (){
    document.querySelector("#cpf").classList.remove("invisivel")
    document.querySelector("#cnpj").classList.add("invisivel")
    document.querySelector("#formNomeLabel").innerHTML = "Nome"
    document.getElementsByName('NomeFormulario')[0].placeholder="Ex.: Eduardo Chaves";
    
})

isCnpj.addEventListener("click", function (){
    document.querySelector("#cpf").classList.add("invisivel")
    document.querySelector("#cnpj").classList.remove("invisivel")
    document.querySelector("#formNomeLabel").innerHTML = "Razão Social"
    document.getElementsByName('NomeFormulario')[0].placeholder="Ex.: Eduardo Company Ltda"
    
})


/*Salva o cadastro do usuario na api*/

var form = document.querySelector('#form-cadastro')
var botaoAdcionar = document.querySelector('#submit-formulario');

botaoAdcionar.addEventListener("click", function(){
    event.preventDefault();
    
    var pessoaTipo = document.getElementById('pessoaFisica').checked ? "Física" : "Jurídica";    
    var formulario = extraiDadosForm(form, pessoaTipo);
    
    var formIsValid = validaForm(formulario)
    
    if(formIsValid.length == 0){
        formulario = JSON.stringify(formulario);
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "https://eduardo-chaves.outsystemscloud.com/CoreMascaraDatabase/rest/Fornecedores/CreateFornecedores?Fornecedores="+formulario)
        xhr.send("https://eduardo-chaves.outsystemscloud.com/CoreMascaraDatabase/rest/Fornecedores/CreateFornecedores?Fornecedores="+formulario)
        xhr.addEventListener("load", function(){
            if(xhr.status == 200){ 
                document.querySelector("#mensagens-erro").textContent = "";
                document.querySelector('#mensagem-sucesso').classList.remove("invisivel")
                form.reset();                              
            }
        })     
        
    }
    else{
        exibeMensagemErros(formIsValid);
        return;               
    }
})


function extraiDadosForm(form, pessoaTipo){
    var cpfOrCnpj = ""
    if(pessoaTipo == "Física"){
        cpfOrCnpj = form.cpfForm.value;        
    }
    else{
        cpfOrCnpj = form.cnpjForm.value
        
    }    
    var fornecedor = {
        Nome : form.nomeForm.value,
        PessoaTipo : pessoaTipo,
        cpf_cnpj : cpfOrCnpj,
        Endereco : form.enderecoForm.value,
        Cidade : form.cidadeForm.value,
        Estado : form.ufForm.value,
        cep : intsDeString(form.cepForm.value),
        Telefone : form.contatoForm.value,
        Email : form.emailForm.value,
        IsDoador : form.isDoador.value,
    }
    return fornecedor;
}


function validaForm(form){    
    
    
    var erros = []
    if(validaCamposEmBranco(form).length > 0){
        erros = (validaCamposEmBranco(form))
        return erros;
    }

    if(validaCpfCnpj(form.cpf_cnpj, form.PessoaTipo).length > 0){
        erros = (validaCpfCnpj(form.cpf_cnpj, form.PessoaTipo));
        return erros;
    }
    if(validaCep(form.cep).length > 0){
        erros = validaCep(form.cep)
        return erros;
    }
    return erros;
}


function validaCep(CEP){
    var erros = []
    var novo_cep = intsDeString(CEP)
    if(novo_cep.length == 8){
        return erros;
    }
    else{
        erros.push("CEP informado inválido.")
    }

}

function validaCamposEmBranco (form){
    var erros = [];
    if (form.Nome.length == 0){
        erros.push("Nome/Razão Social não informado");
    }
    if (form.cpf_cnpj.length == 0){
        erros.push("CPF/CNPJ deve ser informado");
    }
    if (form.Endereco.length == 0){
        erros.push("Endereço deve ser informado");
    }
    if (form.Cidade.length == 0){
        erros.push("Cidade deve ser informada");
    }
    if (form.Telefone.length == 0){
        erros.push("Telefone deve ser informado");
    }
    if (form.Email.length == 0){
        erros.push("Email deve ser informado");
    }
    if (form.cep.length == 0){
        erros.push("CEP deve ser informado.");
    }
    return erros;  
}


function validaCpfCnpj (cpfOrCnpj){
    var novo_cpfCnpj = intsDeString(cpfOrCnpj)
    var erros = []      
        
    if(novo_cpfCnpj.length == 11){
        return erros;
    }
    if(novo_cpfCnpj.length == 14){
        return erros;
    }
    else{
        erros.push("CPF/CNPJ informado Inválido")      
    }
    return erros;

}


function exibeMensagemErros(erros){
    var ul = document.querySelector("#mensagens-erro");
    ul.innerHTML = ""    
    erros.forEach(function(mensagem){
        var li = document.createElement("li");
        li.textContent = mensagem;        
        ul.appendChild(li);
        }
    )
}

