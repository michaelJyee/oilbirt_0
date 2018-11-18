//FEED CONTROLLER
app.classy.controller({
  name: 'editListsController',
  inject: ['$scope','$http','ModalService','$routeParams'],

  init: function(){
    var that = this;
    this.$.d = {
      fields: ['name','email','stage']
    };

    this.getList();
  },

  watch: {},

  methods: {
    getList: function(){
      var that = this;
      that.$http.get('/api/list/'+that.$routeParams.id)
      .then(function(success){
        that.$.d.list = success.data;
        that.$.d.list.querymodel = JSON.parse(that.$.d.list.querymodel);
      });
    },

    newQuery: function(){
      var that = this;
      var newParam = {};
      that.$.d.list.querymodel.push(newParam);
    },

    remove: function(index){
      var that = this;
      that.$.d.list.querymodel.splice(index, 1);
    }
  }
});