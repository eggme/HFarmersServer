var multer = require('multer');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var uploadSetting = multer({dest:"../uploads"});

router.post('/', uploadSetting.single('upload'), function(req, res){
	var tmpPath = req.file.path;
	var fileName = req.file.filename+".jpg";
	var newPath = "../public/images/"+fileName;

	console.log(tmpPath + " : " + fileName + " : " + newPath);

	fs.rename(tmpPath, newPath, function(err){
		if(err){
			console.log(err);
		}

		var html;

		html = "";
		html += "<script type = 'text/javascript'>";
		html += "var funcNum = " + req.query.CKEditorFuncNum + ";";
		html += "var url = \"/images/"+ fileName +"\";";
		html += "var message = \"업로드 완료\";";
		html += "window.parent.CKEDITOR.tools.callFunction(funcNum, url);";
		html += "</script>";

		res.send(html);
	});

});

module.exports = router;