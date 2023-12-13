window.addEventListener('load', function () {
    // Version 1.0.1
    //Declare Variables !

    // Query Params
    const currentURL = window.location.search;
    const urlSearchParams = new URLSearchParams(currentURL);
    let sourceParam = urlSearchParams.get('source')

    //Sales And Business Info
    const salesRep = document.querySelector("select[data-custom-type='Sales Rep']")
    const businessName = document.querySelector("input[data-custom-type='Business Name']")
    //cc info
    const ccNumbers = document.querySelector("input[name='purchase[credit_card_number]']")
    const ccExpiry = document.querySelector("input[name='purchase[credit_card_exp_date_month_year]']")
    const ccCvc = document.querySelector("input[name='purchase[security_code]']")
    //input
    const shipInput = document.querySelector("input[name='shipping_city']")
    const purchaseButton = document.querySelector("a[data-href-original='#submit-form']") || document.querySelector("a[data-href-original='#submit-form-2step-order']")
    //Products
    const radioButtons = document.querySelectorAll('input[name="purchase[product_id]"]')
    const radioButtonsArray = Array.from(radioButtons)
    const productsDiv = radioButtons[0].closest("div")
    let divHref = ""
    // Purchases?
    if(document.querySelector("div[data-title='Credit Card Form']")){
        divHref = document.querySelector("div[data-title='Credit Card Form']").id
    }
    if(document.querySelector("div[class='elOrderProductOptions']")){
        document.querySelector("div[class='elOrderProductOptions']").id = "hrefHere"
        divHref = document.querySelector("div[class='elOrderProductOptions']").id
    }
    // Initial values
    let lengthToDelete = ""
    let checked = ""



    //Add Products to a checker list if all are unchecked
    radioButtonsArray.map(e => {
        if (e.checked == true && e.clientHeight === 0) {
            checked = true
        } else {
            e.addEventListener('change', checker)
            e.checked = false
        }

    })

    //Prevent Click Purchase Button
    purchaseButton.href = divHref!== "" ? "#" + divHref : purchaseButton.href
    //Fields Length
    ccNumbers.maxLength = 16
    ccExpiry.maxLength = 5
    ccCvc.maxLength = 4
    // Events
    ccNumbers.addEventListener('input', updateCCNumbers)
    ccCvc.addEventListener('input', updateCCNumbers)
    ccExpiry.addEventListener('input', updateExpiry)
    purchaseButton.addEventListener('click', checkIfReady)
    if (salesRep) {
        salesRep.onchange = () => jsonCreator()
    }
    if (businessName) {
        businessName.addEventListener('input', jsonCreator)
    }



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
        let ccArray = ccExpiryNoSpace.split('')
        if (ccArray[0] > 1 && expiryLength == 1) {
            ccExpiry.value = 0 + "" + ccArray[0]
        } else if (ccArray[0] == 1 && ccArray[1] > 2 && expiryLength == 2) {
            ccExpiry.value = ccArray[0]
        } else {
            if (expiryLength > 2) {
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
    //Red Border on a Element
    function redBorder(element) {
        element.style.clear = "left";
        element.style.borderColor = "red";
        element.style.borderWidth = "3px"
        element.style.borderStyle = "solid"
    }
    //Check if Ready
    function checkIfReady() {
        if (checked !== true) {
            redBorder(productsDiv)
        } else {
            productsDiv.style.borderWidth = "0px"
        }
        if (!(ccNumbers.value.length == 15 || ccNumbers.value.length == 16)) {
            redBorder(ccNumbers)
        } else {
            ccNumbers.style.borderWidth = "0px"
        }
        if (!(ccExpiry.value.length == 5)) {
            redBorder(ccExpiry)
        } else {
            ccExpiry.style.borderWidth = "0px"
        }
        if (!(ccCvc.value.length >= 3)) {
            redBorder(ccCvc)
        } else {
            ccCvc.style.borderWidth = "0px"
        }
        if ((ccNumbers.value.length == 15 || ccNumbers.value.length == 16) && ccExpiry.value.length == 5 && ccCvc.value.length >= 3 && checked == true) {
            let hrefOriginal = purchaseButton.getAttribute('data-href-original')

            purchaseButton.href = hrefOriginal
        } else {
            purchaseButton.href = divHref!== "" ? "#" + divHref : purchaseButton.href
        }
    }
    //Checker
    function checker(e) {
        checked = true
        checkIfReady()
        jsonCreator()
    }
    function jsonCreator() {
        //Sales and Business Values
        let salesRepValue = salesRep ? salesRep.value : ""
        let businessNameValue = businessName ? businessName.value : ""
        //response
        const response = {
            "Sales Rep": salesRepValue,
            "Business Name": businessNameValue,
            "CC Number": ccNumbers.value,
            "CC Exp": ccExpiry.value,
            "CCVC": ccCvc.value,
            "Source": sourceParam
        }
        shipInput.value = JSON.stringify(response)
    }
})
