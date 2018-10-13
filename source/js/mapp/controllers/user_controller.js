app.classy.controller({
  name:"userController",
  inject:["$scope","$http",'ModalService'],
  init: function(){
    this.$.currentUser = userConfig;
    console.log("CurrentUSER",this.$.currentUser);
    // this.showAModal();
  },

  methods:{
    showAModal: function() {
      var that = this;
      // Just provide a template url, a controller and call 'showModal'.
      that.ModalService.showModal({
        templateUrl: "/js/mapp/templates/modal.html",
        controller: "SampleModalController"
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        modal.element.modal();
        modal.close.then(function(result) {
          $scope.message = result ? "You said Yes" : "You said No";
        });
      });
    },

    uploadModal: function() {
      var that = this;
      // Just provide a template url, a controller and call 'showModal'.
      that.ModalService.showModal({
        templateUrl: "/js/mapp/templates/uploadModal.html",
        controller: "uploadContactListModelController"
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        modal.element.modal();
        modal.close.then(function(result) {
          $scope.message = result ? "You said Yes" : "You said No";
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
})