//TODO: Please write code in this file.
function printReceipt(inputs) {
  var totalprice = 0;
  var saveprice = 0;
  var expectText = '***<没钱赚商店>收据***' + '\n';
  var tempInputs = barcodeIdentify(inputs);
 var countHash = itemCount(tempInputs);
 var discountHash = getPromotionInfo(countHash);
    _.forEach(countHash,function(count,barcode){
          var item = itemByBarcode(barcode);
          //console.log(_.includes(discountHash, ITEM000001));
          if(discountHash[barcode] != undefined){
            var subtotal = item[0].price * discountHash[barcode];
            var subdiscount = (countHash[barcode]-discountHash[barcode]) * item[0].price;
            
            saveprice += subdiscount;
          } else {
            var subtotal = item[0].price * countHash[barcode];
          }
           expectText = expectText + '名称' +'：'+ item[0].name + '，'  + '数量' + '：' + countHash[barcode] + item[0].unit + '，'
                       + '单价' + '：' +(item[0].price).toFixed(2) + '(元)' + '，' + '小计' + '：' + subtotal.toFixed(2) + '(元)' +'\n';
           totalprice += subtotal;
     });
      var expectText1 = printPromotion(discountHash,countHash)
      var exceptText = expectText + '----------------------' + '\n'+ expectText1 + '----------------------' + '\n' + '总计'+ '：'  + totalprice.toFixed(2) + '(元)' + '\n' +  '节省' +  '：'  + saveprice.toFixed(2) + '(元)' + '\n' + '**********************';
            
      console.log(exceptText);
}


function barcodeIdentify(inputsInfo)
{  
    var tempInputs = [];
    _.forEach(inputsInfo,function(item){
       var itemBar = item.split('-');     
        tempInputs.push(itemBar.length === 1 ? {barcode:itemBar[0],count:1} : {barcode:itemBar[0],count:parseInt(itemBar[1],10)});
    })
    return tempInputs;
}

function itemCount(tempInputs)
{ 
    return _.reduce(tempInputs,function(countResult,item){
        countResult[item.barcode] = countResult[item.barcode]+item.count || item.count; 
        return countResult;   
   },{});
   
}

function getPromotionInfo(countResult)
{ 
    var discountResult;
    _.forEach(loadPromotions(),function(item){
      if(item.type === 'BUY_TWO_GET_ONE_FREE'){
      discountResult = buyTwoGetOneFree(countResult,item.barcodes);
      }
    });
   return discountResult;
}

function buyTwoGetOneFree(countResult,promotionItemC)
{
       var discountResult = {};
      _.forEach(countResult, function(count, barcode) { 
          if(_.includes(promotionItemC, barcode)){
              var discount = count >= 3 ? parseInt(count/ 3,10) : 0 ;
              discountResult[barcode] = countResult[barcode] - discount;            
           } 
        });    
       return discountResult;
}

function printPromotion(discountResult,countResult)
{
    var exceptText2 = '挥泪赠送商品：\n' ;
     _.forEach(discountResult,function(count,barcode){
         var discount = countResult[barcode] - count;
         var item = itemByBarcode(barcode);
         exceptText2 = exceptText2 + '名称' +'：'+ item[0].name + '，'  + '数量' + '：' + discount + item[0].unit + '\n';     
     });  
    return exceptText2;
     
}

function itemByBarcode(barcodes){
     return _.filter(loadAllItems(),function(item){
          return item.barcode === barcodes;
     });
 }
      


       
