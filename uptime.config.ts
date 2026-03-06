import type { PageConfig, WorkerConfig, MaintenanceConfig } from './src/types'

const pageConfig: PageConfig = {
  title: "我的 Hugging Face Spaces 保活状态",
  description: "实时监控 uu798 和 uu797 是否在线（防止 48 小时自动休眠）",
  links: [
    { 
      link: 'https://cciq200-uu798.hf.space', 
      label: '打开 Space 1: uu798', 
      highlight: true 
    },
    { 
      link: 'https://uu798-uu797.hf.space', 
      label: '打开 Space 2: uu797', 
      highlight: true 
    },
    { 
      link: 'https://huggingface.co/spaces/cciq200/uu798', 
      label: 'HF 项目页 1' 
    },
    { 
      link: 'https://huggingface.co/spaces/uu798/uu797', 
      label: 'HF 项目页 2' 
    },
  ],
}

const workerConfig: WorkerConfig = {
  // 可选：如果想给状态页加简单密码保护，取消注释并改成你想要的 username:password
  // passwordProtection: 'admin:你的密码',

  // 全局默认 User-Agent（可被单个 monitor 覆盖）
  defaultUA: 'UptimeFlare-HF-KeepAlive/2026',

  monitors: [
    {
      id: 'hf_space_uu798',
      name: 'Space uu798 (cciq200)',
      method: 'GET',
      target: 'https://cciq200-uu798.hf.space',
      timeout: 15000,                  // 15 秒超时
      expectedCodes: [200, 503],       // 200=正常，503=HF 正在启动，也算活跃
      interval: 3000,                   // 每 3000 秒（50 分钟）检查一次
      retry: 2,                        // 失败重试 2 次
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; UptimeFlare-HF/1.0)',  // 模拟浏览器访问，更像真实流量
      },
      tooltip: 'Hugging Face Space - 自动保活，每5分钟 ping 一次',
      statusPageLink: 'https://cciq200-uu798.hf.space',
      // 可选：如果 Space 根路径有重定向或需要检查特定子路径，可改 target 为 '/health' 等
    },
    {
      id: 'hf_space_uu797',
      name: 'Space uu797 (uu798)',
      method: 'GET',
      target: 'https://uu798-uu797.hf.space',
      timeout: 15000,
      expectedCodes: [200, 503],
      interval: 3000,
      retry: 2,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; UptimeFlare-HF/1.0)',
      },
      tooltip: 'Hugging Face Space - 自动保活，每5分钟 ping 一次',
      statusPageLink: 'https://uu798-uu797.hf.space',
    },
    // 如果以后要加更多监控（如你的网站、API），直接在这里继续加对象
  ],

  // 通知配置（可选，如果你想失败时收到 Telegram/Email/钉钉 等提醒）
  // notification: {
  //   telegram: { botToken: '你的token', chatId: '你的chatId' },
  //   // 其他类型见官方 Wiki
  // },
}

const maintenances: MaintenanceConfig[] = [
  // 如果有计划维护时间，可以在这里加（目前为空）
]

export { pageConfig, workerConfig, maintenances }
