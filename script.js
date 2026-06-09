// HTMLで作った空の箱を取得して、Echartsを初期化
const chartContainer = document.getElementById('main-chart');
const myChart = echarts.init(chartContainer);

// グラフの設定と仮のデータ（例：ブラジルの気温とアラビカ種収穫量の予測）
const option = {
    title: {
        text: 'ブラジル：気温上昇と収穫量予測 (仮)'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['平均気温', 'アラビカ種収穫量']
    },
    xAxis: {
        type: 'category',
        data: ['2020', '2030', '2040', '2050'] // 年代
    },
    yAxis: [
        { type: 'value', name: '気温 (°C)' },
        { type: 'value', name: '収穫量 (万トン)' }
    ],
    series: [
        {
            name: '平均気温',
            type: 'line', // 折れ線グラフ
            data: [22.5, 23.1, 23.8, 24.5] 
        },
        {
            name: 'アラビカ種収穫量',
            type: 'bar', // 棒グラフ
            yAxisIndex: 1, // 右側のメモリを使う
            data: [350, 320, 250, 150] 
        }
    ]
};

// 設定をグラフに反映させる
myChart.setOption(option);