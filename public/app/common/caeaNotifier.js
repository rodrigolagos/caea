angular.module('app').value('caeaToastr', toastr);

angular.module('app').factory('caeaNotifier', function(caeaToastr) {
    return {
        success: function (msg, title) {
            caeaToastr.success(msg, title, {"timeOut": "1200", "progressBar": true, "hideDuration": "0", "positionClass": "toast-bottom-right"});
            console.log(msg);
        },
        error: function (msg, title) {
            caeaToastr.error(msg, title, {"timeOut": "1200", "progressBar": true, "hideDuration": "0", "positionClass": "toast-bottom-right",});
            console.log(msg);
        }
    }
})