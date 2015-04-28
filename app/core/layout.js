module.exports = angular.module('app.layout', [])
	.directive( 'lumxNavbar', require('./nav/nav' ) )
	.directive( 'lumxFooter', require('./footer/footer' ) );