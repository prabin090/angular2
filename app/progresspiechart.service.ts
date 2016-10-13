import { Injectable } from '@angular/core';
import * as d3  from 'd3';
@Injectable()
export class ProgressPieChartService {
    public CreatepieChartnew(parent: any, chartData: any) {

        console.log(chartData, 'chartData')
        //define variables 
        var percent = chartData['percentage'];
        var firm = chartData['name'];
        var Id = chartData['id']
        var totalAmount = RoundtoNearestvalue(percent);
        // var totalAmount = chartData['total'];;
        var ratio = percent / totalAmount;
        var w = 240;
        var h = 240;
        var margintop = 20;
        var marginbottom = 20;
        var marginleft = 40;
        var marginright = 20;
        var outerRadius = (w / 2) - 10;
        var innerRadius = (w / 2) - 30;
        var color = ['red', 'orange', '#404F70'];


        function RoundtoNearestvalue(value: any) {
            value = Math.ceil(value / 100) * 100;
            return value;
        };


        //define pie 
        var pie = d3.layout.pie()
            .value(function (d) {
                return d
            })
            .sort(null);

        //function to apply color-gradient on pie arc 
        var createGradient = function (svg: any, id: any, color1: any, color2: any) {

            var defs = svg.append("svg:defs")

            var red_gradient = defs.append("svg:linearGradient")
                .attr("id", id)
                .attr("x1", "0%")
                .attr("y1", "10%")
                .attr("x2", "50%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

            red_gradient.append("svg:stop")
                .attr("offset", "10%")
                .attr("stop-color", color1)
                .attr("stop-opacity", 1);

            red_gradient.append("svg:stop")
                .attr("offset", "100%")
                .attr("stop-color", color2)
                .attr("stop-opacity", 1);
        };
        // debugger;
        //define svg
        setTimeout(function () {
            var svg = d3.select(parent)
                .append("svg")
                .attr('width', w + marginleft + marginright)
                .attr('height', h + margintop + marginbottom)
                .attr('class', 'shadow' + firm)
                .append('g')
                .attr({
                    transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
                });
            createGradient(svg, 'gradient', color[0], color[1]);


            // console.log(svg, 'svg')
            // debugger;

            //define arc for pie
            var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(0)
                .endAngle(2 * Math.PI);

            //define arc for plot value 
            var arcLine = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)
                .startAngle(0)
                .cornerRadius(20);
            //tooltip 
            var Tool_tip = d3.select("body").append("div")
                .attr("class", "tool-tip_progress" + firm);

            //append path for pie chart
            var pathBackground = svg.append('path')

                .attr({
                    d: arc
                })
                .style({
                    fill: color[2]
                }).on('mousemove', function (d) {
                    Tool_tip.style("position", 'relative');
                    Tool_tip.style("left", d3.event["pageX"] + 10 + "px");
                    Tool_tip.style("top", d3.event["pageY"] - 360 + "px");
                    Tool_tip.style("display", "inline-block");
                    Tool_tip.style("background-color", "white");
                    Tool_tip.style("color", "black");
                    Tool_tip.style("z-index", "9999");
                    Tool_tip.style("border", "3px solid #404F70");
                    Tool_tip.html('NAME:' + firm + '<br>' + 'PERCENTAGE:' + (100 - Math.round(ratio * 100)) + "%" + '<br>' + 'ID:' + Id)
                        .style("font-weight", "bold");
                }).on('mouseout', function (d) {
                    Tool_tip.style("display", "none");
                })


            //append background arc to plot value 

            var g = svg.append('g')
                .datum({ Firm: firm, value: percent, endAngle: 0 });

            var pathChart = g.append('path')
                .attr('d', <any>arcLine)
                .attr('class', "pathchart")
                .style({
                    fill: 'steelblue'
                });
            g.on('mousemove', function (d) {
                Tool_tip.style("position", 'relative');
                Tool_tip.style("left", d3.event["pageX"] + 30 + "px");
                Tool_tip.style("top", d3.event["pageY"] - 360 + "px");
                Tool_tip.style("display", "inline-block");
                Tool_tip.style("background-color", "white");
                Tool_tip.style("color", "black");
                Tool_tip.style("border", "3px solid steelblue");
                   Tool_tip.style("z-index", "9999");
                Tool_tip.html('NAME:' + firm + '<br>' + 'PERCENTAGE:' + (Math.round(ratio * 100)) + "%" + '<br>' + 'ID:' + Id)
                    .style("font-weight", "bold");
                // d3.selectAll('.ghostarc' + firm).style('display', 'block')
            })
                .on('mouseout', function (d) {
                    Tool_tip.style("display", "none");
                    // d3.selectAll('.ghostarc' + firm).style('display', 'none')
                })


            //append a circle of radius innerRadius  inside pie 
            var circle = svg.append('circle')
                .attr({
                    cx: 0,
                    cy: 0,
                    r: innerRadius
                })
                .style({
                    fill: '#0C0C0C',
                    'fill-opacity': .5
                });

            //append text
            var middleCount = svg.append('text')
                .text(function (d) {
                    return d;
                })
                .attr({
                    class: 'middleText',
                    'text-anchor': 'middle',
                })
                .style({
                    fill: 'black',
                    'font-size': '35px',
                    'font-weight': 'bold'
                })
                .attr('x', -8)
                .attr('y', 7);

            svg.append('text')
                .text('HERO NAME: ' + firm)
                .style({
                    fill: 'black',
                    'font-size': '13px',
                    'font-family': 'cursive',
                    'font-weight': 'bold'

                })
                .attr('x', -65)
                .attr('y', 35)

            //function fopr transition of arc
            var arcTween = function (transition: any, newAngle: any) {
                transition.attrTween("d", function (d: any) {
                    var interpolate = d3.interpolate(d.endAngle, newAngle);
                    var interpolateCount = d3.interpolate(0, percent);
                    return function (t: any) {
                        d.endAngle = interpolate(t);
                        middleCount.text(d.value);
                        return arcLine(d);
                    };
                });
            };



            //set animation to arc
            var animate = function () {
                pathChart.transition()
                    .duration(750)
                    .ease('cubic')
                    .call(arcTween, ((2 * Math.PI)) * ratio);

            };

            setTimeout(animate, 0);
        }, 1000)
    }


}
