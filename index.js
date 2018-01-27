/**
  * This library requires jQuery
  * 
  * In order for the elements in DOM to update, you need to pass data together with a stringified object. See below:
	*
	* Example:
	* http://example.com?data=[{"target":".col.mail%20a","value":"newemail@gmail.com","attr":["mailto","text"]},{"target":".col.logo%20img","value":"https://user-images.githubusercontent.com/19409/31321658-f6aed0f2-ac3d-11e7-8100-1587e676e0ec.png","attr":["src"]}]
	*
	* [
  *   {
  *     target: ".col.mail a",
  *     value: "newemail@gmail.com",
  *     attr: ["mailto", "text"]
  *   },
  *   {
  *     target: ".col.logo img",
  *     value: "http://localhost:3000/assets/images/logo-light-text.png",
  *     attr: "src"
  *   },
  * ];
	*
**/
$("document").ready(function() {

	data = JSON.parse(decodeURIComponent(location.search.substr(6)))

	if (typeof data !== "object") {
		console.log("Unable to process passed data");
	}

	// Process update elements here
	$.each(data, function(i, d) {
		
		console.log(d)
    
    if (typeof d.attr === "string") {
			d.attr = [d.attr]
    }
    
    $.each(d.attr, function(ii, attr) {
      console.log(attr)
      
      if (attr === "mailto") {
        $(d.target).attr("href", `mailto:${d.value}`) 
      } else if (attr === "text") {
        $(d.target).text(d.value)
      } else {
				$(d.target).attr(attr, d.value)
      }		
    
    })

	})

})