(function() {
  angular.module('public')
  .controller('InfoController',InfoController);

  InfoController.$inject = ['StorageService','info','item'];
  function InfoController(StorageService,info,item){
    var infoCtrl = this;
    infoCtrl.info = info;
    infoCtrl.item = item;
    infoCtrl.signout=function(){
      StorageService.resetInfo();
      infoCtrl.info = false;
    }
  }
}());
