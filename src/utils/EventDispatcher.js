/**
 * author ragnarok
 */

PMVIS.EventDispatcher = function() {
  this._listeners = {};
};

PMVIS.EventDispatcher.prototype = {
  addEventListener: function(type, listener) {
    if (this._listeners[type] === undefined) {
      this._listeners[type] = [];
    }
    if (this._listeners[type].indexOf(listener) === -1) {
      this._listeners[type].push(listener);
    }
  },

  hasEventListener: function(type, listener) {
    if (this._listeners[type] === undefined) {
      return false;
    } else if (this._listeners[type].indexOf(listener) === -1) {
      return false;
    }
    return true;
  },

  removeEventListener: function(type, listener) {
    if (this._listeners[type] === undefined) {
      return;
    }
    this._listeners[type].remove(listener);
  },

  dispatchEvent: function() {
    return function(type, event) {
      var listenerArray = this._listeners[type];
      event = event || {};
      if (listenerArray !== undefined) {
        for (var i = 0; i < listenerArray.length; i++) {
          listenerArray[i].call(this, event);
        }
      }
    }
  }(),
};

// a glboal event pool
PMVIS.eventPool = new PMVIS.EventDispatcher();
