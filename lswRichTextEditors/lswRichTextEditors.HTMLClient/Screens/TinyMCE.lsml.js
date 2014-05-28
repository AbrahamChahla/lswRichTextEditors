/// <reference path="~/GeneratedArtifacts/viewModel.js" />
/// <reference path="../scripts/lswrichtexteditors.js" />

myapp.TinyMCE.Body_postRender = function (element, contentItem) {

	// Lets give the editor 80% of the screen, overall good compromise.
	element.style.maxHeight = '80%';

	// Time to wire up the TinyMCE !
	lsWire.editors.initializeTinyMCE(element, contentItem);

};