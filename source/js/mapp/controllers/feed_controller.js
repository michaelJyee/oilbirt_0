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
    this.$.data = {
      items:[]
    };

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
      .then(function(contacts) {
        console.log("contacts=>",contacts);
        // that.$.d.pageNumber = (that.$.data.items.length/that.$.d.pageSize)+1;
        that.$.d.fetching = false;
      }, function(error){
        console.log("error", error);
        that.$.d.fetching = false;
      });
    },

    prin: function(){
      console.log("\n\n\n\n\nDETRIOT WHAT\n\n\n\n");
    },

    sendReaction: function(id,reaction,index){
      var that = this;
      that.$http({
        method: 'POST',
        url: '/item/reaction',
        data: {
          _id:id,
          reaction:reaction
        }
      })
      .then(function(data){
        var currentReaction;
        if(that.$.data.items[index].reactions[0]){
          currentReaction = that.$.data.items[index].reactions[0].reaction;
          delete that.$.data.items[index].reactions[0].reaction;
          that.$.data.items[index][currentReaction]--;
        }
        else{
          that.$.data.items[index].reactions[0] = {reaction:reaction}
          console.log(that.$.data.items[index]);
        }

        if(currentReaction !== reaction){
          that.$.data.items[index].reactions[0].reaction = reaction;
          that.$.data.items[index][reaction]++;
        }
      },
      function(err){
        console.log(err);
      });
    }
  }
});