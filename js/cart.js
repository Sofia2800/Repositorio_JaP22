let listProducts = [];
let sumSub = 0;
let comissionPercentage = 0.15;
let DOLLAR_SYMBOL = "USD ";


    

function showCart() {
  let htmlContentToAppend = "";
  for (let i = 0; i < listProducts.length; i++) {
    let product = listProducts[i];
    htmlContentToAppend += `
   
          <td><img src="${product.image}" width=80 ></td>
          <td>${product.name}</td>
          <td><span>${product.currency} </span><span class="priceUnit">${product.unitCost}</span></td>
          <td> <input onchange="subtotalizar()" name="btnCount"  style="width:55px"  type="number" min="1" value="1"></input></td>
          <th><span>${product.currency} </span><span class="subtotales"</span></th>
    `;
}

document.getElementById("cart").innerHTML =  htmlContentToAppend;
}

function subtotalizar(){
  let productCount = document.getElementsByName("btnCount");
  let price = document.getElementsByClassName("priceUnit");
  let subtotalHTML = document.getElementsByClassName("subtotales");
    
  
  let variable = 0;
  for (let i=0; i<productCount.length; i++){
    variable = parseFloat(price[i].innerHTML) * parseFloat(productCount[i].value);
    subtotalHTML[i].innerHTML = variable;

    document.getElementById("cUnitPorUnidad").innerHTML = DOLLAR_SYMBOL + variable;
    document.getElementById("costEnvio").innerHTML = DOLLAR_SYMBOL + variable * comissionPercentage;  
    document.getElementById("totalCost").innerHTML = DOLLAR_SYMBOL + (variable + (variable * comissionPercentage));
  };
}


function validarOpPay() {

  let term1VL = document.getElementById("terminos1").checkValidity();
  let numberCardVL = document.getElementById("numberCard").value;
  let numberCardState = document.getElementById("numberCard").disabled;
  let numberCodeVL = document.getElementById("numberCode").value;
  let numberCodeState = document.getElementById("numberCode").disabled;
  let numberExpVL = document.getElementById("numberExp").value;
  let numberExpState = document.getElementById("numberExp").disabled;
  let term2VL = document.getElementById("terminos2").checkValidity();
  let numberCountVL = document.getElementById("numberCount").value;
  let numberCountState = document.getElementById("numberCount").disabled;

  
  if(term1VL===true && numberCountState === true && numberCardVL!="" && numberCodeVL!="" && numberExpVL!="") {
      document.getElementById("validar").style.display = "none" ;
  }else if(term2VL===true && numberCardState === true && numberCodeState === true && numberExpState === true && numberCountVL!=""){
    document.getElementById("validar").style.display = "none" ;
  }else{
    document.getElementById("validar").style.display = "inline";
  }
}

function comprado(){
  let completado= "";
    completado += `
    <div class="alert alert-success" role="alert">
    ¡Has comprado con éxito! Volver al <a href="index.html" class="alert-link">Inicio</a>
  </div> `
  document.getElementById("completed").innerHTML= completado;
}

  //validar formulario
  var form = document.getElementById("formulario");
form.addEventListener('submit', function (event) {

  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
  }else{
    comprado();
  }
 
  form.classList.add('was-validated')
});

function desabilitar(){

  if(document.getElementById("terminos1").checked === true){
    document.getElementById("numberCard").disabled = false;
    document.getElementById("numberCode").disabled = false;
    document.getElementById("numberExp").disabled = false;
    document.getElementById("numberCount").disabled = true;
  }else{
    document.getElementById("numberCount").disabled = false;
    document.getElementById("numberCard").disabled = true;
    document.getElementById("numberCode").disabled = true;
    document.getElementById("numberExp").disabled = true;
  }
  
}

document.addEventListener("DOMContentLoaded", () => {
    getJSONData(CART_INFO_URL + 25801 + EXT_TYPE).then(function (resultObj) {
      if (resultObj.status === "ok") {
        listProducts = resultObj.data.articles;
        showCart();
        subtotalizar();
        console.log(listProducts);
      } else {
        alert("Algo salió mal: ");
      }
    });
    
    document.getElementById("premiumradio").addEventListener("change", function(){
      comissionPercentage = 0.15;
      subtotalizar();
  });
  
  document.getElementById("expressradio").addEventListener("change", function(){
      comissionPercentage = 0.07;
      subtotalizar();
  });

  document.getElementById("standardradio").addEventListener("change", function(){
      comissionPercentage = 0.05;
      subtotalizar();
  });



})