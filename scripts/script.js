$(document).ready(function() {


	$.get("data/Data.csv", function (data) {
		var csvdata = Papa.parse(data);
		console.log(csvdata);

		store = [];
		for (var i = 0; i < csvdata.data.length; i++) {
        	store.push([parseFloat(csvdata.data[i][0]),parseFloat(csvdata.data[i][1])]);
        }

		$('#container').highcharts({
			chart: {
				type: 'scatter',
				zoomType: 'xy'
			},
			title: {
				text: 'Cloud of 2D Points'
			},
			xAxis: {
				title: {
					enabled: true,
					text: 'X'
				},
				startOnTick: true,
				endOnTick: true,
				showLastLabel: true
			},
			yAxis: {
				title: {
					text: 'Y'
				}
			},
			legend: {
				layout: 'vertical',
				align: 'left',
				verticalAlign: 'top',
				x: 100,
				y: 70,
				floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
				borderWidth: 1
			},
			plotOptions: {
				scatter: {
					marker: {
						radius: 5,
						states: {
							hover: {
								enabled: true
							}
						}
					},
					states: {
						hover: {
							marker: {
								enabled: false
							}
						}
					},
					tooltip: {
						headerFormat: '<b>{series.name}</b><br>',
						pointFormat: '({point.x}, {point.y})'
					}
				}
			},
			series: [{
				name: 'Point',
				showInLegend: false,
				color: '#000000',
				data: store
			}]
		});
		var chart = $('#container').highcharts(), series = chart.series[0];
		chart.series[0].data[0].color = "#FF0000";
		chart.series[0].data[0].update();

		var referenceX = parseFloat(csvdata.data[0][0]);
		var referenceY = parseFloat(csvdata.data[0][1]);
		var closest = Number.POSITIVE_INFINITY;
		var closestIndex = 0;
		var furthest = Number.NEGATIVE_INFINITY;
		var furthestIndex = 0;
		for (var i = 0; i < csvdata.data.length; i++) {
			var d = Math.sqrt(Math.pow(referenceX-parseFloat(csvdata.data[i][0]),2) + Math.pow(referenceY-parseFloat(csvdata.data[i][1]),2));
			if (d > 0) {
				if (d < closest) {
					closest = d;
					closestIndex = i;
				}
				if (d > furthest) {
					furthest = d
					furthestIndex = i;
				}
			}
		}

		chart.series[0].data[closestIndex].color = "#0000FF";
		chart.series[0].data[closestIndex].update();

		chart.series[0].data[furthestIndex].color = "#00FF00";
		chart.series[0].data[furthestIndex].update();				
	});
});
