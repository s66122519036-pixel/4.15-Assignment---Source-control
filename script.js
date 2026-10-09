let myChart = null;

document.getElementById('calcForm').addEventListener('submit', function (e) {
    e.preventDefault();

    let u = parseFloat(document.getElementById('u').value);
    let a = parseFloat(document.getElementById('a').value);
    let t = parseFloat(document.getElementById('t').value);
    let intervals = parseInt(document.getElementById('samples').value);

    // 1. คำนวณค่า Displacement ที่เวลา t แล้วแสดงในช่อง s
    let s = u * t + 0.5 * a * Math.pow(t, 2);
    document.getElementById('s').value = s.toFixed(2);

    // 2. ขยายช่วงเวลารวมเป็น 2 เท่าตามโจทย์ (Double total time)
    let maxTime = t * 2;
    let step = maxTime / intervals;

    let labels = [];
    let dataPoints = [];
    let pointBackgroundColors = [];
    let pointRadius = [];

    // หาดัชนีจุดที่ใกล้กับเวลา t มากที่สุดเพื่อระบุเป็นจุดสีแดง
    let targetIndex = Math.round(t / step);

    for (let i = 0; i <= intervals; i++) {
        let currentTime = i * step;
        let currentS = u * currentTime + 0.5 * a * Math.pow(currentTime, 2);

        labels.push(currentTime.toFixed(1));
        dataPoints.push(currentS);

        // จุดแดงตรงเวลา t ส่วนจุดอื่นใช้สีธีมตามปกติ
        if (i === targetIndex) {
            pointBackgroundColors.push('red');
            pointRadius.push(6);
        } else {
            pointBackgroundColors.push('#4bc0c0');
            pointRadius.push(4);
        }
    }

    // 3. วาด/อัปเดต กราฟ Chart.js
    let ctx = document.getElementById('myChart').getContext('2d');

    if (myChart) {
        myChart.destroy(); // ลบกราฟเดิมก่อนวาดใหม่
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 's = ut + (1/2)at^2',
                data: dataPoints,
                borderColor: '#4bc0c0',
                backgroundColor: '#4bc0c0',
                pointBackgroundColor: pointBackgroundColors,
                pointRadius: pointRadius,
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (t)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Displacement (s)'
                    }
                }
            }
        }
    });
});
