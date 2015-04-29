'use strict';

var FooterCtrl = function () {
	var vm  = this;
	vm.title = 'footer here';
};

module.exports = function () {
	require( './footer.scss' );
	return {
		controller: FooterCtrl,
		controllerAs: 'footer',
		templateUrl: './core/footer/footer.html'
	};
};