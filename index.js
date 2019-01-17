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
  let data = {};
  try {
    const url = new URL(window.location.href);
    data = JSON.parse(url.searchParams.get("data"));
  } catch (err) {
    console.log("Unable to parse URL via modern URL method!", err);

    // Retry with native method
    try {
      data = JSON.parse(
        decodeURIComponent(location.search.substr(6)).split("&")[0] // ignores any other GET var after
      );
    } catch (e) {
      console.log("Unable to parse URL data via old method!", e);
    }
  }

  function transformStr(string, replacementArray) {
    return string.replace(/({\d})/g, function(j) {
      return replacementArray[j.replace(/{/, "").replace(/}/, "")];
    });
  }

  // Process update elements here
  $.each(data, function(i, d) {
    currentVal =
      typeof d.value_pattern !== "undefined"
        ? transformStr(d.value_pattern, [d.value])
        : d.value;
    console.log({ attr: d.attr, target: d.target, currentVal: currentVal });

    if (d.attr === "mailto") {
      $(d.target).attr("href", `mailto:${currentVal}`);
    } else if (d.attr === "text") {
      $(d.target).text(currentVal);
    } else {
      $(d.target).attr(d.attr, currentVal);
    }
  });
});
