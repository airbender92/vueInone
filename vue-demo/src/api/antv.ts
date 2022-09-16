import axios from 'axios';

export function getG6Data1() {
  return axios.get('https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json');
}