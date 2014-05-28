/// <reference path="../ckeditor/ckeditor.js" />
/// <reference path="kendo.all.min.js" />
/// <reference path="tinymce/tinymce.min.js" />

// Does our namespace exist
window.lsWire = window.lsWire || {};
myapp.lsWire = myapp.lsWire || {};

(function () {

	window.lsWire.editors = {

		// ============================================================================================
		// Initialize the ckEditor, without the jQuery plugin, JavaScript only
		// This works on a textArea control
		// ============================================================================================
		initializeCkEditor: function (element, contentItem, customToolbar, readOnly) {

			/// <summary>Initialize a text area control as a Rich Text Editor using CkEditor</summary>
			/// <param name="element" type="object">DOM Element of the control</param>
			/// <param name="contentItem" type="object">contentItem of the control</param>
			/// <param name="customToolbar" type="object">Optional - Array of strings on which tools to include on the toolbar</param>
			/// <param name="readOnly" type="boolean">Optional - Turn the editor into a read only view</param>

			// Obvious, creating our toolbar
			var baseToolbar = [
				'Maximize', 'ShowBlocks', 'Print', 'Preview', '-',
				'Cut', 'Copy', 'Paste', 'PasteFromWord', 'RemoveFormat', '-',
				'Undo', 'Redo', '-',
				'Scayt', '-',
				'Table', 'HorizontalRule', 'SpecialChar', 'Blockquote', 'PageBreak', 'InsertPre', 'Font', 'FontSize', '-',
				'NumberedList', 'BulletedList', '-',
				'Outdent', 'Indent', '-',
				'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Bold', 'Italic', 'Underline', 'Strike', '-', 'Source'
			];

			var toolbar = customToolbar != undefined ? customToolbar : baseToolbar;

			// Wait for the our parent to get its dimensions
			lsWire.editors.onceElementAttrChange(element, "height", function () {

				var id = element.getElementsByTagName('textarea')[0].id;
				var txtArea = element.getElementsByTagName('textarea')[0];

				// Parent has been setup, so initialize the editor
				CKEDITOR.replace(id, {
					toolbar: [toolbar],
					readOnly: readOnly != undefined ? readOnly : false,
					allowedContent: true,
					height: txtArea.parentElement.offsetHeight,
					on: {
						blur: function (e) {
							if (e.editor.checkDirty()) {
								contentItem.value = e.editor.getData();
							}
						},
						instanceReady: function (e) {

							// Editor is ready... so lets now resize to our container
							var newHeight = txtArea.parentElement.offsetHeight;
							var newWidth = e.sender.container.$.offsetWidth;

							e.editor.resize(newWidth, newHeight);

							// Stuff the pointer to the editor into our contentItem
							contentItem.lsWire = contentItem.lsWire != undefined ? contentItem.lsWire : {};
							contentItem.lsWire.editor = e.editor;

						}
					}
				});

			});



		},


		// ============================================================================================
		// Initialize the ckEditor, using the jQuery plugin, notice how similar
		// This works on a textArea control
		// ============================================================================================
		initializeCkEditorJQuery: function (element, contentItem, customToolbar, readOnly) {

			/// <summary>Initialize a text area control as a Rich Text Editor using jQuery plugin for CkEditor</summary>
			/// <param name="element" type="object">DOM Element of the control</param>
			/// <param name="contentItem" type="object">contentItem of the control</param>
			/// <param name="customToolbar" type="object">Optional - Array of strings on which tools to include on the toolbar</param>
			/// <param name="readOnly" type="boolean">Optional - Turn the editor into a read only view</param>

			// Obvious, creating our toolbar
			var baseToolbar = [
				'Maximize', 'ShowBlocks', 'Print', 'Preview', '-',
				'Cut', 'Copy', 'Paste', 'PasteFromWord', 'RemoveFormat', '-',
				'Undo', 'Redo', '-',
				'Scayt', '-',
				'Table', 'HorizontalRule', 'SpecialChar', 'Blockquote', 'PageBreak', 'InsertPre', 'Font', 'FontSize', '-',
				'NumberedList', 'BulletedList', '-',
				'Outdent', 'Indent', '-',
				'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'Bold', 'Italic', 'Underline', 'Strike', '-', 'Source'
			];

			var toolbar = customToolbar != undefined ? customToolbar : baseToolbar;


			// Wait for height to be changed for our element before creating our instance
			lsWire.editors.onceElementAttrChange(element, 'height', function () {

				// find our textarea element
				var txtArea = element.getElementsByTagName('textarea')[0];

				// Good to go... create our editor, the height calc is a hack
				$(element).find('textarea')
					.ckeditor({
						height: txtArea.parentElement.offsetHeight,
						toolbar: [toolbar],
						readOnly: readOnly != undefined ? readOnly : false,
						allowedContent: true,
						on: {
							blur: function (e) {
								if (e.editor.checkDirty()) {
									contentItem.value = e.editor.getData();
								}
							},
							instanceReady: function (e) {
								
								// Editor is ready... so lets now resize to our container
								var newHeight = txtArea.parentElement.offsetHeight;
								var newWidth = e.sender.container.$.offsetWidth;

								e.editor.resize(newWidth, newHeight);

								// Stuff the pointer to the editor into our contentItem
								contentItem.lsWire = contentItem.lsWire != undefined ? contentItem.lsWire : {};
								contentItem.lsWire.editor = e.editor;

							}
						}
					});

            });

		},


		// ============================================================================================
		// Initialzie our Kendo UI Editor, Easiest of the bunch and most powerful!
		// The Kendo UI editor works from a custom control vs textArea
		// ============================================================================================
		initializeKendoEditor: function (element, contentItem, customToolbar) {

			/// <summary>Initialize a text area control as a Rich Text Editor using Kendo UI Editor</summary>
			/// <param name="element" type="object">DOM Element of the control</param>
			/// <param name="contentItem" type="object">contentItem of the control</param>
			/// <param name="customToolbar" type="object">Optional - Array of strings on which tools to include on the toolbar</param>

			var baseToolbar = [
					"bold", "italic", "underline", "strikethrough",
					"justifyLeft", "justifyCenter", "justifyRight", "justifyFull",
					"insertUnorderedList", "insertOrderedList", "indent", "outdent",
					"createLink", "unlink", "insertImage",
					"createTable", "addRowAbove", "addRowBelow", "addColumnLeft", "addColumnRight", "deleteRow", "deleteColumn",
					"viewHtml",
					"foreColor",
					"backColor",
					"formatting",
					"fontName",
					"fontSize"
			];

			var toolbar = customToolbar != undefined ? customToolbar : baseToolbar;

			// Initialzie the kendo editor, easy peasy!
			var editor = $(element).kendoEditor({
				encoded: false,
				value: contentItem.value,
				tools: toolbar,
				change: function (e) {
					contentItem.value = this.value();
				}
			}).data('kendoEditor');

			// Stuff the pointer to the editor into our contentItem
			contentItem.lsWire = contentItem.lsWire != undefined ? contentItem.lsWire : {};
			contentItem.lsWire.editor = editor;

		},


		// ============================================================================================
		// Initialzie the TinyMCE editor, pretty powerful but at a cost of complexity
		// TinyMCE works off of a textArea control
		// ============================================================================================
		initializeTinyMCE: function (element, contentItem, customToolbar) {

			/// <summary>Initialize a text area control as a Rich Text Editor using CkEditor</summary>
			/// <param name="element" type="object">DOM Element of the control</param>
			/// <param name="contentItem" type="object">contentItem of the control</param>
			/// <param name="customToolbar" type="object">Optional - Space seperated list of strings on which tools to include on the toolbar</param>

			// Wait for the our parent to get its dimensions
			lsWire.editors.onceElementAttrChange(element, "height", function () {

				// Get our text area, add a custom css class for our selector
				var txtArea = element.getElementsByTagName('textarea')[0];
				var mceClass = "tinymce_" + txtArea.id;
				txtArea.classList.add(mceClass);

				var toolbar = customToolbar != undefined ? customToolbar : "insertfile undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image";

				// Go initialize the editor on this text area
				tinymce.init({
					selector: 'textarea.' + mceClass,
					plugins: [
						 "advlist autolink lists link image charmap print preview anchor",
						 "searchreplace visualblocks code fullscreen",
						 "insertdatetime media table contextmenu paste moxiemanager"
					],
					toolbar: toolbar,
					height: txtArea.parentElement.offsetHeight * parseInt(element.style.maxHeight) / 100,
					setup: function (editor) {

						// When user leaves the editor
						editor.on('blur', function (e) {

							// Did they do any edits?  If so, save to our contentItem
							if (e.target.isDirty()) {
								contentItem.value = e.target.getContent();
							}

						});

						// Stuff the pointer to the editor into our contentItem
						contentItem.lsWire = contentItem.lsWire != undefined ? contentItem.lsWire : {};
						contentItem.lsWire.editor = editor;

					}
				});

			});


		},


		// ============================================================================================
		// Helper function, monitor an elements attribute, when it changes run the method
		// This is more responsive then trying to guess how long your setTimeout should be
		// ============================================================================================
		onceElementAttrChange: function (element, attrName, method) {

			/// <summary>Monitor the attribute of a DOM element, when it changes, fire off the method</summary>
			/// <param name="element" type="object">DOM Element of the control</param>
			/// <param name="attrName" type="string">Name of the attribute to monitor</param>
			/// <param name="method" type="object">Method to execute when the attribute changes</param>

			var $element = $(element);
			var origValue = $element.css(attrName);
			monitorAttr();

			function monitorAttr() {
				if ($element.css(attrName) !== origValue) {
					$element.trigger(attrName + 'Change');
					method();
					return null;
				}

				setTimeout(monitorAttr, 50);
				return null;
			}

		}
	};

})();

