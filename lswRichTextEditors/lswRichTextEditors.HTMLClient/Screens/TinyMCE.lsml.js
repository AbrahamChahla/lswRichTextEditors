/// <reference path="~/GeneratedArtifacts/viewModel.js" />
/// <reference path="../scripts/lswrichtexteditors.js" />

myapp.TinyMCE.Body_postRender = function (element, contentItem) {

	// =========================================================================
	// Note that the TinyMCE editor works off of a textarea control vs a custom control
	// =========================================================================

	// Lets give the editor 80% of the screen, overall good compromise.
	element.style.maxHeight = '80%';

	// Time to wire up the TinyMCE !
	lsWire.editors.initializeTinyMCE(element, contentItem);

};
myapp.TinyMCE.DeleteArticle_execute = function (screen) {

	if (screen.Article.Id !== 1) {
		screen.Article.deleteEntity();
		myapp.commitChanges();
	} else {
		msls.showMessageBox('This entity cannot be deleted...');
	}

};