
async function sendUserDataPOST() {
    let number1 = parseInt(numberInput1.value);
    let number2 = parseInt(numberInput2.value);
    let oper = OperInput.value;

    if (!isNaN(number1) && !isNaN(number2)) {

        let sendData = {
            number1: number1,
            number2: number2,
            oper: oper,
        };
        let response = await fetch("/api/math_operation", {method: "POST",body: JSON.stringify(sendData),});

        let responseText = await response.text();
        console.log(response);
        console.log(typeof(responseText));
        outputNumber.value = responseText;
        out();
        
    } else {
        alert("введите корректное число.");
    }
}
async function sendUserDataGET(){
    let number1 = parseInt(numberInput1.value);
    let number2 = parseInt(numberInput2.value);
    if (!isNaN(number1) && !isNaN(number2)) {
        let response = await fetch("/api/math_operation", {method: "GET"});
        let responseText = await response.text();
        console.log(response);
        console.log(typeof(responseText));
        outputNumber.value = responseText;
        }
    }

async function out() {
        let value1 = document.getElementById('numberInput1').value
        let value2 = document.getElementById('numberInput2').value
        let oper = document.getElementById('OperInput').value
        let value3 = document.getElementById('outputNumber').value
    
        if (!value1 && !value2 && !value3) return;
        const container = document.createElement('div');
        container.className = "box1";


        //выводим значения обоих полей
        container.innerHTML = value1 + ` ${oper} ` + value2 + ' = ' + ` ${value3}`;
        document.getElementById('result').appendChild(container);
        let btn = document.getElementById('btnClear');
        btn.addEventListener('click',()=>{
            document.getElementById('result').removeChild(container)
        })
    }
// async function Aclear(){
//     const box = document.getElementById("result").value;
//     const start = document.getElementById("btnClear");
//     start.onclick(box.remove());
// }

// HISTORY
let contentVue = document.querySelector('.element');
let button = document.querySelector('.btn');
button.addEventListener("click", (evt)=>{
    evt.preventDefault();
    contentVue.classList.toggle("element-hidden");
})


// http://localhost:2000/calc?a=13&b=13&op=minus