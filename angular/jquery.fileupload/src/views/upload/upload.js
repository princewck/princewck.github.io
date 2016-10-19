var fileUpload = {
    init: function() {
        console.log('init controller');
    },
    $scope:null,
    uploadOptions: {
        uploadData: function() {
            return {
                name:'name',
                param:'123',
                timestamp: new Date().getTime()
            }
        },
        onUploaded: {
            success: function() {
                console.log('success');
            },
            error: function() {
                console.log(error);
            }
        }
    },

}