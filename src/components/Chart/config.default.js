const graph = {"dates": ["06-28", "06-29", "06-30", "07-01", "07-02", "07-03", "07-04"], "datas": {"q": [0, 0, 0, 0, 1, 0, 0], "c": [0, 0, 0, 0, 0, 0, 0], "j": [0, 0, 0, 2, 1, 0, 0], "t": [0, 0, 0, 2, 0, 0, 0]}}
const {datas, dates} = graph

const MAX_NUM = Math.ceil(Math.max(...datas['q']) * 1.4)
const FONT_C = '#888'
const THEME_COLOR = '#439641'
const kindMap = {
  't': '新增讨论',
  'c': '新增回应',
  'j': '加入成员',
  'q': '退出成员'
};
export default {
  color: THEME_COLOR,
  xAxis: {
    data: dates,
    type: 'category',
    axisTick: {
      show: false,
      // alignWithLabel: true
    },
    axisLine: {
      lineStyle: {
        color: FONT_C
      }
    },
  },
  yAxis: {
    max: MAX_NUM,
    minInterval: 1,
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: FONT_C
    }
  },
  series: {
    data: datas['q'],
    type: 'line',
    symbol: 'circle',
    symbolSize: 8,
    itemStyle: {
      borderWidth: 1,
      borderColor: '#fff'
    }
  },
  tooltip: {
    show: true,
    trigger: 'axis',
    position: ['5%', '5%'],
    formatter: `${kindMap['q']}数: {c} </br> 日期: {b}`,
    borderWidth: 2,
    borderColor: 'rgba(230, 230, 230, 0.8)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    textStyle: {
      color: '#666'
    }
  },
  grid: {
    left: '20px',
    right: '4px',
    top: '20px'
  }
}