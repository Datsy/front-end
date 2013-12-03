// DATA FORMAT:
//   { 
//     xAxis: [],
//     series1: [],
//     series2: [],
//     ...
//   }
var findMinMax = function(data) {
  var min;
  var max;
  var curVal;
  var propertiesArray = Array.prototype.slice.call(arguments, 1);
  var concatArr = [];

  for(var i=0; i < data.length; i++){
    for(var j=0; j < propertiesArray.length; j++){
      concatArr.push(data[i][propertiesArray[j]]);
    }
  }

  for(i=0; i < concatArr.length; i++){
    curVal = concatArr[i];

    if(!min){
      min = curVal;
    }
    if(!max){
      max = curVal;
    }

    if(curVal < min){
      min = curVal;
    }

    if(curVal > max){
      max = curVal;
    }
  }

  return { min: min, max: max };
}