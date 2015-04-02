'use strict';

require('angular-ui-router');

angular.element(document).ready(function() {
	var deps = [
		'ui.router'
	];

	angular.module('app', deps)
		.config([
			'$stateProvider', '$urlRouterProvider',
			function($stateProvider, $urlRouterProvider) {
				$urlRouterProvider.otherwise('/');

				$stateProvider
					.state('home', {
						url: '/',
						template: '<div>This is a home page</div>'
					});
			}
		]);

	angular.bootstrap(document, ['app']);
});