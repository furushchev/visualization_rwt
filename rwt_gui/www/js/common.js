(function(global){

  function addNamespace(nsstr){
    var ns = nsstr.split('.');
    var here = global;
    for (var i = 0, l = ns.length; i < l; i++){
      if (typeof(here[ns[i]]) == 'undefined') here[ns[i]] = {};
       here = here[ns[i]];
    }
    return here;
  }

  { // rwt_gui.util namespace
    var util_ns = addNamespace("rwt_gui.util");

    util_ns.addNamespace = addNamespace;
  } //end of rwt_gui.util namespace

  { // rwt_gui.core namespace
    var core_ns = util_ns.addNamespace("rwt_gui.core");

    core_ns.CallbackObject = function(obj, hook_name){
      return {
        addListener: function(cb){
          obj[hook_name].registeredCallbacks.push(cb);
        },
        callback: function(){
          var cbs = obj[hook_name].registeredCallbacks;
          for (var i = 0, l = cbs.length; i < l; i++){
            cbs[i].call(obj, $(this));
          }
        },
        registeredCallbacks: []
      };
    };

    core_ns.Component = function(callbacks){
      if (typeof callbacks === 'undefined') return;
      for (var i = 0, l = callbacks.length; i < l; i++){
        var cstr = callbacks[i];
        this[cstr] = core_ns.CallbackObject(this, cstr);
      }
    };

    core_ns.Inherits = function(childClass, parentClass){
      Object.setPrototypeOf(childClass.prototype, parentClass.prototype);
    };
  } // end of rwt_gui.core namespace

  { // rwt_gui namespace
    var root_ns = util_ns.addNamespace("rwt_gui");

    // rwt_ros.Init function
    root_ns.Init = function(hostname, port){
      var here = global;

      if (typeof hostname === 'undefined') hostname = 'localhost';
      if (typeof port === 'undefined') port = 8888;

      var ws_host = "ws://" + hostname + ':' + port.toString();

      global.ros = new ROSLIB.Ros({ url: ws_host });

      global.ros.on('connection', function(){
        console.info('Connected to ROS websocket server', ws_host);
      });

      global.ros.on('error', function(err){
        console.error('[rwt_gui]', err);
      });

      global.ros.on('close', function(){
        console.info('Connection to ROS websocket server closed.');
      });

    };
  } // end of rwt_gui namespace

}(this));
