/// <reference path="~/GeneratedArtifacts/viewModel.js" />
/// <reference path="../scripts/lswrichtexteditors.js" />

myapp.kendoUI.Body_render = function (element, contentItem) {

	// =========================================================================
	// Note that the Kendo UI Editor works off of a custom control vs a textarea control
	// =========================================================================

	// Lets give the editor 80% of the screen, overall good compromise.
	element.style.maxHeight = '80%';

	// Wire up our kendo editor
	lsWire.editors.initializeKendoEditor(element, contentItem);

};


myapp.kendoUI.DeleteArticle_execute = function (screen) {

	if (screen.Article.Id !== 1) {
		screen.Article.deleteEntity();
		myapp.commitChanges();
	} else {
		msls.showMessageBox('This entity cannot be deleted...');
	}

};