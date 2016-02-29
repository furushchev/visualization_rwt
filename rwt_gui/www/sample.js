$(function(){

  rwt_gui.Init();

  var slider = new rwt_gui.slider.Slider({
    name: "sample-slider",
    topic: "sample_slider",
    min_value: 0,
    max_value: 255
  });

  slider.onchange.addListener(function(e){
    if(parseInt(e.val()) === 255) {
      alert("max!");
    }
  });

  $('#rwt-slider').append(slider.html());

  var str = new rwt_gui.string.String({
    name: "sample-string",
    topic: "sample_label",
    default_value: "sample"
  });

  $('#rwt-string').append(str.html());

  var cimg = new rwt_gui.image.CompressedImageView({
    name: "sample-img",
    topic: "sample_img_compressed"
  });

  $('#rwt-img').append(cimg.html());

});
