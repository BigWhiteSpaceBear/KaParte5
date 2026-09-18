/*global QUnit*/

sap.ui.define([
	"student00i/com/sap/training/ux402/fullscreen/fullscreen/controller/Carrier.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Carrier Controller");

	QUnit.test("I should test the Carrier controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
