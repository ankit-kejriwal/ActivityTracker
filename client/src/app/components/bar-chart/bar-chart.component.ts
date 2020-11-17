import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @Input() item: any;
  constructor() {}

  ngOnInit(): void {
    this.getPieChart();
  }

  getPieChart(){
    // container size
    const width = 400;
    const  height = 350;
    const margin = { top: 90, right: 20, bottom: 30, left: 80 };

    const data = [];
    // tslint:disable-next-line: forin
    for (const key in this.item) {
      const obj = {
        label : key,
        value : this.item[key]
      };
      data.push(obj);
    }

    // x scale
    const xScale = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);

    // y scale
    const yScale = d3.scale.linear().range([height, 0]);

    // set x and y scales
    xScale.domain(
      data.map( (d) => {
        return d.label;
      })
    );
    yScale.domain([
      0,
      d3.max(data, (d) => {
        return d.value;
      }),
    ]);

    // x axis
    const xAxis = d3.svg.axis().scale(xScale).orient('bottom').outerTickSize(0);

    // y axis
    const yAxis = d3.svg.axis().scale(yScale).orient('left');

    // create svg container
    const svg = d3
      .select('#barChart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Horizontal grid (y axis gridline)
    svg
      .append('g')
      .attr('class', 'grid horizontal')
      .call(
        d3.svg
          .axis()
          .scale(yScale)
          .orient('left')
          .tickSize(-(height + margin.top + margin.bottom - 70), 0, 0)
          .tickFormat('')
      );

    // create bars
    const bars = svg.selectAll('.bar').data(data).enter().append('g');

    bars
      .append('rect')
      .attr('class', 'bar')
      .attr('x',  (d) => {
        return xScale(d.label);
      })
      .attr('width', xScale.rangeBand())
      .attr('y',  (d) => {
        return yScale(d.value);
      })
      .attr('height',  (d) => {
        return height - yScale(d.value);
      })
      .on('click',  (d, i) => {
        d3.selectAll('.label-text').classed('selected', false);

        d3.selectAll('.bar').classed('selected', false);

        d3.selectAll('.axis-text').classed('selected', false);

        d3.select(this.nextSibling).classed('label-text selected', true);

        d3.select(this).classed('bar selected', true);

        d3.select('#axis-text-' + i).classed('axis-text selected', true);
        alert('clicked on bar');
      });

    // apply text at the top
    bars
      .append('text')
      .attr('class', 'label-text')
      .attr('x',  (d) => {
        return xScale(d.label) + xScale.rangeBand() / 2 - 10;
      })
      .attr('y',  (d) => {
        return yScale(d.value) + 2;
      })
      .attr('transform',  (d) => {
        return 'translate(10, -10)';
      })
      .text( (d) => {
        return d.value;
      });

    // draw x axis
    svg
      .append('g')
      .attr('id', 'x-axis')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    // apply class & id to x-axis texts
    d3.select('#x-axis')
      .selectAll('text')
      .attr('class', 'axis-text')
      .attr('id',  (d, i) => {
        return 'axis-text-' + i;
      });

    // draw y axis
    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end');

    // remove 0 in y axis
    svg
      .selectAll('.tick')
      .filter( (d) => {
        return d === 0;
      })
      .remove();
  }
}
