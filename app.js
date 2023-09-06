/*
 * @Description: api.themoviedb.org代理云函数
 * @Version: 0.1
 * @Author: BaiYiZhuo
 * @Date: 2023-09-06 23:52:25
 * @LastEditTime: 2023-09-06 23:53:43
 */
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 9000;

app.use('/', createProxyMiddleware({
  target: 'https://api.themoviedb.org',
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    // 移除 'x-forwarded-for' 和 'x-real-ip' 头，以确保不传递原始客户端 IP 地址等信息
    proxyReq.removeHeader('x-forwarded-for');
    proxyReq.removeHeader('x-real-ip');
  },
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}));

app.listen(port, () => {
  console.log(`启动监听 http://localhost:${port}`);
});