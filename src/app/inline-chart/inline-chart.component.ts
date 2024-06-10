import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as d3 from 'd3';
import { isPlatformBrowser } from '@angular/common';


interface DataPoint {
  day: string;
  value: number;
}

@Component({
  selector: 'app-inline-chart',
  templateUrl: './inline-chart.component.html',
  styleUrl: './inline-chart.component.css',
})
export class InlineChartComponent implements OnInit {
  data: DataPoint[] = [
    { day: 'Mon', value: 1 },
    { day: 'Tue', value: 2 },
    { day: 'Wed', value: 0.5 },
    { day: 'Thu', value: 1 },
    { day: 'Fri', value: 3 },
    { day: 'Sat', value: 2 },
    { day: 'Sun', value: 1 },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createInlineChart();
    }
  }

  createInlineChart() {
    const width = 600;
    const height = 300;
    const marginTop = 30;
    const marginRight = 50;
    const marginBottom = 30;
    const marginLeft = 30;

    // Create the horizontal, vertical and color scales.

    const x = d3
    .scaleBand()
    .domain(this.data.map((d) => d.day))
    .range([marginLeft, width - marginRight])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(this.data, (d) => d.value)!])
    .range([height - marginBottom, marginTop]);


    // Create a line generator
  const line = d3
    .line<DataPoint>()
    .x((d) => x(d.day)! + x.bandwidth() / 2) // Adjust x position for center alignment
    .y((d) => y(d.value))
    // .curve(d3.curveLinear);


    // Create the SVG container.
    const svg = d3
    .select('app-inline-chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')
    .style('border', '1px solid red');

    svg
      .append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );



    // Add a container for each series.
    const serie = svg
      .append('g')
      .selectAll()
      .data(d3.group(this.data, (d) => d.day))
      .join('g');


      // Draw the lines
      svg
      .append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('d', line);
  
   // Append the labels.
   serie.append("g")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("text-anchor", "middle")
      .selectAll()
      .data(d => d[1])
      .join("text")
      .text(d => d.value+"%")
        .attr("dy", "-1em")
        .attr("x", d => x(d.day)! + x.bandwidth() / 2 ) 
        // .attr("x", d => x(d.day) ?? 0) 
        .style("fill", "green") // Set text color to green
        .style("font-weight", "800") // Make text bold
        .style('font-size','12px')
        .attr("y", d => y(d.value))
        .call(text => text.filter((d, i, data) => i === data.length - 1))
          .append("tspan")
          .attr("font-weight", "bold")
      .clone(true).lower()
      .attr("fill", "red")
      .attr("stroke", "white")
      .attr("stroke-width", 6);

  }

}
