const yearList = ['2020', '2025', '2030', '2035', '2040', '2045', '2050'];

    const countryCoffeeData = {
      'Brazil': {
        jaName: 'ブラジル',
        production: [4194000, 3780000, 3477600, 3175200, 2872800, 2570400, 2268000],
        temp: [24.8, 25.1, 25.4, 25.7, 26.0, 26.3, 26.6]
      },
      'Vietnam': {
        jaName: 'ベトナム',
        production: [1740000, 1902000, 1806900, 1711800, 1616700, 1521600, 1426500],
        temp: [24.2, 24.5, 24.8, 25.0, 25.3, 25.6, 25.9]
      },
      'Colombia': {
        jaName: 'コロンビア',
        production: [804000, 750000, 712500, 675000, 637500, 600000, 562500],
        temp: [24.5, 24.8, 25.0, 25.3, 25.5, 25.8, 26.0]
      },
      'Indonesia': {
        jaName: 'インドネシア',
        production: [642000, 742200, 712512, 682824, 653136, 623448, 593760],
        temp: [26.1, 26.3, 26.5, 26.8, 27.0, 27.2, 27.5]
      },
      'Ethiopia': {
        jaName: 'エチオピア',
        production: [456000, 693600, 651984, 610368, 568752, 527136, 485520],
        temp: [22.6, 22.9, 23.2, 23.5, 23.8, 24.1, 24.4]
      }
    };

    const mapChart = echarts.init(document.getElementById('map'));
    const lineChart = echarts.init(document.getElementById('chart'));

    fetch('https://raw.githubusercontent.com/apache/echarts/master/test/data/map/json/world.json')
      .then(response => response.json())
      .then(geoJson => {
        echarts.registerMap('world', geoJson);

        const mapOption = {
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              const data = countryCoffeeData[params.name];
              if (data) {
                return `<b>${data.jaName} (${params.name})</b><br/>クリックして詳細を表示`;
              }
              return params.name;
            }
          },
          geo: {
            map: 'world',
            roam: true,
            center: [20, 0],
            zoom: 2.2,
            itemStyle: {
              areaColor: '#e0e0e0',
              borderColor: '#ffffff'
            },
            emphasis: {
              itemStyle: { areaColor: '#a1887f' }
            },
            regions: [
              { name: 'Brazil', itemStyle: { areaColor: '#6f4e37' } },
              { name: 'Vietnam', itemStyle: { areaColor: '#6f4e37' } },
              { name: 'Colombia', itemStyle: { areaColor: '#6f4e37' } },
              { name: 'Indonesia', itemStyle: { areaColor: '#6f4e37' } },
              { name: 'Ethiopia', itemStyle: { areaColor: '#6f4e37' } }
            ]
          },
          series: [
            {
              type: 'lines',
              coordinateSystem: 'geo',
              polyline: true,
              data: [
                { coords: [[-180, 25], [180, 25]], lineStyle: { color: '#d32f2f', width: 2, type: 'dashed' } },
                { coords: [[-180, -25], [180, -25]], lineStyle: { color: '#d32f2f', width: 2, type: 'dashed' } }
              ],
              silent: true
            }
          ]
        };

        mapChart.setOption(mapOption);
        renderDetailChart('Brazil');
      });

    mapChart.on('click', function (params) {
      if (countryCoffeeData[params.name]) {
        renderDetailChart(params.name);
      }
      const chartElement = document.getElementById('chart');
      if (chartElement) {
        chartElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
      });
    }
    });

    function renderDetailChart(countryKey) {
      const data = countryCoffeeData[countryKey];

      const lineOption = {
        title: {
          text: ` ${data.jaName}：平均気温 vs 生産量推移`,
          left: 'center',
          textStyle: { fontSize: 15, color: '#3e2723' }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'cross' }
        },
        legend: {
          data: ['生産量 (トン)', '年平均気温 (°C)'],
          bottom: 0
        },
        xAxis: [{
          type: 'category',
          data: yearList
        }],
        yAxis: [
          {
            type: 'value',
            name: '生産量 (トン)',
            position: 'left',
            axisLabel: { formatter: '{value} t' }
          },
          {
            type: 'value',
            name: '平均気温 (°C)',
            position: 'right',
            min: function(val) { return Math.floor(val.min - 1); },
            max: function(val) { return Math.ceil(val.max + 1); },
            axisLabel: { formatter: '{value} °C' },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: '生産量 (トン)',
            type: 'bar',
            data: data.production,
            itemStyle: { color: '#8d6e63' }
          },
          {
            name: '年平均気温 (°C)',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: data.temp,
            itemStyle: { color: '#d32f2f' }
          }
        ]
      };

      lineChart.setOption(lineOption);
    }

    window.addEventListener('resize', () => {
      mapChart.resize();
      lineChart.resize();
    });