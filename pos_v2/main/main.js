function printReceipt(tags){
    var scanner = new Scanner();
    var cart = new Cart();
    var pos = new Pos(scanner, cart);

    var promotion = new Promotion();
    pos.scan(tags);
    var processor = new Processor(cart,promotion);

    var promotioncalculate = new PromotionCalculate();
     processor.getPromotionItems(promotioncalculate);

    var utils = new Utils();
    var receipt = new Receipt(cart, processor,utils);
  // console.log(receipt.getReciptString());
    console.log(pos.print(receipt));
 }
