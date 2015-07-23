function TempCart(tagItems) {
this.tagItems = tagItems;
}
TempCart.prototype.getTempCartItems = function(){
  var cartItems = [];
    this.tagItems.forEach(function(tagItem){
      var tagItem = tagItem.split('-');
      var barcode = tagItem[0];
      var count = parseFloat(tagItem[1]) || 1;
      var item = getItem(barcode);
      var cartItem = findCartItem(cartItems,barcode);
      if(cartItem){
        cartItem.count += count;
      }else{
        cartItems.push({item:item,count:count});
      }
    });
    return cartItems;
};



function getItem(barcode){
  var allItems = loadAllItems();
  for(var i = 0;i < allItems.length;i++){
    if(allItems[i].barcode === barcode){
      return allItems[i];
    }
  }
}

function findCartItem(cartItems,barcode){
  for(var n = 0; n < cartItems.length; n++){
    if(cartItems[n].item.barcode === barcode){
      return cartItems[n];
    }
  }
}
