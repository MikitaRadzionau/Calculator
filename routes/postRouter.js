const {    
    sum,
    min,
    mult,
    div,} = require("../utils/math");
function postRouter(req, res) {

    let data = '';
    req.on('data', chunk => {
        data += chunk;
    })

    req.on('end', () => {
        console.log(data);

        const object = JSON.parse(data);
        console.log(object);
        console.log(typeof(object));

        const number1 = object.number1;
        const number2 = object.number2;
        const oper = object.oper;
        console.log(number1, number2, oper);
        let result;


        switch (oper) {
            case '+':   
                result = sum(number1,number2);
                break;
            case '-':
                result = min(number1,number2);
                break;
            case '*':
                result = mult(number1 , number2);
                break;
            case '/':
                result = div(number1 , number2);
                break;
            case 'sqrt':
                result = Math.pow(number1,1/number2);
                break;
            case 'degree':
                result = Math.pow(number1,number2);
                break;
            case '%':
                result = (number1 * number2) / 100;
                break;
            default:
                result = 'HОРМАЛЬНО ПИШИ';
        }
        console.log(result);
        res.end(JSON.stringify(result));
    });
}

module.exports = postRouter;