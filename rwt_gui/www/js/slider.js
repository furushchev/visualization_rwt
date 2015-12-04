(function(global, namespace){
  var ns = rwt_gui.util.addNamespace(namespace);

  var Slider = function(args){
    rwt_gui.core.Component.call(this, args, ["onchange"]);
    this.min_value = args.min_value;
    this.max_value = args.max_value;
    this.step = args.step || 1;
    this._publisher = new ROSLIB.Topic({
      ros: global.ros,
      name: this.topic_name,
      messageType: 'std_msgs/Float32'
    });
    this.onchange.addListener(function(o){
      var msg = new ROSLIB.Message({
        data: parseFloat(o.val())
      });
      this._publisher.publish(msg);
    });
  };

  Slider.prototype.html = function(){
    var obj = $('<input>');
    obj.attr({
      id: this.name,
      type: "range",
      min: this.min_value,
      max: this.max_value,
      step: this.step
    });
    obj.on('change', this.onchange.callback);
    return obj;
  };

  ns.Slider = Slider;

}(this, "rwt_gui.slider"));
