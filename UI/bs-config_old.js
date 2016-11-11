


const bs = require('browser-sync').create();

// Options passed to Chokidar
bs.init({
    watchOptions: {
        ignoreInitial: true,
        ignored: '*.txt'
    },
    files: ['./app']
});


// multiple files
browserSync({
    files: [ "app/js/*.js"]
});

// NOTE: the .watch() method will not receive
// these options automatically, so you must provide
// them manually in the following way
bs.watch(['app/js/*.js', ], {ignored: '*.map.js'});

