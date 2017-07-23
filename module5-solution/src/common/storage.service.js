(function() {
  angular.module('common')
  .service('StorageService',StorageService);

  function StorageService(){
    var service = this;

    service.saveInfo = function(info){
      window.localStorage.setItem('info', JSON.stringify(info));
    };

    service.getInfo = function(){
      var s = window.localStorage.getItem('info');
      if(s) return JSON.parse(s);
      else return false;
    };

    service.resetInfo = function(){
      window.localStorage.removeItem('info');
    };


  }

}());
