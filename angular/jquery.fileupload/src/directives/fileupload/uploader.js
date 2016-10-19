define(["app","jquery.fileupload"], function(app) {
/*文件上传
 *@attr pkt-uploader       [必选] : 页面有多个上传控件时指定其id, id= "pkt-uploader";
 *@attr pkt-uploader-file  [可选] : 上传文件的key, input[type="file"][name=?],默认值：uploadFile
 *@attr pkt-uploader-action [可选]: 文件上传接口地址,默认为 ../api/admin/upload/image
 *@attr pkt-uploader-multi [可选] : 默认单选文件, 要多选增加属性pkt-uploader-multi = 1 //[任何Boolean(Number(?))值为true的值]
 *@attr pkt-uploader-type  [可选] : img, file 默认为img, 界面不一样。
 *@attr pkt-uploader-data [可选] : 除了文件，需要提交的额外的表单参数对象表达式
 *@attr pkt-uploader-callback [必选] : 每个文件上传完成后的回调函数表达式,回调函数接受一个参数，值为上传接口返回的数据
 *使用: 获取成功上传的数据项uri列表(Array): var images = angular.element('#'+ id).scope().images,id见第一行
 * 示例:
 * HTML
 * <div pkt-uploader="orderDataUploader"
 *    pkt-uploader-file="file"
 *    pkt-uploader-action="../api/admin/dataimport/tmall"
 *    pkt-uploader-multi=1
 *    pkt-uploader-type='file'
 *    pkt-uploader-callback="orderImporter.uploadSuccess"
 *    pkt-uploader-data="orderImporter.uploadData()" >
 * </div>
 *
 * js:
 * orderImporter.uploadData = function()
 * {
 *    return {
 *       extraProp: value
 *    }
 * }
 *
 *
 *
 *  uploadSuccess = function(data) {
 *     try {
 *           if (data.code == 0) {
 *               bootbox.alert('上传成功！');
 *           } else {
 *               bootbox.alert('文件上传失败');
 *           }
 *     } catch(e) {
 *       bootbox.alert('文件上传时出错');
 *     }
 *   }
 *
 */
	app.directive("pktUploader", function($http) {
	    return {
	        restrict: 'A',
	        templateUrl:'directives/fileupload/uploader.html',
	        replace: true,
	        controller: function($scope, $element) {
	            $scope.images = [];
	        },
	        link: function($scope,$element, $attribute) {
	        	$scope.getAttribute = function(attr) {
	        		try {
	        			return $element.attr(attr);
	        		} catch (e) {
	        			return null;
	        		}
	        	} 	        	
	            var multiSelect = Boolean(Number($scope.getAttribute("pkt-uploader-multi"))) ? 'multiple="multiple"': '';
	            if (multiSelect) {
	                $element.find('input[type="file"]').attr('multiple','multiple');
	            }
	            var type =  $scope.getAttribute('pkt-uploader-type');
	            if (type == 'file') {
	            	$element.find('.img-disp').remove();
	            	$scope.ckLabel = "上传文件";
	            } else {
	            	$scope.ckLabel = "上传图片";
	            }
	        	$scope.ckId = $scope.getAttribute("pkt-uploader") || 'pkt-uploader';
	        	$element.find('label.col-sm-3').attr('for', 'pkt-uploader'+ $scope.ckId);
	        	$element.find('input[type="file"]').attr('id', 'pkt-uploader'+ $scope.ckId);
	        	console.log($scope.getAttribute('pkt-uploader-data'));
	        	var formData = eval('window.' + $scope.getAttribute('pkt-uploader-data'));
	        	var action = $scope.getAttribute('pkt-uploader-action') || '../api/admin/upload/image';
	        	var inputName = $scope.getAttribute('pkt-uploader-file') || 'uploadFile';
	        	$element.find('input[type="file"]').attr('name', inputName);
	            $('#pkt-uploader'+ $scope.ckId).fileupload({
	                url: action
	                ,sequentialUploads: true
	                ,progressInterval:5
	                ,limitMultiFileUploads:1
	                ,formData: formData
	                ,done: function(e, data) {
	                    var result = data.result.url;// 返回数据格式{url:'xxxxx'}
	                    $scope.$apply($scope.images.push(result));   
	                    var callback = $scope.getAttribute('pkt-uploader-callback');
	                    eval('window.' + callback + '(data.result)');                            
	                }
	                ,fileuploadstart:function(e) {
	                }
	                ,progressall: function (e, data) {
	                    var progress = parseInt(data.loaded / data.total * 100, 10);
	                    $('#progress .progress-bar').css(
	                        'width',
	                        progress + '%'
	                    ).html(progress+'%完成 ');
	                    if (progress == 100) {
	                        setTimeout(function() {
	                            $('#progress .progress-bar').css('width','0%').html('');

	                        }, 1000);
	                    }
	                }
	            });  
	            $(document).on('click','.pkt-uploader-del', function() {
	                var src = $(this).prev('img').attr('ng-src');
	                var idx = 0;
	                $($scope.images).each(function() {
	                    if (this == src) {
	                        $scope.$apply($scope.images.splice(idx, 1));
	                    }
	                    idx ++
	                });
	            });	            	            
	        }
	    }
	});
});