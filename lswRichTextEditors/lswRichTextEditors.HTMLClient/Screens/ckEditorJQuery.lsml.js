/// <reference path="~/GeneratedArtifacts/viewModel.js" />
/// <reference path="../scripts/lswrichtexteditors.js" />

myapp.ckEditorJQuery.Body_postRender = function (element, contentItem) {

	// Lets give the editor 80% of the screen, overall good compromise.
	element.style.maxHeight = '80%';

	lsWire.editors.initializeCkEditorJQuery(element, contentItem);

};
myapp.ckEditorJQuery.beforeApplyChanges = function (screen) {

	// Hack - If use goes from editor to LightSwitch screen save button
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