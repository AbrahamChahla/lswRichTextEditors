/// <reference path="~/GeneratedArtifacts/viewModel.js" />
/// <reference path="../scripts/lswrichtexteditors.js" />

myapp.ckEditorJQuery.Body_postRender = function (element, contentItem) {

	// =========================================================================
	// Note that the CkEditor works off of a textarea control vs a custom control
	// =========================================================================

	// Lets give the editor 80% of the screen, overall good compromise.
	element.style.maxHeight = '80%';

	// Wire up our ckEditor 
	lsWire.editors.initializeCkEditorJQuery(element, contentItem);

};
myapp.ckEditorJQuery.beforeApplyChanges = function (screen) {

	// Hack - If user goes from editor to the Save button on the LightSwitch screen,
	// the LightSwitch save fires before the blur event of the editor
	// which doesnt update the contentItem value fast enough.  So
	// we are forced to add an additional step outside of the blur
	var body = screen.findContentItem("Body");
	var editor = body.lsWire.editor;

	if (editor != undefined) {
		if (editor.checkDirty()) {
			body.value = editor.getData();
		};
	};


};
myapp.ckEditorJQuery.DeleteArticle_execute = function (screen) {

	if (screen.Article.Id !== 1) {
		screen.Article.deleteEntity();
		myapp.commitChanges();
	} else {
		msls.showMessageBox('This entity cannot be deleted...');
	}

};