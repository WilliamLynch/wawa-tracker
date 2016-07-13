function type(data, tooltip) {

	var indexedByType = data.reduce(function (prev, curr) {
		if (prev[curr.type]) {
	    	prev[curr.type] += 1;
		} else {
	    	prev[curr.type] = 1;
		}
		return prev;
	}, {});

	var indexedByName = data.reduce(function (prev, curr) {
		if (prev[curr.name]) {
	    	prev[curr.name] += 1;
		} else {
	    	prev[curr.name] = 1;
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

	var typeDataType = [];
	var typeDataName = [];
	var typeDataHow = [];
	var typeDataWhen = [];

	for (var label in indexedByType) {
	  typeDataType.push({label: label, value: indexedByType[label]});
	}

	for (var name in indexedByName) {
	  typeDataName.push({label: name, value: indexedByName[name]});
	}

	for (var how in indexedByHow) {
	  typeDataHow.push({label: how, value: indexedByHow[how]});
	}

	for (var when in indexedByWhen) {
	  typeDataWhen.push({label: when, value: indexedByWhen[when]});
	}

  	xTyp.domain([0, d3.max(typeDataType, function(d) { return d.value; })]);
  	xNme.domain([0, d3.max(typeDataName, function(d) { return d.value; })]);
  	xHow.domain([0, d3.max(typeDataHow, function(d) { return d.value; })]);
  	xWhn.domain([0, d3.max(typeDataWhen, function(d) { return d.value; })]);

	var wawaTypes = d3.select("#type")
		.style({
			"width": thirdWidth + margin.left + margin.right + "px",
			"height": typeDataType.length * 30 + "px"
		})
	var wawaType = d3.selectAll(".wawaTypes")

	wawaTypes.selectAll(".wawaTypes")
		.data(typeDataType)
		.enter().append("div")
		.attr("class", "wawaTypes")

	d3.selectAll(".wawaTypes")
		.append("text")
		.attr("class", "wawaTypeText")
		.text(function(d) { return d.label; })

	d3.selectAll(".wawaTypes")
		.append("text")
		.attr("class", "wawaTypeValue")
		.text(function(d) { return d.value; })

	d3.selectAll(".wawaTypes")
		.append("div")
		.attr("class", "wawaType")
		.style({
			"height": "4px",
			"width": function(d) { return xTyp(d.value) - 6 + "px"; }
		})

	var wawaPlaces = d3.select("#place")
		.style({
			"width": thirdWidth + margin.left + margin.right + "px",
			"height": typeDataName.length * 30 + "px"
		})
	var wawaPlace = d3.selectAll(".wawaPlaces")

	wawaPlaces.selectAll(".wawaPlaces")
		.data(typeDataName)
		.enter().append("div")
		.attr("class", "wawaPlaces")

	d3.selectAll(".wawaPlaces")
		.append("text")
		.attr("class", "wawaPlaceText")
		.text(function(d) { return d.label; })

	d3.selectAll(".wawaPlaces")
		.append("text")
		.attr("class", "wawaTypeValue")
		.text(function(d) { return d.value; })

	d3.selectAll(".wawaPlaces")
		.append("div")
		.attr("class", "wawaPlace")
		.style({
			"height": "4px",
			"width": function(d) { return xNme(d.value) - 6 + "px"; }
		})

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
			"height": "4px",
			"width": function(d) { return xHow(d.value) - 6 + "px"; }
		})

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
			"height": "4px",
			"width": function(d) { return xWhn(d.value) - 6 + "px"; }
		})
}