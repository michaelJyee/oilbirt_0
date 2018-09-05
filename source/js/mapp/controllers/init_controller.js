//INIT CONTROLLER
app.classy.controller({
  name: 'init',
  inject: ['$scope','$http'],

  init: function(){
    this.$.d = {};
  },

  methods:{
    upload: function() {
      var that = this;
      var params = {
        title: this.$.d.title,
        url: this.$.d.url
      };

      that.$http.post('/add_item',params)
      .then(function(data){
        $("#uploadModal").modal('hide');
      }, function(err){
        console.log("err",err);
      });
    },

    cancel: function(){
      var that = this;
      this.$.d.url = null;
      this.$.d.title = null;
    }
  }
});
