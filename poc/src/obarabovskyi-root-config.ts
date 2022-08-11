/*
 * @Author: wangyunbo
 * @Date: 2022-08-01 14:35:42
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-08-03 14:10:12
 * @Description: file content
 */
import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

registerApplication(
  "@obaranovskyi/poc-react",
  () => System.import("@obaranovskyi/poc-react"),
  (location) => location.pathname === '/poc-react'
)

registerApplication(
  "@obaranovskyi/poc-vue",
  () => System.import("@obaranovskyi/poc-vue"),
  (location) => {
    return location.pathname.startsWith("/poc-vue")
  }
)

applications.forEach(registerApplication);
layoutEngine.activate();
start();
