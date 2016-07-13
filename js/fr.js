function fr(frMap, wawaData, tooltip) {

	// grouping the cities
	var indexedByCity = wawaData.reduce(function (prev, curr) {
		if (prev[curr.city]) {
	    	prev[curr.city] = {value: prev[curr.city].value + 1, longi: curr.longi, lat: curr.lat};
		} else {
	    	prev[curr.city] = {value: 1, longi: curr.longi, lat: curr.lat};
		}
		return prev;
	}, {});

	var typeDataCity = [];

	for (var city in indexedByCity) {
	  typeDataCity.push({label: city, value: indexedByCity[city].value, longi: indexedByCity[city].longi, lat: indexedByCity[city].lat});
	}
	//console.log(typeDataCity)

	// world map
	var mapWidth = 960;
	var mapHeight = 450;

	var projection = d3.geo.mercator()
	    // .center([-73.94, 40.70])
	    .center([-74.836881,40.241167])
  		.scale(100000)
  		.translate([(width) / 4, (height)/1.5])
  		.precision(.1)

	var map = d3.select("#fr")
	  .attr("width", mapWidth/2)
	  .attr("height", mapHeight);

	var path = d3.geo.path()
	  .projection(projection);

	var g = map.append("g");

	g.selectAll("path")
		.data(frMap.features)
	  	.enter()
	    .append("path")
	    .attr("class", function(d) { return "subunit " + d.id; })
	    .attr("d", path)
	    // .attr("fill", "#EBE1C5")
	    .attr("fill", "#ff8000")

	/*g.append("path")
		.datum(topojson.mesh(worldMap, worldMap.objects.countries, function(a, b) { return a !== b; }))
		.attr("class", "boundary")
		.attr("d", path);*/

	g.selectAll(".mark")
	    .data(typeDataCity)
	    .enter()
	    .append("circle")
	    .attr("class", "pizzaPin")
	    .attr('r', function(d) { return 5 + d.value / 1.8})
	    .attr("transform", function(d) { return "translate(" + projection([d.longi,d.lat]) + ")";})
	    .on("mouseover", function(d) {
        	tooltip.transition()
               .duration(200)
               .style("opacity", .9);
        	tooltip.html(d.label + "<br/><hr><i>" + d.value + plural(d.value) + "</i>")
               .style({
               		"min-width": "120px",
	               	"left": (d3.event.pageX) + "px",
	               	"top": (d3.event.pageY - 80) + "px"
               })
	    })
      	.on("mouseout", function(d) {
         	tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      	})

    g.selectAll(".mark")
	    .data(typeDataCity)
	    .enter()
    	.append("circle")
    	.attr("r", 2)
    	.attr("transform", function(d) { return "translate(" + projection([d.longi,d.lat]) + ")";})
    	.attr("class", "pizzaPinCenter")


    /*
	g.selectAll(".numbers")
		.data(typeDataCity)
		.enter()
		.append("text")
		.attr("class", "pizzaVote")
		.text(function(d) { 
			if (d.value >= 10){
				return d.value 
			}
		})
		.attr("fill", "white")
		.style("font-size", "12px")
		.attr("transform", function(d) { return "translate(" + projection([d.longi - 1.3, d.lat - 0.7]) + ")";});
	*/

}