app.classy.controller({
  name:"userController",
  inject:["$scope","$http",'ModalService'],
  init: function(){
    this.$.currentUser = userConfig;
    console.log("CurrentUSER",this.$.currentUser);
  },

  methods:{
    uploadModal: function() {
      var that = this;
      that.ModalService.showModal({
        templateUrl: "/js/mapp/templates/uploadModal.html",
        controller: "uploadContactListModelController"
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          var elem = document.getElementsByClassName('modal-backdrop')[0];
          elem.remove("show");
          console.log(result);
        });
      });
    },


    logoutModal: function(){
      var that = this;
      that.ModalService.showModal({
        templateUrl: "/js/mapp/templates/logoutModal.html",
        controller: "logoutModalController"
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          console.log(result);
        });
      });
    }
  }
});