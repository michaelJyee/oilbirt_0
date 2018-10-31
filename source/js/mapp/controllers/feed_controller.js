//FEED CONTROLLER
app.classy.controller({
  name: 'feedController',

  inject: ['$scope','$http','ModalService'],

  init: function(){
    this.$.d = {
      fetching:true,
      pageNumber:1,
      pageSize:10
    };

    this.$.data = {};
    this.getContacts(true);
  },

  watch: {
    'd.pageNumber': function(old,newVal){
      console.log($("li.paginate_button.page-item.ng-scope"));
      console.log("old=>",old);
      console.log("newVal=>",newVal);
    }
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
        that.$.d.total = response.data.count;
        that.$.data.contacts = response.data.rows;
        that.buildPaginator();

        that.$.d.fetching = false;
      }, function(error){
        console.log("error", error);
        that.$.d.fetching = false;
      });
    },

    destroy: function(data, idx){
      var that = this;
      this.$http.post('/contact/destroy',{data:data})
      .then(function(data){
        that.$.data.contacts.splice(idx,1);
      });
    },

    changePage: function(data,evt){
      var that = this;

      if(data === 'next' && that.$.d.pageNumber < that.$.d.paginator.length){
        that.$.d.pageNumber++;
      }
      else if(data === 'prev' && that.$.d.pageNumber > 2){
        that.$.d.pageNumber--;
      }
      else if(data && evt){
        $("li.paginate_button").removeClass("active");
        evt.target.parentNode.className += " active";
        that.$.d.pageNumber = data;
      }

      that.getContacts();
    },


    editContactModal: function(contact) {
      var that = this;
      // Just provide a template url, a controller and call 'showModal'.
      that.ModalService.showModal({
        templateUrl: "/js/mapp/templates/editContactModal.html",
        controller: "editContactModalController",
        inputs:{
          contact: contact
        }
      }).then(function(modal) {
        // The modal object has the element built, if this is a bootstrap modal
        // you can call 'modal' to show it, if it's a custom modal just show or hide
        // it as you need to.
        modal.element.modal();
        modal.close.then(function(result) {
          contact.name = result.contact.name;
          contact.email = result.contact.email;
          contact.stage = result.contact.stage;
        });
      });
    },

    buildPaginator: function(){
      var that = this;
      var numberOfpages = that.$.d.total/that.$.d.pageSize;
      var ret = [];

      for(var i = 1; i <= numberOfpages+1; i++){
        ret.push(i);
      }

      that.$.d.paginator = ret;
    }

  }
});