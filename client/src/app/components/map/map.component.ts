import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit {
  @Input() item: any;
  constructor() {}

  ngOnInit(): void {
    this.drawGraph(this.item);
  }

  drawGraph(item){
    var width = 400,
      height = 400;

    var projection = d3.geo
      .azimuthalEqualArea()
      .clipAngle(180 - 1e-3)
      .scale(100)
      .translate([width / 2, height / 2])
      .precision(0.1);

    var path = d3.geo.path().projection(projection);

    var graticule = d3.geo.graticule();

    var svg = d3
      .select('#graph')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg
      .append('defs')
      .append('path')
      .datum({ type: 'Sphere' })
      .attr('id', 'sphere')
      .attr('d', path);

    svg.append('use').attr('class', 'stroke').attr('xlink:href', '#sphere');

    svg.append('use').attr('class', 'fill').attr('xlink:href', '#sphere');

    svg
      .append('path')
      .datum(graticule)
      .attr('class', 'graticule')
      .attr('d', path);

    d3.json('http://bl.ocks.org/mbostock/raw/4090846/world-50m.json', function (
      error,
      world
    ) {
      svg
        .insert('path', '.graticule')
        .datum(topojson.feature(world, world.objects.land))
        .attr('class', 'land')
        .attr('d', path);

      svg
        .insert('path', '.graticule')
        .datum(
          topojson.mesh(world, world.objects.countries, function (a, b) {
            return a !== b;
          })
        )
        .attr('class', 'boundary')
        .attr('d', path);
    });

    // Likewise, cx should take the first coordinate of the projection's output array, cy the second
    svg
      .selectAll('circle')
      .data(item)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return projection(d.coordinates)[0];
      })
      .attr('cy', function (d) {
        return projection(d.coordinates)[1];
      })
      .attr('r', '2px')
      .attr('fill', 'red');
  }
}
