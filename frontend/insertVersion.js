var fs = require( 'fs' ),
    packageJson = require( './package.json' );

var path = 'app/views/footer.html';
var file = fs.readFileSync( path, { encoding: 'utf8' } ),
    out = file.replace( /<!--UI-->.*<!--\/UI-->/, '<!--UI-->' + packageJson.version + '<!--/UI-->' );

fs.writeFileSync( path, out );
