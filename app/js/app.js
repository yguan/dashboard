require.config({
    baseUrl: 'js',
    paths: {
        view: './view'
    }
});

require(['view/all-views'], function (views) {
    views.init();
});

// python -m http.server
