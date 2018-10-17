//FEED CONTROLLER
app.classy.controller({
  name: 'feedController',

  inject: ['$scope','$http'],

  init: function(){
    this.$.d = {
      fetching:true,
      pageNumber:1,
      pageSize:5
    };
    this.$.data = {};

    this.getContacts(true);
  },

  methods: {
    getContacts: function(init){
      var that = this;
      this.$.d.fetching = true;
      this.$http({
        url: "/contacts/list/", 
        method: "GET",
        params: {pageSize: that.$.d.pageSize, pageNumber:that.$.d.pageNumber}
      })
      .then(function(response) {
        that.$.data.contacts = response.data;
        that.$.d.fetching = false;
      }, function(error){
        console.log("error", error);
        that.$.d.fetching = false;
      });
    }
  }
});