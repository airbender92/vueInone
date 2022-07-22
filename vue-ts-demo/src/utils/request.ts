/*
 * @Author: wangyunbo
 * @Date: 2022-07-22 08:38:21
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-22 09:01:23
 * @FilePath: \vue-ts-demo\src\utils\request.ts
 * @Description: file content
 */
import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import { UserModule } from '@/store/moudles/user';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})