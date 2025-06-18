const http = require('http');

// 接口配置
const apiHost = 'training.nmgkj.edufe.cn';
const apiPath = '/JXJY/nmgkj/api/nmgCallBackTest';

// 获取北京时间
function getBeijingTime() {
  return new Date().toLocaleString('zh-CN', {
    timeZone: 'Asia/Shanghai',
    hour12: false
  });
}

// 执行接口调用
function callApi() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: apiHost,
      port: 80,
      path: apiPath,
      method: 'GET',
      headers: {
        'User-Agent': 'GitHubActions-Monitor/1.0'
      },
      timeout: 10000 // 10秒超时
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        const result = {
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        };
        resolve(result);
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('请求超时 (10秒)'));
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

// 主执行函数
(async () => {
  try {
    const beijingTime = getBeijingTime();
    console.log(`[${beijingTime}] 开始调用接口...`);
    
    const response = await callApi();
    
    console.log(`[${beijingTime}] ✅ 接口调用成功`);
    console.log(`状态码: ${response.statusCode}`);
    console.log('响应内容:', response.body);
    
    // 验证状态码是否为200
    if (response.statusCode !== 200) {
      throw new Error(`非200状态码: ${response.statusCode}`);
    }
    
  } catch (error) {
    console.error(`❌ 接口调用失败: ${error.message}`);
    process.exit(1); // 非零退出码表示失败
  }
})();
