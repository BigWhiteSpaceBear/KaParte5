/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"student00i/com/sap/training/ux402/fullscreen/fullscreen/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
