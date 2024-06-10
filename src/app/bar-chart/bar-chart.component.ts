import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import * as d3 from 'd3';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit{
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.createBarChart();
    }
  }
 
  private createBarChart(): void {
    const data = [30, 200, 100, 400, 150, 250];
    const svg = d3.select("app-bar-chart").append("svg")
                  .attr("width", 500)
                  .attr("height", 300)
                  .style("border", "2px solid black")
                  .style("padding", "20px");
    
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", d => 300 - d)
      .attr("width", 65)
      .attr("height", d => d)
      .attr("fill", "blue")
      .attr("stroke", "green")
      .attr("stroke-width", 2);
  }

}
