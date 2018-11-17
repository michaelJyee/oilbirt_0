//FEED CONTROLLER
app.classy.controller({
  name: 'listsController',
  inject: ['$scope','$http','ModalService'],

  init: function(){
    this.$.d = {};
    this.$.data = {};
    this.getLists();
  },

  watch: {},

  methods: {
    getLists: function(){
      var that = this;
      that.$http.get('/api/lists')
      .then(function(success){
        that.$.d.lists = success.data.rows;
      });
    },

    newList: function(){
      var that = this;
      that.ModalService.showModal({
        templateUrl: "/js/mapp/templates/newListModal.html",
        controller: "newListModalController"
      })
      .then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          console.log("Lists edit page");
        });
      });
    }
  }
});