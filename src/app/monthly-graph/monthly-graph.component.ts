import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as d3 from 'd3';

interface DataPoint {
  name: string;
  value: number;
}

@Component({
  selector: 'app-monthly-graph',
  templateUrl: './monthly-graph.component.html',
  styleUrl: './monthly-graph.component.css',
})
export class MonthlyGraphComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  weeklygraph: DataPoint[] = [
    { name: 'N-4', value: 1 },
    { name: 'N-3', value: 2 },
    { name: 'N-2', value: 0.5 },
    { name: 'N-1', value: 1 },
    { name: 'Current Wk', value: 3 },
  ];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createWeeklyChat();
    }
  }

  createWeeklyChat() {
    const width = 600;
    const height = 300;
    const marginTop = 30;
    const marginRight = 50;
    const marginBottom = 30;
    const marginLeft = 30;

    const x = d3
      .scaleBand()
      .domain(this.weeklygraph.map((data) => data.name))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.weeklygraph, (d) => d.value)!])
      .range([height - marginBottom, marginTop]);

    const line = d3.line<DataPoint>() //creates a line generator function.
      .x((d: any) => x(d.name)! + x.bandwidth() / 2) // Adjust x position for center alignment
      .y((d: any) => y(d.value))
      // .curve(d3.curveLinear);

    const svg = d3
      .select('app-monthly-graph')
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
      .data(d3.group(this.weeklygraph, (d) => d.name))
      .join('g');

    svg
      .append('path')
      .datum(this.weeklygraph)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('d', line);

    serie
      .append('g')
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round')
      .attr('text-anchor', 'middle')
      .selectAll()
      .data((d) => d[1])
      .join('text')
      .text((d) => d.value + '%')
      .attr('dy', '-1em')
      .attr('x', (d) => x(d.name)! + x.bandwidth() / 2)
      // .attr("x", d => x(d.day) ?? 0)
      .style('fill', 'green') // Set text color to green
      .style('font-weight', '800') // Make text bold
      .style('font-size', '12px')
      .attr('y', (d) => y(d.value))
      .call((text) => text.filter((d, i, data) => i === data.length - 1))
      .append('tspan')
      .attr('font-weight', 'bold')
      .clone(true)
      .lower()
      .attr('fill', 'red')
      .attr('stroke', 'white')
      .attr('stroke-width', 6);
  }
}
