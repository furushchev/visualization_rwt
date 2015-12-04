(function(global, namespace){
  var ns = rwt_gui.util.addNamespace(namespace);

  var CompressedImageView = function(args){
    rwt_gui.core.Component.call(this, args);
    this._listener = new ROSLIB.Topic({
      ros: global.ros,
      name: this.topic_name,
      messageType: 'sensor_msgs/CompressedImage'
    });
    var that = this;
    this._listener.subscribe(function(msg){
      var img = new Image();
      img.onload = function(){
        var canvas = $('#' + that.name)[0];
        console.log(canvas);
        canvas.getContext('2d').drawImage(img, 0, 0);
      };
      img.src = "data:image/jpeg;base64," + msg.data;
    });
  };

  CompressedImageView.prototype.html = function(){
    var obj = $('<canvas></canvas>');
    obj.attr('id', this.name);
    return obj;
  };

  ns.CompressedImageView = CompressedImageView;

}(this, "rwt_gui.image"));
