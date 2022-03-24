import './file.css';
import './file2.css';

const divElement = document.createElement("div");
divElement.className = ['container']
divElement.innerHTML = 'hello css-loader';
document.body.appendChild(divElement)