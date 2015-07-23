function Pos(){
  this.scanner = new Scanner();
  this.cart = new Cart();
}
Pos.prototype.scan = function(tags){
  for(var m = 0; m < tags.length; m++){
    var cartItem = this.scanner.scan(tags[m]);
    this.cart.addCartItem(cartItem);
  }
//  return cartItems;
};
