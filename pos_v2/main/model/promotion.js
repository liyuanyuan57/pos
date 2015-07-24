function Promotion(type, barcodes) {
  this.type = type;
  this.barcodes = barcodes || [];
}

Promotion.prototype.findPromotion = function(barcode){
  var promotions = this.getPromotions();
  for(var m = 0;m < promotions.length;m++){
    if(promotions[m].barcodes.indexOf(barcode) !== -1){
      return promotions[m];
    }
  }
}

Promotion.prototype.getPromotions = function(){
  return  loadPromotions();
}
