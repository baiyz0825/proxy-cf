/*
 * @Description: api.themoviedb.org代理云函数
 * @Version: 0.1
 * @Author: BaiYiZhuo
 * @Date: 2023-09-06 23:52:25
 * @LastEditTime: 2023-09-06 23:53:43
 */
const socks = require('socks');
const net = require('net');

// 代理服务器配置
const proxyOptions = {
  proxy: {
    ipaddress: '0.0.0.0',  // 代理服务器监听的IP地址
    port: 9000,           // 代理服务器监听的端口号
    type: 5               // 使用Socket5协议
  },
  auths: [               // 配置用户名和密码验证
    socks.auth.UserPassword('username', 'password')
  ]
};

// 创建代理服务器
const server = socks.createServer((info, accept, deny) => {
  // 代理服务器收到连接请求时的处理逻辑
  const socket = net.connect(info.port, info.host, () => {
    accept(socket);
  });

  socket.on('error', (err) => {
    deny();
  });
});

// 启动代理服务器
server.listen(proxyOptions.proxy.port, proxyOptions.proxy.ipaddress, () => {
  console.log(`Socket5代理服务器已启动，监听在 ${proxyOptions.proxy.ipaddress}:${proxyOptions.proxy.port}`);
});
