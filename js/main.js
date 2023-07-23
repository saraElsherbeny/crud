
var productName=document.getElementById("productName");
var productPrice=document.getElementById("productPrice");
var productCategory=document.getElementById("productCategory");
var productDesc=document.getElementById("productDesc");
var productSearch=document.getElementById("search");
var submitBtn=document.getElementById("submitBtn");
var alertName=document.getElementById("alertName");
var products=[];
var inputs= document.getElementsByClassName("form-control");
var currentIndex=0;


productName.onkeyup= function(){
   var rejexName= /^[A-Z][a-z]{2,8}$/;
   if (! rejexName.test(productName.value)){
      submitBtn.disabled="true";
      productName.classList.add("is-invalid");
      productName.classList.remove("is-valid");
      alertName.classList.remove("d-none");
   }
   else{
      submitBtn.removeAttribute("disabled");
      productName.classList.add("is-valid");
      productName.classList.remove("is-invalid");
      alertName.classList.add("d-none");
   }
}





if(JSON.parse(localStorage.getItem("productsList"))!=null){
   products=JSON.parse(localStorage.getItem("productsList"));
   displayProduct();
}


submitBtn.onclick = function(){
   if(submitBtn.innerHTML=="add product"){
      addProduct();
   }else{
      updateProduct()
   }
      displayProduct();
      clearForm();
   
 }



 function addProduct(){
    var product=
    {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description:productDesc.value,

    }
         products.push(product);
         localStorage.setItem("productsList",JSON.stringify(products));
 }

 function displayProduct(){
    var trs='';
    for(var i=0; i<products.length;i++){
        trs+=
        `
        <tr>
        <td>${i+1}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>
        <td>${products[i].category}</td>
        <td>${products[i].description}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger p-2">delete</button></td>
        <td><button onclick="getProduct(${i})" class="btn btn-warning p-2">update</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML=trs;
   
 }

 
 function clearForm(){
    for(var i=0;i<inputs.length;i++){
        inputs[i].value='';
     }
 }

 function deleteProduct(index){
  products.splice(index,1);
  displayProduct();
  localStorage.setItem("productsList",JSON.stringify(products));
 }


 productSearch.onkeyup= function(){
   var trs='';
   var val = productSearch.value;
   for(var i=0; i<products.length;i++){
  if( products[i].name.toLowerCase().includes(val.toLowerCase())){
   trs+=
   `
   <tr>
   <td>${i+1}</td>
   <td>${products[i].name}</td>
   <td>${products[i].price}</td>
   <td>${products[i].category}</td>
   <td>${products[i].description}</td>
   <td><button onclick="deleteProduct(${i})" class="btn btn-danger p-2">delete</button></td>
   <td><button onclick="deleteProduct(${i})" class="btn btn-warning p-2">update</button></td>
   </tr>
   `
}
document.getElementById("tableBody").innerHTML=trs;
  }
 }

function getProduct(index){
  
   productName.value=products[index].name ;
   productPrice.value=products[index].price ;
   productCategory.value=products[index].category;
   productDesc.value=products[index].description ;
   submitBtn.innerHTML="update product";
   currentIndex=index;

}

function updateProduct(){
   var product=
   {
       name:productName.value,
       price:productPrice.value,
       category:productCategory.value,
       description:productDesc.value,

   }
   products[currentIndex]=product;
   localStorage.setItem("productsList",JSON.stringify(products));
  
}