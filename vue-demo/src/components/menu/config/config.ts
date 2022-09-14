/*
 * @Author: wangyunbo
 * @Date: 2022-06-28 09:42:33
 * @LastEditors: wangyunbo
 * @LastEditTime: 2022-06-28 09:42:34
 * @FilePath: \vueInone\vue-demo\src\components\menu\config\config.js
 * @Description: file content
 */
 export default {
  label: 'root',
  nodes: [
    {
      label: 'item1',
      nodes: [
        {
          label: 'item1.1'
        },
        {
          label: 'item1.2',
          nodes: [
            {
              label: 'item1.2.1'
            }
          ]
        }
      ]
    }, 
    {
      label: 'item2'  
    }
  ]
}