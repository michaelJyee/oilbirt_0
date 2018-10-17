//INIT CONTROLLER
app.classy.controller({
  name: 'uploadContactListModelController',
  inject: ['$scope','$http'],

  init: function(){
    this.$.d = {};
    this.$.data = {};
  },

  methods:{
    upload: function(){
      $('#upload-file').click();
    },

    parseFile: function(file){
      var that = this;

      that.$.$apply(function(){
        that.$.d.title = file.name;
        that.$.d.file = file;
      });
      // that._getColumnsForFile(file);

      that.$.fd = new FormData();
      that.$.fd.append("file", file);
    },

    _getColumnsForFile: function(file){
      var that = this;
      var reader = new FileReader();
      var data;

      reader.onload = function(event){
        text = event.target.result;
        //Need to use scope.apply because the FileReader is not an angular component...
        that.$.$apply(function(){
          var idx = -1; //index of line break character, test for either \n or \r
          if(text.indexOf("\n") > -1) idx = text.indexOf("\n");
          else if(text.indexOf("\r") > -1) idx = text.indexOf("\r");

          if(idx > -1){
            that.$.data.columns = (text.substring(0,idx).split(","));
          }
          else{
            console.log("Couldn't parse column names from CSV");
            this.validFile = false;
          }
        });
      };


      // reader.readAsText(file.slice(0, 20000));
    },

    save: function() {
      var that = this;
      var params = {
        title: this.$.d.title,
        file: this.$.d.file
      };


      this.$http.post("/contacts/upload_csv", that.$.fd, {
        headers:{
          "Content-Type": undefined //let the request figure out the boundaries and content type
        },
        params: params,
        tracker: "loading"
      })
      .then((data)=>{
        console.log(data);
      })

    },

    cancel: function(){
      var that = this;
      this.$.d.url = null;
      this.$.d.title = null;
    }
  }
});
