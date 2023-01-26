window.onload = ()=> {

const btn = document.querySelector('button');
const body = document.querySelector('body');
const color = document.querySelector('#color');

btn.addEventListener('click', randomColor);

function randomColorHex(){
    let randomColor = Math.floor(Math.random() * 16777216).toString(16);
    let result = `#${randomColor}`;
    color.innerText = result;
    body.style.backgroundColor = result;
    return;
}

function randomColorRGB(){
    let randomNumber = function() {
        let num = Math.floor(Math.random() * 255);
        return num;
    }
    let randomColor = `Rgba(${randomNumber()},${randomNumber()},${randomNumber()})`
    color.innerText = randomColor;
    body.style.backgroundColor = randomColor;
    return;
}

function randomColorName() {
    const colorArray = ['Red', 'Green', 'Blue'];
    let randomColor = Math.floor(Math.random() * colorArray.length);
    color.innerText = colorArray[randomColor];
    body.style.backgroundColor = colorArray[randomColor];
    return;
}

function randomColor() {
    let functions = [randomColorHex, randomColorName, randomColorRGB];
    let randomFunction = functions[Math.floor(Math.random() * functions.length)];
    if (randomFunction === randomColorHex) {
        color.style.textTransform = 'uppercase';
    } else {
        color.style.textTransform = 'capitalize';
    }
    return randomFunction();
}

}


