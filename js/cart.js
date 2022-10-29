let listProducts = [];

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
  };
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
})