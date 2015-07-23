function printReceipt(tagItems){
  var tempCart = new TempCart(tagItems);
  var tempCartItems = tempCart.getTempCartItems();
  var cart = new Cart(tempCartItems);
  var cartItems = cart.getCartItems();
  var  pos = new PosWorker(cartItems);
  console.log(pos.getReceipt());
}
