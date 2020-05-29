module.exports = {
    devServer: {
        proxy: {
            "/ims": {
                target: 'http://192.168.1.136:8888',
                changeOrigin:true,
            },
            
        }
    }
}
