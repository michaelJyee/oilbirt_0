//FEED CONTROLLER
app.classy.controller({
  name: 'editListsController',
  inject: ['$scope','$http','ModalService','$routeParams'],

  init: function(){
    var that = this;
    this.$.d = {};
    this.$.data = {};
    this.getList();
  },

  watch: {},

  methods: {
    getList: function(){
      var that = this;
      that.$http.get('/api/list/'+that.$routeParams.id)
      .then(function(success){
        that.$.d.list = success.data;
      });
    },

    newQuery: function(){
       console.log("new query parameter");
    }
  }
});