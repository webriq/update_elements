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
  *   {
  *     target: ".video-foreground iframe",
  *     value: 250072147,
  *     value_pattern: "https://player.vimeo.com/video/{0}?background=1"
  *     attr: "src"
  *  },
  *  {
  *     target: ".col.btnplay a",
  *     value: 250072147,
  *     value_pattern: "//vimeo.com/{0}"
  *     attr: "href"
  *  }
  * ];
  *
**/
$("document").ready(function() {

  data = JSON.parse(decodeURIComponent(location.search.substr(6)))

  if (typeof data !== "object") {
    console.log("Unable to process passed data");
  }

  function transformStr(string, replacementArray) {
    return string.replace(/({\d})/g, function(j) { 
        return replacementArray[j.replace(/{/, '').replace(/}/, '')];
    });
  }

  // Process update elements here
  $.each(data, function(i, d) {
    
    currentVal = typeof d.value_pattern !== 'undefined' ? transformStr(d.value_pattern, [d.value]) : d.value;
    console.log({ 'attr': d.attr, 'target': d.target, currentVal: currentVal })
  
    if (d.attr === "mailto") {
      $(d.target).attr("href", `mailto:${currentVal}`) 
    } else if (d.attr === "text") {
      $(d.target).text(currentVal)
    } else {
      $(d.target).attr(d.attr, currentVal)
    }

  })

})