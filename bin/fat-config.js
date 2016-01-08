moudle.exports = {
    port: 80,
    proxy: [
        {
            name: '推荐页',
            rule: /\/ttdiscuss\/v1\/brow\/feed\//,
            target: '/page/index/recommend.html'
        },
        {
            name: '关注页',
            rule: /\/ttdiscuss\/v1\/brow\/find\//,
            target: '/page/index/surround.html'   
        }
    ]
}