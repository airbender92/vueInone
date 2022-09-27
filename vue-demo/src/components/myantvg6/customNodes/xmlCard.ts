import { ModelConfig, IShape, RNode } from '../types'

// 定义进度条的绘制方式
const percentageBar = ({ width, used, height = 12 }: any) => `
<rect 
    style={{
      marginLeft: 10,
      marginTop: 3,
      width: ${width},
      height: ${height},
      fill: '#fff',
      stroke: '#1890ff',
    }}
    name="body"
  >
   <rect 
    style={{
      marginLeft: 10,
      width: ${(width / 100) * used},
      height: ${height},
      fill: '#1890ff',
      stroke: '#1890ff'
    }}
   ></rect>
  </rect>
`;

// 定义节点的jsx绘制方式
const textXML = (cfg: ModelConfig & {cpuUsage: number, metric: string}) => `
<group>
    <rect
      style={{
        width: 100,
        height: 20,
        fill: '#1890ff',
        stroke: '#1890ff',
        radius: [6,6,0,0]
      }}
    >
    <text style={{
      marginTop: 10,
      marginLeft: 45,
      textAlign: 'center',
      fontWeight: 'blod',
      fill: '#fff'
    }}>
    ${cfg.id}
    </text>
    </rect>
    <rect
      style={{ 
        width:100,
        height: 80,
        fill: 'rgba(24, 144, 255, 0.15)',
        radius: [0,0, 6, 6],
        keyshape='true'
        cursor='move'
      }}
    >
      <text style={{ marginLeft: 40, fill: 'red' }}>FULL</text>
      <text style={{ marginTop: 5, marginLeft: 10, fill: '#333' }}>${cfg.metric}</text>
      <text
        style={{
          marginTop: 1,
          marginLeft: ${cfg.cpuUsage * 0.7},
          fontSize: 10,
          fill: '#1890ff',
        }}
      >
      ${cfg.cpuUsage}%
      </text>
      ${percentageBar({ width:80, used: cfg.cpuUsage })}
      </rect>
</group>
`

export const xmlCard: RNode = {
  nodeName: 'xml-card',
  jsxFn: textXML
}