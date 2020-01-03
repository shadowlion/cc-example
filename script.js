jQuery("input[name=payType]").on("change", function() {

    var ccTemplate = document.getElementsByTagName("template")[0];
    var clone = ccTemplate.content.cloneNode(true);
    var ccForm = document.querySelector(".cc-form");
    var ccChecked = jQuery(this).filter(":checked").val() === "CC";

    if (ccChecked) {

        ccForm.appendChild(clone);

        jQuery(".cc-number").payform("formatCardNumber");
        jQuery(".cc-cvv").payform("formatCardCVC");

        return;

    }

    ccForm.innerHTML = "";

    return;

});

function sendData() {

    var isCardValid = jQuery.payform.validateCardNumber(jQuery("#ccNum").val());
    var isCvvValid = jQuery.payform.validateCardCVC(jQuery("#ccCVV").val());
    var expiryMonth = jQuery("#ccExpiryMonth").val();
    var expiryYear = jQuery("#ccExpiryYear").val();
    var isCardExpiryValid = jQuery.payform.validateCardExpiry(expiryMonth, expiryYear);

    if(jQuery("#ccName").val().length < 5){
        alert("Invalid owner name");
    } else if (!isCardValid) {
        alert("Invalid card number");
    } else if (!isCardExpiryValid) {
        alert("Invalid Expiration Date");
    } else if (!isCvvValid) {
        alert("Invalid CVV");
    } else {
        // Everything is correct. Add your form submission code here.
        alert("Everything is correct");
        console.log({
            ["Card Company"]: jQuery("input[name=ccType]:checked").val(),
            ["Card Holder Name"]: jQuery("#ccName").val(),
            ["Card Number"]: jQuery("#ccNum").val(),
            ["Card Expiry"]: `${expiryMonth} / ${expiryYear}`,
            ["Card CVV"]: jQuery("#ccCVV").val()
        });
    }  

    return;
}
