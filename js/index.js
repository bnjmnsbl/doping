var url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

var margin = {
  left: 70,
  right: 20,
  top: 20,
  bottom: 50
}

var w = 800 - margin.left - margin.right;
var h = 500 - margin.top - margin.bottom;

//set ranges of X and Y
var x = d3.scaleLinear()
      .range([w, 0])
      .domain([0, 190]);
      
var y = d3.scaleLinear()
      .range([h, 0])
      .domain([36, 1]);

var svg = d3.select("#plot")
          .append("svg")
          .attr("width", w + margin.left + margin.right)
          .attr("height", h + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")

var tooltip = d3.select("body").append("div")
   .attr("class", "tooltip")
   .style("opacity", 0);

$.getJSON(url, function(json) {
  
  //time formatting
  var formatCount = d3.format(",.0f");
  var formatTime = d3.timeFormat("%H:%M");
  var formatMinutes = function(d) {
    
    var t = new Date(2012, 0, 1, 0, d) 
    
    return formatTime(t);
  };
 

  // Draw X-Axis
  svg.append("g")
      .attr("transform", "translate(0," + h + ")")
      .call(d3.axisBottom(x).ticks(8).tickFormat(formatMinutes));
      
   // Add X-Label  
  svg.append("text")
      .attr("class", "label")
      .attr("transform", "translate(" + w/2 + " ," + (h+margin.top+20) +")")    
      .style("text-anchor", "middle")
      .text("Time");

// Draw Y-Axis
 svg.append("g")
      .call(d3.axisLeft(y))
  y.domain([35, 1]);  

 // Add Y-Label
  svg.append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("x", 0-(h/2))
      .attr("y", 0-50)
      .style("text-anchor", "middle")
      .text("Ranking");
 
// Add Circles
 svg.selectAll(".dot")
      .data(json)
      .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 5)
      .attr("fill", function(d) {
       
          if (d.Doping == "") {
          return "black"
        } else {
          return "red";
        }
 })
      .attr("cx", function(d) {
               
        return x(d.Seconds-2210) }) //format this right
      .attr("cy", function(d) {return y(d.Place)})
      .on("mouseover", function(d) {
         tooltip.transition()
            .duration(10)
            .style("opacity", .9);
         tooltip.html(d.Name + " (" + d.Nationality + ")<br />" + "Time:" + d.Time + "<br />" + d.Doping);
       })
      .on("mouseout", function(d) {
         tooltip.transition()
            .duration(1500)
            .style("opacity", 0);
      });
  
  svg.append("circle")
    .attr("cx", 550)
    .attr("cy", 350)
    .attr("class", ".dot")
    .attr("fill", "red")
    .attr("r", 5);
  
  svg.append("circle")
    .attr("cx", 550)
    .attr("cy", 330)
    .attr("class", ".dot")
    .attr("fill", "black")
    .attr("r", 5);
  
   svg.append("text")
    .attr("x", 563)
    .attr("y", 333)
    .attr("class", "label")
    .text("No Doping Allegations");
  
  
   svg.append("text")
    .attr("x", 563)
    .attr("y", 353)
    .attr("class", "label")
    .text("Doping Allegations");
  
  
  
})