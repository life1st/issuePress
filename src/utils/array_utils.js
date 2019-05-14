export function mergeArray(arr1, arr2) {
  const resArr = [...arr2]
  arr1.forEach(item => {
    if (!arr2.include(item)) {
      resArr.push(item)
    }
  })

  console.log(resArr)
  return resArr
}