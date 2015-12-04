$(function(){

  rwt_gui.Init();

  var slider = new rwt_gui.slider.Slider({
    name: "sample-slider",
    topic: "sample_slider",
    min_value: 0,
    max_value: 100
  });

  $('#rwt-slider').after(slider.html());

  var str = new rwt_gui.string.String({
    name: "sample-string",
    topic: "sample_label",
    default_value: "sample"
  });

  $('#sample-slider').after(str.html());

});
