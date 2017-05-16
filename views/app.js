var productTemplate =
'<h3>Name: <%= name %></h3>'+
'<h3>Price: <%= price %></h3>'+
'<h3>Symbol: <%= symbol %></h3>';

var stocks=[];


var makeTemplate=function(data){
   var li=document.createElement('li');
   var prodList=document.querySelector('.list');
   var compiled=_.template(productTemplate);
   var prodHtml=compiled(data);
   li.innerHTML=prodHtml;
   prodList.insertBefore(li,prodList.firstChild);
}
var updateProducts=function(){
   var productData=stocks[stocks.length-1];
   makeTemplate(productData);
}

var getValues= function(){
   var name=document.querySelector('input[name=namedata]').value;
   var price=document.querySelector('input[type=number]').value;
   var symbol=document.querySelector('input[name=symbol]').value;

   return {
       name:  name,
       symbol:  symbol,
       price:  price
   };
};
var makeList=function(){
   stocks.forEach(function(product){
       makeTemplate(product);
       console.log(product);
   });
};

var getAllProducts= function(){
   fetch('/stocks')
   .then(function(resp){
       return resp.json();

   })
   .then(function(data){
       stocks=stocks.concat(data);
       console.log(stocks);
       makeList();
   });

};
(function(){
   getAllProducts();
   var form=document.querySelector('form');
   form.addEventListener('submit',function(e){
       e.preventDefault();
       var values=getValues();
       console.log(values);
       fetch('/stocks',{
           method:'post',
           headers:{
               'Accept':'application/json',
               'Content-Type':'application/json'
           },
           body:JSON.stringify(values)
       })
       .then(function(resp){
           return resp.json();
       })
       .then(function(createdProduct){
           stocks.push(createdProduct);
           console.log(stocks);
           updateProducts();
       })
       return false;
   })

})();
