//generate password script

//[Edit this]
const copyBtn           = document.querySelector("#copyBtn");
const pasteBtn          = document.querySelector("#pasteBtn");
const genBtn            = document.querySelector("#genPsw");
const pswField          = document.querySelector("#password");
const pswLengthField    = document.querySelector("#passwordLength");
const cPswField         = document.querySelector("#cPassword");

const updatePswLength = () => {
    const pswLengthDisplay = pswLengthField.nextElementSibling;
    pswLengthDisplay.textContent = pswLengthField.value;
};

document.addEventListener("DOMContentLoaded", updatePswLength);

pswLengthField.addEventListener("change", updatePswLength);

genBtn.addEventListener("click", () =>  {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const pswLength = parseInt(document.querySelector("#passwordLength").value);
    let genPsw = "";

    if(pswLength < 3 || pswLength > 64){
        alert("Password length is too short or too long: Minimu of 3 and maximum of 64");
        return;
    }

    const array = new Uint32Array(chars.length);
    window.crypto.getRandomValues(array);

    for(let i = 0; i < pswLength; i++){
        genPsw += chars[array[i] % chars.length];
    }

    pswField.value = genPsw;
});


copyBtn.addEventListener("click", () => {
    const copyText = pswField.value;
        navigator.clipboard.writeText(copyText).then(
            //[edit this]
            success => alert("text copied into clipboard"),
            err => alert(err)
        );
});

// paste password when the confirm password input is focused
cPswField.addEventListener("focus", () => {
    navigator.clipboard.readText().then(
        cliptext => cPswField.value = cliptext, 
        cPswField.blur(),
        err => console.log(err)
    );
});

//alternative - paste password when paste password button is clicked
pasteBtn.addEventListener("click", () => {
    navigator.clipboard.readText().then(
        cliptext => cPswField.value = cliptext,
        err => console.log(err)
    );
});

