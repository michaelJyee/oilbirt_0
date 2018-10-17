//FEED CONTROLLER
app.classy.controller({
  name: 'feedController',

  inject: ['$scope','$http'],

  init: function(){
    this.$.d = {
      fetching:true,
      pageNumber:1,
      pageSize:10
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
        params: {limit: that.$.d.pageSize, pageNumber:that.$.d.pageNumber}
      })
      .then(function(response) {
        that.$.d.total = response.data.count
        that.$.data.contacts = response.data.rows;
        that.buildPaginator();

        that.$.d.fetching = false;
      }, function(error){
        console.log("error", error);
        that.$.d.fetching = false;
      });
    },

    changePage: function(data){
      var that = this;
      if(data === 'next'){
        that.$.d.pageNumber++;
      }
      else if(data === 'prev' && that.$.d.pageNumber > 2){
        that.$.d.pageNumber--;
      }
      else if(data){
        that.$.d.pageNumber = data;
      }

      that.getContacts();
    },

    buildPaginator: function(){
      var that = this;
      var numberOfpages = that.$.d.total/that.$.d.pageSize;
      var ret = [];

      for(var i = 1; i <= numberOfpages; i++){
        ret.push(i);
      }
      that.$.d.paginator = ret;
    }

  }
});