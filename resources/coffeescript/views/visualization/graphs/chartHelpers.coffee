# DATA FORMAT:
# { 
#   xAxis: [],
#   series1: [],
#   series2: [],
#   ...
# }
findMinMax -> (data)
  propertiesArray = Array.prototype.slice.call(arguments, 1)
  concatArr = []

  for(var i=0; i < data.length; i++)
    for(var j=0; j < propertiesArray.length; j++)
      concatArr.push(data[i][propertiesArray[j]])

  for(i=0; i < concatArr.length; i++)
    curVal = concatArr[i]

    min = curVal if !min
    max = curVal if !max
    min = curVal if curVal < min
    max = curVal if curVal > max

  return { min: min, max: max }
