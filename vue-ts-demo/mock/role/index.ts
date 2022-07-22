/*
 * @Author: wangyunbo
 * @Date: 2022-07-20 18:12:19
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-20 18:12:20
 * @FilePath: \vue-ts-demo\mock\role\index.ts
 * @Description: file content
 */
import faker from 'faker'
import { Request, Response } from 'express'
import { asyncRoutes, constantRoutes } from './routes'
import { IRoleData } from '../../src/api/types'