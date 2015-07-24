function Cart(){
  this.cartItems = [];
}
Cart.prototype.addCartItem = function(cartItem){
   var existed = findCartItem(this.cartItems, cartItem.item.barcode);
   if(existed){
     existed.count += cartItem.count;
   } else{
     this.cartItems.push(new CartItem(cartItem.item, cartItem.count));
   }
};

function findCartItem(cartItems,barcode){
  for(var n = 0; n < cartItems.length; n++){
    if(cartItems[n].item.barcode === barcode){
      return cartItems[n];
    }
  }
}

Cart.prototype.getTotalPrice = function(){
  var totalPrice = 0;
  this.cartItems.forEach(function(cartItem){
    totalPrice += cartItem.getSubTotal();
  });
  return totalPrice;
}
