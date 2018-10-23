//INIT CONTROLLER
app.classy.controller({
  name: 'editContactModalController',
  inject: ['$scope','$http', 'contact'],

  init: function(){
    this.$.d = {
      contact: this.contact
    };
    this.$.data = {};
    console.log("find it!",this.contact);
  },

  methods:{
    save: function() {
      var that = this;

      that.$http({
        url: "/contact/edit",
        headers:{
          'Content-Type':'application/json'
        },
        method: "post",
        data: {contact: this.$.d.contact}
      })
      .then(function(response) {
        console.log("updated");
      }, function(error){
        that.$.d.fetching = false;
      });
    },

    cancel: function(){
      var that = this;
    }
  }
});
