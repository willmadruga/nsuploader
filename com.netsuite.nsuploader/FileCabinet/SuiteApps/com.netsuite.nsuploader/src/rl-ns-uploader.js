/**
 *
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */
define(['N/encode', 'N/file'], function(nEncode, nFile) {

/**
 * Currently supporting update of existing files only.
 * 
 * TODO: Enhancement: support creating a new file under given path.
 */
  
  function doPost(req) {

    if( !req.file || !req.content) {
      log.debug('Error', 'Incomplete request: ' + req);
      return "Incomplete request: " + req;
    }

    var contents = nEncode.convert({
      string: req.content,
      inputEncoding: nEncode.Encoding.BASE_64,
      outputEncoding: nEncode.Encoding.UTF_8
    });

    var f = req.file;
    var filePath = f.substr(f.indexOf('SuiteApps'), f.length);

    if(filePath) {
      var file = nFile.load({
        id: filePath
      });

      if (file) {
        var newFile = nFile.create({
          name: file.name,
          fileType: file.fileType,
          contents: contents,
          folder: file.folder
        });
        newFile.save();
        return "File " + filePath +  " uploaded successfully";
      }
    }
    return "File " + filePath + "not found.";
  }

  return {
    post: doPost
  };

});
