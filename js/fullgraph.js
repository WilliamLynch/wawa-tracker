function fullgraph(data, tooltip) {

	var perMonth = d3.nest()
		.key(function(d) { return d3.time.month(d.date); })
		.entries(data);

	var perDay = d3.nest()
		.key(function(d) { return d3.time.day(d.date); })
		.entries(data);

	thirtyDaysAgo = d3.time.hour.offset(new Date(),-30)

	yTml.domain([0, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20])
	// xTml.domain([new Date(2016, 03, 1), new Date(2016, 12, 15)]).range([0, width]);
	xTml.domain([d3.time.day.offset(new Date(),-21), d3.time.day.offset(new Date(),5)]).range([0, width]);


	var customTimeFormat = d3.time.format.multi([
	  [".%L", function(d) { return d.getMilliseconds(); }],
	  [":%S", function(d) { return d.getSeconds(); }],
	  ["%I:%M", function(d) { return d.getMinutes(); }],
	  ["%I %p", function(d) { return d.getHours(); }],
	  ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
	  ["%b %d", function(d) { return d.getDate() != 1; }],
	  ["%B", function(d) { return d.getMonth(); }],
	  ["%Y", function() { return true; }]
	  ]);


	var timeline = d3.select("#timeline")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom + 50)
		.append("g")
	    .attr("transform", "translate(" + margin.left + ", 20)");

	var gy = timeline.append("g")
	    .attr("class", "y axis")
	    .call(yAxis)
	    .call(customAxis);

	var gx = timeline.append("g")
	    .attr("class", "x axis")
	    .attr("transform", "translate(0," + height + ")")
	    .call(xAxis)
	    .selectAll("text")
	    .attr("y", 0)
	    .attr("x", 9)
	    .attr("dy", ".35em")
	    .attr("transform", "rotate(45)")
	    .style("text-anchor", "start");

	var toolTipDate = d3.time.format("%a, %d %b");

	var line = d3.svg.line()
		// Creates a line from markers, so it'll connect june to july or july 1 to july 2 and so on
	    // .x(function(d) { return xTml(d3.time.month(d.values[0].date)); })
	    .x(function(d) { return xTml(d3.time.day(d.values[0].date)); })
	    .y(function(d) { return yTml(d.values.length); });

	timeline.append("path")
		// .datum(perMonth)
		.datum(perDay)
		.attr("class", "line")
		.attr("d", line)
		.style({
			"fill": "none",
			"stroke": "red",
			"stroke-width": "1.5px"
		})

	timeline.selectAll(".wawa")
		// .data(perMonth)
		.data(perDay)
		.enter().append("circle")
		.attr("class", "wawa")
		.attr("r", 6)
		// Creates Tick Markers based on the value in the day or month slot of the date
		// .attr("cx", function(d) { return xTml(d3.time.month(d.values[0].date)); })
		.attr("cx", function(d) { return xTml(d3.time.day(d.values[0].date)); })
		.attr("cy", function(d) { return yTml(d.values.length); })
		.on("mouseover", function(d) {
			var content = d.values.reduce(function(content, v) {
				content += "<h4><small>" + v.name + " - " + v.address +", "+ v.city + "</small></h4><i>" + v.type2 + " / " + v.vote + " stars</i><br/><br/>"
				return content
			}, "");

        	tooltip.transition()
               .duration(200)
               .style("opacity", .9);
        	tooltip.html("<h4>"+ d.values.length + plural(d.values.length) +"</h4><hr>" + content)
               .style({
               		"min-width": "120px",
	               	"left": (d3.event.pageX + 20) + "px",
	               	"top": (d3.event.pageY - 100) + "px"
               })
	    })
      	.on("mouseout", function(d) {
         	tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      	})
      	.on("click", function(d) {
         	tooltip.transition()
               .duration(500)
               .style("opacity", 0);
      	});
}