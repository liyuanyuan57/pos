//TODO: Please write code in this file.
function printReceipt(inputs) {
  var totalprice = 0;
  var saveprice = 0;
  var count = 1;
  var countHash = {};
  var discountHash = {};
  var allItems = loadAllItems();
  itemCount(inputs, countHash); 
  getPromotionInfo(discountHash,countHash);
  var expectText = '***<没钱赚商店>收据***' + '\n';

  for(var y = 0; y < allItems.length; y++){
    if(countHash[allItems[y].barcode] != undefined){
      if(discountHash[allItems[y].barcode] != undefined){
         var subtotal = allItems[y].price * discountHash[allItems[y].barcode];
         var subdiscount = (countHash[allItems[y].barcode]-discountHash[allItems[y].barcode]) * allItems[y].price;
         saveprice += subdiscount;
         
      } else {
         var subtotal = allItems[y].price * countHash[allItems[y].barcode];
      }
         var expectText = expectText + '名称' +'：'+ allItems[y].name + '，'  + '数量' + '：' + countHash[allItems[y].barcode] + allItems[y].unit + '，'
                       + '单价' + '：' +(allItems[y].price).toFixed(2) + '(元)' + '，' + '小计' + '：' + subtotal.toFixed(2) + '(元)' +'\n';
         totalprice += subtotal;
     }
   }
   var expectText1 = printPromotion(discountHash,countHash,allItems);
  expectText = expectText + '----------------------' + '\n'+ expectText1 + '----------------------' + '\n' + '总计'+ '：'  + totalprice.toFixed(2) + '(元)' + '\n' +  '节省' +  '：'  + saveprice.toFixed(2) + '(元)' + '\n' + '**********************';
  console.log(expectText);
  
 
}


function barcodeIdentify(inputsInfo,tempInputs)
{  
   for(var m = 0;m < inputsInfo.length; m++){
      var itemBar = inputsInfo[m].split('-');
       if(itemBar.length == 1){
         tempInputs.push({barcode:itemBar[0],count:1});
       } else{
         tempInputs.push({barcode:itemBar[0],count:parseInt(itemBar[1],10)});
       }
    } 
}

function itemCount(inputsInfo, countResult)
{
   var tempInputs = [];
   barcodeIdentify(inputsInfo,tempInputs);
   for(var x = 0; x < tempInputs.length; x++){
      if(countResult[tempInputs[x].barcode] != undefined){
          countResult[tempInputs[x].barcode] += tempInputs[x].count; 
      } else {
          countResult[tempInputs[x].barcode] = tempInputs[x].count;
      }
    }

}


function getPromotionInfo(discountResult,countResult)
{
   var promotionItems = loadPromotions();
   for (var i = 0; i < promotionItems.length; i++) { 
     if(promotionItems[i].type === 'BUY_TWO_GET_ONE_FREE'){
       var  promotionItemC = promotionItems[i].barcodes;
       buyTwoGetOneFree(discountResult,countResult,promotionItemC);
      }
   }
}

function buyTwoGetOneFree(discountResult,countResult,promotionItemC)
{
   for (var j = 0; j < promotionItemC.length; j++) {
     if(countResult[promotionItemC[j]] != undefined){
        if(countResult[promotionItemC[j]] >= 3){
         var  discount = parseInt(countResult[promotionItemC[j]] / 3,10);
         discountResult[promotionItemC[j]] = countResult[promotionItemC[j]] - discount;
        }
      } 
        
    }
}

function printPromotion(discountResult,countResult,allItemInfo)
{
    var exceptText2 = '挥泪赠送商品：' + '\n';
    for(var n = 0; n < allItemInfo.length; n++){
       if(discountResult[allItemInfo[n].barcode] != undefined){
         var discount = countResult[allItemInfo[n].barcode]-discountResult[allItemInfo[n].barcode];
         var exceptText2 = exceptText2 + '名称' +'：'+ allItemInfo[n].name + '，'  + '数量' + '：' + discount + allItemInfo[n].unit + '\n';
        }
    }
    return exceptText2;
}
       
     
     
  
        
 
      
       

