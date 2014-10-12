var loadAndRunScripts = require('loadandrunscripts');
var ManagedView = require('threejs-managed-view');

function onReady() {
	var view = new ManagedView.View({
		stats:true
	});

	var ImageColorPallete = require('./');
	var MaterialPreview = require('threejs-material-preview');
	var pallette = new ImageColorPallete('assets/pallette.png', function(pallettes) {

		for (var iPal = 0; iPal < pallettes.length; iPal++) {
			var pallette = pallettes[iPal];
			var materials = [];
			for (var iCol = 0; iCol < pallette.length; iCol++) {
				materials.push(new THREE.MeshBasicMaterial({
					color: pallette[iCol]
				}))
				console.log(pallette[iCol]);
			};
			var matPrev = new MaterialPreview.Ring(materials);
			view.scene.add(matPrev);
			matPrev.position.y = iPal * -.25 + 2.5;
		};
	});
}

loadAndRunScripts(
	[
		'bower_components/three.js/three.min.js',
		'lib/stats.min.js',
		'lib/threex.rendererstats.js'
	],
	onReady
);