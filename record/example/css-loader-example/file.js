import './file.css';
import './file2.css';
import './index.less';

const divElement = document.createElement("div");
divElement.className = ['container']
divElement.innerHTML = 'hello css-loader';
console.log('test')
document.body.appendChild(divElement)