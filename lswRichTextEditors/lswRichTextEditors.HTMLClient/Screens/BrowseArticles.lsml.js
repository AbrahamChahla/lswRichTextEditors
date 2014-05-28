/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.BrowseArticles.AddWithCkEditor_postRender = function (element, contentItem) {

	contentItem.dataBind("data.Articles.selectedItem", function (selected) {
		contentItem.isVisible = selected == undefined;
	});

};
myapp.BrowseArticles.AddWithCkEditorJQuery_postRender = function (element, contentItem) {

	contentItem.dataBind("data.Articles.selectedItem", function (selected) {
		contentItem.isVisible = selected == undefined;
	});

};
myapp.BrowseArticles.AddWithKendoUI_postRender = function (element, contentItem) {

	contentItem.dataBind("data.Articles.selectedItem", function (selected) {
		contentItem.isVisible = selected == undefined;
	});

};
myapp.BrowseArticles.AddWithTinyMCE_postRender = function (element, contentItem) {

	contentItem.dataBind("data.Articles.selectedItem", function (selected) {
		contentItem.isVisible = selected == undefined;
	});

};

