'use strict';

var NavCtrl = function () {
	var vm  = this;
	vm.app = require( 'index.json' );
};

module.exports = function () {
	require( './nav.scss' );
	return {
		controller: NavCtrl,
		controllerAs: 'nav',
		templateUrl: './core/nav/nav.html'
	};
};