import styles from './file.css';

const divElement = document.createElement("div");
divElement.className = styles['container'];
document.write("hello friend");
document.append(divElement)