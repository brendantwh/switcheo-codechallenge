let addr = "valid";

var val = document.getElementById("input-amount").value;
var amticon = document.getElementById("amt-icon")
var amterror = document.getElementById("amt-error");
function validamt(elem) {
  const regex = new RegExp(/^[0-9]*(\.[0-9]{0,2})?$/);
  if (regex.test(elem.value)) {
    val = elem.value;
  } else {
    elem.value = val;
  }

  if (val <= 0) {
    amticon.classList.add("bg-red-300");
    amterror.classList.remove("invisible");
    return false;
  } else {
    amticon.classList.remove("bg-red-300");
    amterror.classList.add("invisible");
  }

  return true;
}

function checkOTPlength(inputs) {
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value === '') {
      inputs.forEach((val) => {
        val.classList.remove("otp-entry");
        val.classList.add("otp-error");
      })
      return false;
    } else {
      inputs.forEach((val) => {
        val.classList.add("otp-entry");
        val.classList.remove("otp-error");
      })
      return true;
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var otpspinner = document.getElementById("otp-spinner");
var proceed = document.getElementById("proceed");
async function submitOTP(inputs) {
  let numberarr = [];

  otpspinner.classList.remove("invisible");
  inputs.forEach((val) => {
    numberarr.push(val.value);

    val.setAttribute("disabled", true);
    val.classList.remove("otp-entry");
    val.classList.add("otp-wait");
  });

  let number = numberarr.join("");

  await sleep(1500);
  otpspinner.classList.add("invisible");

  if (number === "111111") {
    inputs.forEach((val) => {
      val.classList.add("otp-ac");
      val.classList.remove("otp-wait");
    });
  
    proceed.classList.remove("invisible");
  } else {
    inputs.forEach(async (val) => {
      val.classList.add("otp-error");
      val.classList.remove("otp-wait");

      await sleep(1000);
      val.removeAttribute("disabled");
      val.classList.remove("otp-error");
      val.classList.add("otp-entry");
      val.value = '';
    });
  }
}
