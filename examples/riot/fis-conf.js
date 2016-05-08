fis.set( 'project.dependencies', [
    // '../tt_common'
] );

fis.set( 'project.ignore',
    fis.get( 'project.ignore' ).concat( [
        '/config/**',
        '/fat-*.js',
        '/fis-*.js',
        '/*.md',
        '/*.txt',
        '.DS_Store',
        '/**/*.md',
        '/**/*.txt',
        '/.watchingignore',
        '/build/**',
        '/mock/**',
        'node_modules'
    ] ) );
