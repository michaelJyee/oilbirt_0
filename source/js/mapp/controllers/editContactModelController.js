//INIT CONTROLLER
app.classy.controller({
  name: 'editContactModalController',
  inject: ['$scope','$http', '$element', 'contact', 'close'],

  init: function(){
    var contact = this.contact;
    this.$.contact = {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      stage: contact.stage
    }
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
        data: {contact: that.$.contact}
      })
      .then(function(response) {
        that.$element.modal('hide')[0].removeClass('show');
        that.close();
      }, function(error){
        that.$.d.fetching = false;
      });
    },

    cancel: function(){
      var that = this;
    }
  }
});
