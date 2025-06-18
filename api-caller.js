const http = require('http');

const apiUrl = 'http://training.nmgkj.edufe.cn/JXJY/nmgkj/api/nmgCallBackTest';

// 获取北京时间
function getBeijingTime() {
  return new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour12: false
  });
}

// 执行接口调用
const request = http.get(apiUrl, (response) => {
  let data = '';
  
  response.on('data', (chunk) => {
    data += chunk;
  });
  
  response.on('end', () => {
    console.log(`[${getBeijingTime()}] ✅ 接口调用成功`);
    console.log(`状态码: ${response.statusCode}`);
    console.log('响应数据:', data);
  });
});

// 设置超时
request.setTimeout(10000, () => {
  console.error(`❌ 接口调用超时 (10秒)`);
  request.destroy(); // 终止请求
  process.exit(1);
});

// 错误处理
request.on('error', (error) => {
  console.error(`❌ 接口调用失败: ${error.message}`);
  process.exit(1);
});
