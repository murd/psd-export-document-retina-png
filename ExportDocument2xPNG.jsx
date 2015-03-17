// Murdoch Carpenter
// http://murdochcarpenter.com/blog/
// Tested in Photoshop CC (2014)
// V1.0

var doc = app.activeDocument;
var docName = doc.name.replace(/\.[^\.]+$/, '');
var docPath = doc.path;
var scale = "200%";
var folderName = "retina";
var extensionName = "_2x.png";

// where the action happens
function exportScaledPNG() {
    // resize the document
    doc.resizeImage(scale, scale, doc.resolution, ResampleMethod.BICUBIC);
    // check if a folder has already been created or not - create if not
    var retinaFolder = Folder(docPath + "/" + folderName);
    if(!retinaFolder.exists) retinaFolder.create();
    // check if the PNG already exists or not - delete if so
    pngFile = File(docPath + "/" + folderName + "/" + docName + extensionName); 
    if(pngFile.exists) pngFile.remove();
    // save the PNG
    pngSaveOptions = new PNGSaveOptions();
    pngSaveOptions.compression = 9;
    doc.saveAs(pngFile, pngSaveOptions, true, Extension.LOWERCASE)
    // undo the history and purge
    doc.activeHistoryState = doc.historyStates[doc.historyStates.length-2];  
    app.purge(PurgeTarget.HISTORYCACHES);
    // save the document (to avoid having to do it manually)
    doc.save();
}

// wrap in a try/catch for errors
try {
	exportScaledPNG();
} catch (e) {
    if (DialogModes.NO != app.playbackDisplayDialogs) {
        alert(e + " : " + e.line);
    }
}
