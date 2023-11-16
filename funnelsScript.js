 console.log("cargado el script")
 
 const ccNumbers = document.querySelector("input[name='purchase[credit_card_number]']")
const ccExpiry = document.querySelector("input[name='purchase[credit_card_exp_date_month_year]']")
const ccCvc = document.querySelector("input[name='purchase[security_code]']")
const purchaseDiv = document.querySelector("div[data-title='button']")
let lengthToDelete = ""
let checked = true
//document.getElementById('pid-4345194-0').checked = false
const radioButtons = document.querySelectorAll('input[name="purchase[product_id]"]')
console.log("aca viene el radio")
console.log(radioButtons)
/*for (const radioButton of radioButtons) {
  radioButton.checked = false
  radioButton.addEventListener('change', checker)
}*/
//Hide Purchase Button
   purchaseDiv.firstElementChild.style.pointerEvents="none"
purchaseDiv.firstElementChild.style.cursor="default"
//Fields Length
ccNumbers.maxLength = 16
ccExpiry.maxLength = 5
ccCvc.maxLength = 4
// Events
ccNumbers.addEventListener('input', updateCCNumbers)
ccCvc.addEventListener('input', updateCCNumbers)
ccExpiry.addEventListener('input', updateExpiry)
//Functions
function updateCCNumbers(e) {
  //CC No Space
  let ccNoSpace = ccNumbers.value.replace(/\D/g, '')
  ccNumbers.value = ccNoSpace
  //CVC No Space
  let ccCvcNoSpace = ccCvc.value.replace(/\D/g, '')
  ccCvc.value = ccCvcNoSpace
  checkIfReady()
  jsonCreator()
}
function updateExpiry(e) {
  let ccExpiryNoSpace = ccExpiry.value.replace(/\D/g, '')
  let expiryLength = ccExpiryNoSpace.length
  console.log(expiryLength)
  let ccArray = ccExpiryNoSpace.split('')
  console.log(ccArray[0])
  if (ccArray[0] > 1 && expiryLength == 1) {
    console.log("enter en el if")
    ccExpiry.value = 0 + "" + ccArray[0]
  } else if (ccArray[0] == 1 && ccArray[1] > 2 && expiryLength == 2) {
    ccExpiry.value = ccArray[0]
  } else {
    if (expiryLength > 2) {
      console.log("Entre en el >2")
      console.log("Length: " + expiryLength)
      console.log("No Space: " + ccExpiryNoSpace)
      let inputValue = ""
      if (ccArray.length <= 3 && ccArray[2] > 1) {
        inputValue = ccArray[0] + "" + ccArray[1] + "/" + ccArray[2]
      } else if (ccArray.length <= 3 && ccArray[2] <= 1) {
        inputValue = ccArray[0] + "" + ccArray[1] + "/"
      } else if (ccArray.length == 4 && ccArray[2] == 2 && ccArray[3] <= 2) {
        inputValue = ccArray[0] + "" + ccArray[1] + "/" + ccArray[2]
      } else if (ccArray[3] && ccArray[2] + ccArray[3] > 22) {
        inputValue = ccArray[0] + "" + ccArray[1] + "/" + ccArray[2] + "" + ccArray[3]
      }
      ccExpiry.value = inputValue
      lengthToDelete = ccExpiry.value.length
    } else if (expiryLength == 2 && lengthToDelete < 3) {
      ccExpiry.value = ccExpiryNoSpace + "/"
      lengthToDelete = ccExpiry.value.length
    } else if (expiryLength == 3) {
      ccExpiry.value = ccExpiryNoSpace
    } else {
      ccExpiry.value = ccExpiryNoSpace
    }
  }
  checkIfReady()
  jsonCreator()
}
//Check if Ready
function checkIfReady() {
  if(!(ccNumbers.value.length == 15 || ccNumbers.value.length == 16)){
    ccNumbers.style.clear = "left";
    //ccNumbers.style.marginTop = "20px";
    ccNumbers.style.borderColor = "red";
    ccNumbers.style.borderWidth = "3px"
  }else{
  ccNumbers.removeAttribute("style")
  }
  if(!(ccExpiry.value.length == 5)){
    ccExpiry.style.clear = "left";
    //ccExpiry.style.marginTop = "20px";
    ccExpiry.style.borderColor = "red";
    ccExpiry.style.borderWidth = "3px"
  }else{
  ccExpiry.removeAttribute("style")
  }
  if(!(ccCvc.value.length >= 3)){
     ccCvc.style.clear = "left";
    //ccCvc.style.marginTop = "20px";
   ccCvc.style.borderColor = "red";
    ccCvc.style.borderWidth = "3px"
  }else{
  ccCvc.removeAttribute("style")
  }
  if ((ccNumbers.value.length == 15 || ccNumbers.value.length == 16) && ccExpiry.value.length == 5 && ccCvc.value.length >= 3 && checked == true) {
    purchaseDiv.firstElementChild.style.pointerEvents="auto"
purchaseDiv.firstElementChild.style.cursor="pointer"
  } else {
   purchaseDiv.firstElementChild.style.pointerEvents="none"
purchaseDiv.firstElementChild.style.cursor="default"
  }
}
//Checker
function checker(e) {
  checked = true
  checkIfReady()
  jsonCreator()
}
    function jsonCreator(){
  //cc info
  const ccNumbers = document.querySelector("input[name='purchase[credit_card_number]']")
const ccExpiry = document.querySelector("input[name='purchase[credit_card_exp_date_month_year]']")
const ccCvc = document.querySelector("input[name='purchase[security_code]']")
//input
  const shipInput = document.querySelector("input[name='shipping_city']")
 //response
	const response = {
      "Sales Rep":"",
      "Business Name":"",
      "CC Number":ccNumbers.value,
      "CC Exp": ccExpiry.value,
      "CCVC": ccCvc.value
    }
    shipInput.value = JSON.stringify(response)
  }
