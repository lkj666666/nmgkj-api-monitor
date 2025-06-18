const axios = require('axios');

(async () => {
  const apiUrl = 'http://training.nmgkj.edufe.cn/JXJY/nmgkj/api/nmgCallBackTest';
  
  try {
    // 执行GET请求
    const response = await axios.get(apiUrl, {
      timeout: 100000,  // 100秒超时
      headers: {
        'User-Agent': 'NMGKJ-Monitor/1.0 (GitHub Actions)'
      }
    });
    
    // 获取北京时间
    const beijingTime = new Date().toLocaleString('zh-CN', {
      timeZone: 'Asia/Shanghai',
      hour12: false
    });
    
    // 结果日志
    console.log(`[${beijingTime}] ✅ 接口调用成功`);
    console.log(`状态码: ${response.status}`);
    console.log('响应数据:', response.data);
    
  } catch (error) {
    // 错误处理
    console.error(`❌ 接口调用失败: ${error.message}`);
    
    // 非零退出码标记任务失败
    process.exit(1);
  }
})();
