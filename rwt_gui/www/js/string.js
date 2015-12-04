(function(global, namespace){
  var ns = rwt_gui.util.addNamespace(namespace);

  var String = function(args){
    rwt_gui.core.Component.call(this);
    console.log(args.name);
    this.name = args.name;
    this.topic_name = args.topic;
    this.value = args.default_value || "";
    this._listener = new ROSLIB.Topic({
      ros: global.ros,
      name: this.topic_name,
      messageType: 'std_msgs/String'
    });
    var that = this;
    this._listener.subscribe(function(msg){
      that.value = msg.data;
      $('#' + that.name).text(that.value);
    });
  };

  String.prototype.html = function(){
    var obj = $('<p></p>');
    obj.attr({ id: this.name });
    obj.text(this.value);
    return obj;
  };

  ns.String = String;

}(this, "rwt_gui.string"));
