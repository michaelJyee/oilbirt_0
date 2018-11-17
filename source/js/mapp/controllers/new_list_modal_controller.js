//INIT CONTROLLER
app.classy.controller({
  name: 'newListModalController',
  inject: ['$scope','$http', '$element', 'close'],

  init: function(){
    var that = this;
    var list = {};
    that.$.d = {};
  },

  methods:{
    save: function() {
      var that = this;
      that.$http.post('/api/list', {name: that.$.d.listName})
      .then(function(response){
        var elem = document.getElementsByClassName('modal-backdrop')[0];
        elem.remove("show");

        that.close({list:response.data});
      });
    },
    cancel: function(){
      var that = this;
    }
  }
});
