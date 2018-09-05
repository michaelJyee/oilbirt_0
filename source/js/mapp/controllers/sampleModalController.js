//FEED CONTROLLER
app.classy.controller({
  name: 'SampleModalController',

  inject: ['$scope','$http','ModalService'],

  init: function(){
    console.log("\n\n\nMODAL\n\n\n");
  },

  methods: {
    dismissModal: function(result) {
      close(result, 200); // close, but give 200ms for bootstrap to animate
     }
  }

})