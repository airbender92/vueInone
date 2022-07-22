/*
 * @Author: wangyunbo
 * @Date: 2022-07-20 17:54:14
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-07-20 17:54:21
 * @FilePath: \vue-ts-demo\mock\mock-server.ts
 * @Description: file content
 */
import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import cors from 'cors'
import http from 'http'
import path from 'path'
import yaml from 'yamljs'
import * as api from './api'
import { accessTokenAuth } from './security'
import { connector, summarise } from 'swagger-routes-express'