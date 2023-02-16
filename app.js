// Импортируем данные из отдельного файла
import { data } from "./data.js";

// Находим контейнер в DOM дереве
var myChart = echarts.init(document.getElementById('main'));

// Функция, которая возвращает разметку в виде шаблонной строки с прописанными инлайновыми стилями
function callback(args){
    const total = args.reduce((a, b) =>  a + b.value, 0);
    const inProgrammPerc = Math.floor(getSum(args, 'В ')/total * 100);
    return(`
    <div style="display: flex; 
    flex-direction:column; 
    align-items:spase-between; 
    width: 191px;
    padding: 8px;">
        <p style="font-family: 'Inter';
        margin: 0px;
        padding: 0px;
        font-style: normal;
        font-weight: 700;
        font-size: 12px;
        line-height: 17px;
        ">${args[0].axisValue} 2022</p>

        <div style="
        display: flex;
        width: 100%;
        flex-direction: row;
        padding: 9.5px 0;
        justify-content: space-between;">
            <p style="font-family: 'Inter';
            margin: 0px;
            padding: 0px;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 120%;
            ">В программе</p>
            <p style="font-family: 'Inter';
            margin: 0px;
            padding: 0px;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 120%;
            ">${inProgrammPerc}% | ${getSum(args, 'В ')} шт.</p>
         </div>

        <div style="
        display: flex;
        width: 100%;
        flex-direction: row;
        padding-bottom: 8px;
        justify-content: space-between;">
            <div style="display: flex;">
                <div style="width: 12px;
                display: flex;
                margin-right: 8px;
                height: 12px;
                background: #0078D2;
                border-radius: 50%;"></div>
                <p style="font-family: 'Inter';
                margin: 0px;
                padding: 0px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 150%;
                ">Проекты ИТ</p>
            </div>
            <p style="font-family: 'Inter';
            margin: 0px;
            padding: 0px;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 120%;
            ">${findValue(args, 'В программе ИТ')} шт.</p>
        </div>

        <div style="
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;">
            <div style="display: flex;">
                <div style="width: 12px;
                display: flex;
                margin-right: 8px;
                height: 12px;
                background: #56B9F2;
                border-radius: 50%;"></div>
                <p style="font-family: 'Inter';
                margin: 0px;
                padding: 0px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 150%;
                ">Проекты ЦП</p>
            </div>
            <p style="font-family: 'Inter';
            margin: 0px;
            padding: 0px;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 120%;
            ">${findValue(args, 'В программе ЦП')} шт.</p>
        </div>

        <div style="
        display: flex;
        width: 100%;
        flex-direction: row;
        padding: 9.5px 0;
        justify-content: space-between;">
            <p style="font-family: 'Inter';
            margin: 0px;
            padding: 0px;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 120%;
            ">Вне программ</p>
            <p style="font-family: 'Inter';
            margin: 0px;
            padding: 0px;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 120%;
            ">${100 - inProgrammPerc}% | ${getSum(args, 'Вне')} шт.</p>
         </div>

        <div style="
        display: flex;
        width: 100%;
        flex-direction: row;
        padding-bottom: 8px;
        justify-content: space-between;">
            <div style="display: flex;">
                <div style="width: 12px;
                display: flex;
                margin-right: 8px;
                height: 12px;
                background: #00724C;
                border-radius: 50%;"></div>
                <p style="font-family: 'Inter';
                margin: 0px;
                padding: 0px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 150%;
                ">Проекты ИТ</p>
            </div>
            <p style="font-family: 'Inter';
            margin: 0px;
            padding: 0px;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 120%;
            ">${findValue(args, 'Вне программ ИТ')} шт.</p>
         </div>
        <div style="
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;">
            <div style="display: flex;">
                <div style="width: 12px;
                display: flex;
                margin-right: 8px;
                height: 12px;
                background: #22C38E;
                border-radius: 50%;"></div>
                <p style="font-family: 'Inter';
                margin: 0px;
                padding: 0px;
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 150%;
                ">Проекты ЦП</p>
            </div>
            <p style="font-family: 'Inter';
            margin: 0px;
            padding: 0px;
            font-style: normal;
            font-weight: 600;
            font-size: 12px;
            line-height: 120%;
            ">${findValue(args, 'Вне программ ЦП')} шт.</p>
         </div>
    </div>
    `)
}

//Разделяем данные для двух разных стаков на 2 массива объектов seriesX и seriesY
const seriesX = [
    {
        name: 'В программе ИТ',
        type: 'bar',
        data: setSeriesValues(data, 'В программе ИТ'),
        stack: 'x',
        color: ['#0078D2'],
    },
    {
      name: 'В программе ЦП',
      type: 'bar',
      data: setSeriesValues(data, 'В программе ЦП'),
      stack: 'x',
      color: ['#56B9F2']
    }
]

const seriesY = [
    {
        name: 'Вне программ ИТ',
        type: 'bar',
        data: setSeriesValues(data, 'Вне программ ИТ'),
        stack: 'y',
        color: ['#00724C']
    },
    {
        name: 'Вне программ ЦП',
        type: 'bar',
        data: setSeriesValues(data, 'Вне программ ЦП'),
        stack: 'y',
        color: ['#22C38E'],
    }
]

// Функция, которая добавляет лейбл с суммой данных последнему отрисованному элементу в стаке
const seriesHandler = series => {
    return series.map((serie, index) => {
        if (index === series.length - 1) {
            return {
                ...serie,
                label: {                    
                        show: true,
                        position: 'top',
                        fontFamily: 'Inter',
                        fontStyle: 'normal',
                        fontWeight: '600',
                        fontSize: '14px',
                        formatter: params => {
                            let total = 0
                            series.forEach(s => {
                                total += s.data[params.dataIndex]
                            })
                            return total
                        }
                }
            }
        } else {
            // При выборе данных последний элемент в стаке меняется, поэтому нужно повторно скрывать лейбл
            return {
                ...serie,
                label: {       
                    show: false,
                }
            }
        }
    })
}

// Функция для перерендера отрисованных столбцов при нажатии на одно из полей легенды столбчатой диаграммы
const handleLegendSelectChanged = (event, series) => {
    const includedSeriesNames = []
    // в цикле проверяем, какие из рядов у нас остались отрисованы
    for (const [name, value] of Object.entries(event.selected)) {
        if (value) {
            // Если в паре ключ-значение значение равно true, то запоминаем имя(кладем его в массив)
            includedSeriesNames.push(name)
        }
    }
    // Далее сравниваем переданные массивы и получивышийся массив имен, и далее рендерим только оставшиеся ряды
    const includedSeries = series.filter(item => {
        return includedSeriesNames.includes(item.name)
    })

    return seriesHandler(includedSeries)
}

//Настройки
var option = {
  title: {
    text: 'Проекты в программах и вне программ',
    subtext: 'Сумма и процентное соотношение проектов, находящихся в программах и вне программ',
    textStyle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '16px',
        color: '#002033',
      },
      subtextStyle: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        color: 'rgba(0, 32, 51, 0.6)',
        padding: [0,0,44,0]
      },
    itemGap: 8,
    // padding: [40, 40, 40, 40]
  },
  grid: {
    top: '108px',
    left: '38px',
    bottom: '67px'
  },
  tooltip: {
    trigger: 'axis',
    formatter: callback,
    padding: 0,
    axisPointer: {
        type: 'line'
    }
  },
  legend: {
    icon: 'circle',
    data: [...setLegendData(data)],
    bottom: 3,
  },
  xAxis: {
    axisLine: {
        show: false,
    },
    axisTick: {
        show: false
    },
    data: setxAxisData(data),
    scale: true,
    splitLine: {
        show: true,
        interval: 0,
        lineStyle: {
            type: 'dashed',
            color: 'rgba(0, 65, 102, 0.2)'
        }
    },
    axisLabel: {
        color: 'rgba(0, 32, 51, 0.6)'
    }
  },
  yAxis: {
    axisLabel: {
        color: 'rgba(0, 32, 51, 0.6)',
    },
    axisLine: {
        show: true,
        lineStyle: {
            type: 'solid',
            color: 'rgba(0, 65, 102, 0.2)'
        }
    },
    axisTick: {
        show: true
    },
    splitLine: {
        show: false,
    }
  },
};

// Функция определния значений по оси Х
function setxAxisData(someData){
    return Array.from(new Set(someData.map((item) => item.period))) 
}

// Функция поиска значений для построения легенды диаграммы
function setLegendData(someData){
    return Array.from(new Set(someData.map((item) => item.name))) 
}

// Функция, которая возвращает значения для каждого ряда
function setSeriesValues(someData, name){
    const arr = [];
    someData.forEach((item) => {
        if(item.name === name){
            arr.push(item.value)
        }
    })
    return arr
}

// воспомогательная функция, которая возвращает сумму в каждом ряду
function getSum(arr, filter){
    let sum = 0;
    arr.forEach((item) => {
        if(item.seriesName.includes(filter)){
            sum = sum + item.value
        }
    })
    return sum
}

//Функция, которая возвращает значение для каждо
function findValue(arr, filter){
    let num = 0;
    arr.forEach((item) => {
        if(item.seriesName.includes(filter)){
            num = item.value
        }
    })
    return num
}


myChart.setOption({
    ...option,
    series: [...seriesHandler(seriesX), ...seriesHandler(seriesY)]
});

// Добавляем слушатель события изменения легенды графика
myChart.on('legendselectchanged', event => {
    myChart.setOption({
        series: [...handleLegendSelectChanged(event, seriesX), ...handleLegendSelectChanged(event, seriesY)]
    })
})

document.getElementById('main').insertAdjacentHTML('beforeend', '<button class="main__button"></button>')