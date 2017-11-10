

//set margins
var margin = {top: 150, right: 75, bottom: 100, left: 75};
var width = 600 - margin.left - margin.right;
var height = 800 - margin.top - margin.bottom;


//load data
d3.json("count_by_type.json", function(error, data) {
  if (error) throw error;

  //sort descending
  dataset = data.sort(function(a,b) {return b.count - a.count;});

  //ensure count is a number
  dataset.forEach(function (d) {
    d.type = d.type
    d.count = +d.count;
  });

  makeBarchart();
});



function makeBarchart() {

  //create scales
  var xScale = d3.scaleBand()
                  .domain(dataset.map(function(d) {return d.type;}))
                  .range([0,width]);


  var yScale = d3.scaleLinear()
                  .domain([d3.max(dataset, function(d) {return d.count;}), 0])
                  .range([height, 0]);


  //set up svg
  svg = d3.select("#chart")
          .append('svg')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append('g')
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  //x axis
  svg.append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(d3.axisTop(xScale)
              .tickSizeInner(0)
              .tickSizeOuter(0)
              .tickPadding(5)
              .tickValues([]));


  //y axis
  var yAxis = d3.axisLeft(yScale)
                .tickSizeInner(0)
                .tickSizeOuter(0)
                .tickPadding(5)
                .tickValues([0, 100, 200, 300, 400, 500, 600]);

  svg.append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(yAxis)
      .selectAll('text')
      .attr('transform', 'rotate(-45)')


  //bars
  g.selectAll(".bar")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {return xScale(d.type);})
    .attr("y", 0)
    .attr("width", function(d) {return xScale.bandwidth();})
    .attr("height", function(d) {return yScale(d.count);})
    .attr("class", function(d) {
        var c
        if (d.type == 'labor') {c = 'labor_bar'}
        else if (d.type == 'adult_sex') {c = 'adult_bar'}
        else {c = 'minor_bar'}
        return c
    });


  //title
  svg.append("text")
      .attr("class", "title")
      .attr("y", margin.left - 20)
      .attr("x", margin.left)
      .style("text-anchor", "left")
      .text("Minor sex trafficking comprises majority");

    svg.append("text")
        .attr("class", "title")
        .attr("y", margin.left)
        .attr("x", margin.left)
        .style("text-anchor", "left")
        .text("of U.S. human trafficking prosecutions");


  //subtitle
  svg.append("text")
      .attr("id", "subtitle")
      .attr("y", margin.left + 20)
      .attr("x", margin.left)
      .style("text-anchor", "left")
      .text("U.S. human trafficking cases by type");


  //x axis labels
  svg.append("text")
      .attr("class", "axisLabel")
      .attr("y", margin.top - 10)
      .attr("x", (width + margin.left + margin.right) / 2)
      .style("text-anchor", "middle")
      .text("Type of Trafficking");


  //y axis labels
  svg.append("text")
      .attr("class", "axisLabel")
      .attr("transform", "rotate(-90)")
      .attr("y", margin.left - 35)
      .attr("x", -1 * width)
      .text("Number of Cases");


  //legend
  svg.append('rect')
      .attr('class', 'legend_box')
      .attr('y', height + margin.top)
      .attr('x', width - 1.5 * margin.right)
      .attr('width', 15)
      .attr('height', 15)
      .style('fill', '#303841')

  svg.append('text')
      .attr('class', 'legend_text')
      .attr('y', height + margin.top + 12)
      .attr('x', width - 1.5 * margin.right + 20)
      .text('Minor sex trafficking')

  svg.append('rect')
      .attr('class', 'legend_box')
      .attr('y', height + margin.top + 20)
      .attr('x', width - 1.5 * margin.right)
      .attr('width', 15)
      .attr('height', 15)
      .style('fill', '#f6c90e')

  svg.append('text')
      .attr('class', 'legend_text')
      .attr('y', height + margin.top + 32)
      .attr('x', width - 1.5 * margin.right + 20)
      .text('Adult sex trafficking')

  svg.append('rect')
      .attr('class', 'legend_box')
      .attr('y', height + margin.top + 40)
      .attr('x', width - 1.5 * margin.right)
      .attr('width', 15)
      .attr('height', 15)
      .style('fill', '#9a9b94')

  svg.append('text')
      .attr('class', 'legend_text')
      .attr('y', height + margin.top + 52)
      .attr('x', width - 1.5 * margin.right + 20)
      .text('Labor trafficking')


  //source
  svg.append('text')
      .attr('id', 'source')
      .attr('y', height + margin.top + 52)
      .attr('x', margin.left)
      .text('Source: HumanTraffickingData.org')

};
