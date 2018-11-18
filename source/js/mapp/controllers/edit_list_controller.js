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

  watch: {
    '{object}d.list' : function(oldVal, newVal){
      if(oldVal != newVal && (newVal) ){
        this.updateList();
      }
    }
  },

  methods: {
    updateList: function(){
      var that = this;
      that.$http.post('/api/list/'+that.$routeParams.id, {list:that.$.d.list})
      .then(function(success){
        console.log("LIST=>", success);
      });
    },

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
      if(that.$.d.list.querymodel[that.$.d.list.querymodel.length-1].value){
        that.$.d.list.querymodel.push(newParam);
      }
    },

    remove: function(index){
      var that = this;
      that.$.d.list.querymodel.splice(index, 1);
    }
  }
});