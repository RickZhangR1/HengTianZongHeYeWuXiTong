const CompressionPlugin =require("compression-webpack-plugin")
module.exports = {
    devServer: {
        port: 8082,
        host: "0.0.0.0",
        https: false,
        open: true,
        proxy: {
            "/api": {
                target: "http://localhost:8088",//访问的服务器地址
                changeOrigin: true,//true为开启代理
                //secure: true, // 如果是https接口，需要配置这个参数
                pathRewrite: {
                    '^/api': '/'//路径的替换规则
                    /*
                     *这里的配置是正则表达式，以/api开头的路径将会被‘/'替换掉
                     *假如后台文档的接口是 "https://www.cyclv.com/admin/login"
                     *前端调取API接口应写：axios.get('/api/admin/login')
                     */
                }
            },
            [process.env.VUE_APP_BASE_API]: {
                target: process.env.VUE_APP_SERVICE_URL,
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    lintOnSave: false,
    productionSourceMap: false,
    configureWebpack: config=>{
        // config.externals={
        //     'vue': 'Vue',
        //     'vue-router': 'VueRouter',
        //     'vuex': 'Vuex',
        // }
        if(process.env.NODE_ENV ==='producion'){
            return {
                plugins:[new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/,//匹配文件名
                    threshold: 10240,//对超过10k的数据进行压缩
                    deleteOriginalAssets: false//是否删除源文件
                })]
            }
        }
    }
}
