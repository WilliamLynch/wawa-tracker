function pies(data, tooltip) {

	var indexedByType = data.reduce(function (prev, curr) {
		if (prev[curr.type]) {
	    	prev[curr.type] += 1;
		} else {
	    	prev[curr.type] = 1;
		}
		return prev;
	}, {});

	var indexedByHow = data.reduce(function (prev, curr) {
		if (prev[curr.how]) {
	    	prev[curr.how] += 1;
		} else {
	    	prev[curr.how] = 1;
		}
		return prev;
	}, {});

	var indexedByWhen = data.reduce(function (prev, curr) {
		if (prev[curr.when]) {
	    	prev[curr.when] += 1;
		} else {
	    	prev[curr.when] = 1;
		}
		return prev;
	}, {});

	var indexedByPlace = data.reduce(function (prev, curr) {
		if (prev[curr.place]) {
	    	prev[curr.place] += 1;
		} else {
	    	prev[curr.place] = 1;
		}
		return prev;
	}, {});

	var typeDataType = [];
	var typeDataHow = [];
	var typeDataWhen = [];
	var typeDataPlace = [];

	for (var label in indexedByType) {
	  typeDataType.push({label: label, value: indexedByType[label]});
	}

	for (var how in indexedByHow) {
	  typeDataHow.push({label: how, value: indexedByHow[how]});
	}

	for (var when in indexedByWhen) {
	  typeDataWhen.push({label: when, value: indexedByWhen[when]});
	}

	for (var place in indexedByPlace) {
	  typeDataPlace.push({label: place, value: indexedByPlace[place]});
	}

  	xTyp.domain([0, d3.max(typeDataType, function(d) { return d.value; })]);
  	xHow.domain([0, d3.max(typeDataHow, function(d) { return d.value; })]);
  	xWhn.domain([0, d3.max(typeDataWhen, function(d) { return d.value; })]);
	xPlc.domain([0, d3.max(typeDataPlace, function(d) { return d.value; })]);


// How	
	var wawaHows = d3.select("#how")
		.style({
			"width": thirdWidth + margin.left + margin.right + "px",
			"height": typeDataHow.length * 30 + "px"
		})
	var wawaHow = d3.selectAll(".wawaHows")

	
	wawaHows.selectAll(".wawaHows")
		.data(typeDataHow)
		.enter().append("div")
		.attr("class", "wawaHows")

	d3.selectAll(".wawaHows")
		.append("text")
		.attr("class", "wawaHowText")
		.text(function(d) { return d.label; })

	d3.selectAll(".wawaHows")
		.append("text")
		.attr("class", "wawaHowValue")
		.text(function(d) { return d.value; })

	d3.selectAll(".wawaHows")
		.append("div")
		.attr("class", "wawaHow")
		.style({
			"height": "5px",
			"width": function(d) { return xHow(d.value) - 6 + "px"; }
		})

// When

	var wawaWhens = d3.select("#when")
		.style({
			"width": thirdWidth + margin.left + margin.right + "px",
			"height": typeDataWhen.length * 30 + "px"
		})
	var wawaWhen = d3.selectAll(".wawaWhens")

	wawaWhens.selectAll(".wawaWhens")
		.data(typeDataWhen)
		.enter().append("div")
		.attr("class", "wawaWhens")

	d3.selectAll(".wawaWhens")
		.append("text")
		.attr("class", "wawaWhenText")
		.text(function(d) { return d.label; })

	d3.selectAll(".wawaWhens")
		.append("text")
		.attr("class", "wawaWhenValue")
		.text(function(d) { return d.value; })

	d3.selectAll(".wawaWhens")
		.append("div")
		.attr("class", "wawaWhen")
		.style({
			"height": "5px",
			"width": function(d) { return xWhn(d.value) - 6 + "px"; }
		})

// Place

	var wawaPlaces = d3.select("#place")
		.style({
			"width": thirdWidth + margin.left + margin.right + "px",
			"height": typeDataPlace.length * 30 + "px"
		})
	var wawaPlace = d3.selectAll(".wawaPlaces")

	wawaPlaces.selectAll(".wawaPlaces")
		.data(typeDataPlace)
		.enter().append("div")
		.attr("class", "wawaPlaces")

	d3.selectAll(".wawaPlaces")
		.append("text")
		.attr("class", "wawaPlaceText")
		.text(function(d) { return d.label; })

	d3.selectAll(".wawaPlaces")
		.append("text")
		.attr("class", "wawaPlaceValue")
		.text(function(d) { return d.value; })

	d3.selectAll(".wawaPlaces")
		.append("div")
		.attr("class", "wawaPlace")
		.style({
			"height": "5px",
			"width": function(d) { return xPlc(d.value) - 6 + "px"; }
		})

	// Type / Pie Chart
	var pie = d3.layout.pie()
		.sort(null)
	    .value(function(d) { return d.value; });

	var w = parseInt(d3.select('.type').style('width'), 10);
	var h = w / 2;
	var center = w / 2;
	var radius = Math.min(w, h) / 2;
	var outerRadius = w / 6;
	var innerRadius = 0;

	var key = function(d){ return d.data.label; };

	//Create SVG element
	var svg = d3.select("svg#type")
		.attr("width", w)
		.attr("height", h)
		.append("g")

	svg.attr("transform", "translate(" + center + ", " + center / 2 + ")")
		.append("defs")
			.append("pattern")
			.attr("id", "bg")
			.attr('patternUnits', 'userSpaceOnUse')
	        .attr('width', w / 5)
	        .attr('height', w / 5)
	        .attr('x', 60)
			.attr('y', 0)
			.append("image")
				// .attr("xlink:href", "images/wawaPattern.jpg")
				// .attr("xlink:href", "images/wawa.png")
				.attr("xlink:href", "images/cookiePattern.jpg")
				.attr('width', w / 5 + 1)
		        .attr('height', w / 5 + 1)
		        .attr('x', 0)
				.attr('y', 0);

	svg.append("g")
		.attr("class", "slices");
	svg.append("g")
		.attr("class", "labels");
	svg.append("g")
		.attr("class", "lines");

	var arc = d3.svg.arc()
	    .innerRadius(innerRadius)
	    .outerRadius(outerRadius);

	var arcOutter = d3.svg.arc()
	    .innerRadius(outerRadius)
	    // .outerRadius(outerRadius + 10);
	    .outerRadius(outerRadius);

	var arcPhantom = d3.svg.arc()
	    .innerRadius(0)
	    // .outerRadius(outerRadius + 20);
	    .outerRadius(outerRadius);

	var outerArc = d3.svg.arc()
		.innerRadius(radius * 0.9)
		.outerRadius(radius * 0.9);

	var innerArc = d3.svg.arc()
		.innerRadius(radius * 0.6)
		.outerRadius(radius * 0.6);

	//Set up groups
	var slice = svg.select(".slices")

	var arcs = slice.selectAll("g.arc")
	    .data(pie(typeDataType))
	    .enter()
	    .append("g")
	    .attr("class", "arc");
	    

	//Set up outter arc groups
	var outterArcs = slice.selectAll("g.outter-arc")
	    .data(pie(typeDataType))
	    .enter()
	    .append("g")
	    .attr("class", "outter-arc");

	//Set up phantom arc groups
	var phantomArcs = slice.selectAll("g.phantom-arc")
	    .data(pie(typeDataType))
	    .enter()
	    .append("g")
	    .attr("class", "phantom-arc");

	//Draw arc paths
	arcs.append("path")
		.style("fill", "url(#bg)")
	    .attr("d", arc);

	//Draw outter arc paths
	outterArcs.append("path")
	    // .attr("fill", '#EBC66C')
	    .attr("fill", '#ff8000')
	    // .attr("d", arcOutter).style('stroke', '#FFFFF7')
	    .attr("d", arcOutter).style('stroke', '#ff8000')
	    .style('stroke-width', 0);

	//Draw phantom arc paths
	phantomArcs.append("path")
	    // .attr("fill", '#FFFFF7')
	    .attr("fill", '#ff8000')
	    .attr("fill-opacity", 0)
	    // .attr("d", arcPhantom).style('stroke', '#FFFFF7')
	    .attr("d", arcPhantom).style('stroke', '#ff8000')
	    .style('stroke-width', 6);

	//    
	// Labels text 
	//

	var text = svg.select(".labels").selectAll("text")
		.data(pie(typeDataType), key);

	text.enter()
		.append("text")
		.attr("dy", ".35em")
		// .attr("class", "pieLegend")
		.attr("class", "wawaLegend")
		.text(function(d) {
			return d.data.value + " - " + d.data.label;
		});
	
	function midAngle(d){
		return d.startAngle + (d.endAngle - d.startAngle)/2;
	}

	text.transition().duration(1000)
		.attrTween("transform", function(d) {
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
				return "translate("+ pos +")";
			};
		})
		.styleTween("text-anchor", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				return midAngle(d2) < Math.PI ? "start":"end";
			};
		});

	// use this to animate the graph
	//text.exit()
		//.remove();

	// Labels line 
	var polyline = svg.select(".lines").selectAll("polyline")
		.data(pie(typeDataType), key);
	
	polyline.enter()
		.append("polyline");

	polyline.transition().duration(1000)
		.attrTween("points", function(d){
			this._current = this._current || d;
			var interpolate = d3.interpolate(this._current, d);
			this._current = interpolate(0);
			return function(t) {
				var d2 = interpolate(t);
				var pos = outerArc.centroid(d2);
				pos[0] = radius * 0.90 * (midAngle(d2) < Math.PI ? 1 : -1);
				return [innerArc.centroid(d2), outerArc.centroid(d2), pos];
			};			
		});

}