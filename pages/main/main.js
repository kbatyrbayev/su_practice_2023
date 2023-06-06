console.log('yes')
let data = [];
const Y_STEP = 5;
const {width, height} = document.getElementById('svg').getBoundingClientRect();
let max; // max value from json
console.log(width, height);

fetch('../../assets/data/visitors.json', {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
    },
})
   .then(response => response.json())
   .then(response => {
        data = response;
        init();
   });


function init() {
    createXaxis();
    createYaxis();
}

function createXaxis() {
    max = Math.max(...data.map(r => r.value));
    const diff = Math.ceil(max/(Y_STEP-1));
    const xAxis = document.getElementById('xAxis');
    for (let i = 0; i < Y_STEP; i++) {
        const val = (Y_STEP-1-i)*diff;
        console.log(val, 'val', i*diff);
        /* create g element | start*/
        const gElem = createElement('g', {transform: `translate(0, ${(calcY(i*diff)*-1)})`});
            /* create text | start*/
            const text = createElement('text', {x:0, y:0});
            text.innerHTML = val;
            gElem.appendChild(text);
            /* create text | end*/
            /* create line | start */
            const line = createElement('line', {x1: 10, x2: '95%', y1: -5, y2: -5, 'stroke-dasharray': 10, stroke: '#E2E8F0'});
            gElem.appendChild(line);
            /* create line | end */
        xAxis.appendChild(gElem)
        /* create g element | end */
    }

}

function createYaxis() {

    const yAxis = document.getElementById('yAxis');
    let width = Math.floor(yAxis.getBoundingClientRect().width);
    let xStep = Math.ceil(width / data.length);
    console.log(width, xStep)
    data.forEach((d, i) => {
        /* create g | start */
        const gElem = createElement('g', {transform: `translate(${i*xStep}, 10)`});
            /* create text | start */
            const text = createElement('text', {x:0,y:0});
            text.innerHTML = d.date.split('-')[0];
            gElem.appendChild(text);
            /* create text | end */
            /* create line | start */
            const line = createElement('line', {x1: 9, x2: 9, y1: -25, y2: calcY(d.value)-25, stroke: '#3C50E0', 'stroke-width': 12, class: 'bar'});
            gElem.appendChild(line);
            /* create line | end */
            const tooltip = createElement('text', {x:-5, y: calcY(d.value)-30, class: 'tooltip'});
            tooltip.innerHTML = d.value;
            gElem.appendChild(tooltip);
        yAxis.appendChild(gElem);
        /* create g | end */
    });
}

function calcY(value) {
    return (value*(-200)/max);
}

function createElement(name, options) {
    let element = document.createElementNS('http://www.w3.org/2000/svg', name);
    for (let key in options) {
        element.setAttribute(key, options[key]);
    }
    return element;
}
