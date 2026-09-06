/**
 * Yiang Health — 收款配置（支持自动跳转）
 *
 * 填好后部署即可。不要把任何密码、Secret Key 写进本文件。
 * 推荐：用 Stripe Payment Link（支持跨境到国内银行卡，付款后自动跳转成功页）
 */
const YiangConfig = {
  version: '1.4.0',
  productName: 'Yiang Health',
  positioning: 'China TCM · Wellness · Culture journey planning for global visitors',

  /** 展示用价格 */
  pricing: {
    essentials: {
      id: 'essentials',
      priceUsd: 14.9,
      priceCny: 99,
      label: { en: 'Essentials', 'zh-CN': '基础解锁' }
    },
    full: {
      id: 'full-journey',
      priceUsd: 24.9,
      priceCny: 168,
      label: { en: 'Full Journey Pack', 'zh-CN': '完整旅程包' }
    }
  },

  /**
   * 收款方式（优先推荐 Stripe，实现真正自动跳转）
   * Stripe Payment Link 创建后，把链接填到 stripe.essentialsUrl / fullUrl
   * 成功页地址设为：你的域名/health/success.html?plan=essentials 或 full
   */
  payments: {
    stripe: {
      enabled: true,
      // 在 Stripe Dashboard → Payment Links 创建，成功 URL 设为 success.html
      essentialsUrl: '',  // 例: 'https://buy.stripe.com/xxxx'
      fullUrl: '',        // 例: 'https://buy.stripe.com/yyyy'
      note: { en: 'Pay securely with card (international supported)', 'zh-CN': '信用卡安全支付（支持跨境）' }
    },
    paypal: {
      enabled: false,
      essentialsUrl: '',
      fullUrl: '',
      meUrl: ''
    },
    wechat: {
      enabled: true,
      essentialsQr: 'assets/qr/wechat-essentials.png',
      fullQr: 'assets/qr/wechat-full.png',
      note: { en: 'WeChat Pay — scan with WeChat', 'zh-CN': '微信扫码支付' }
    },
    alipay: {
      enabled: true,
      essentialsQr: 'assets/qr/alipay-essentials.png',
      fullQr: 'assets/qr/alipay-full.png',
      note: { en: 'Alipay — scan with Alipay', 'zh-CN': '支付宝扫码支付' }
    }
  },

  /**
   * 自动解锁码（付款成功页会自动使用，也可手动输入）
   * 上线后请立即修改这些码
   */
  accessCodes: {
    essentials: 'YH-ESSENTIALS-2026',
    full: 'YH-FULL-2026',
    master: 'YH-MASTER-DEMO'
  },

  /** 付款成功后自动跳转的页面（已实现） */
  successPage: 'success.html',

  contact: {
    email: '',
    wechatId: '',
    note: {
      en: 'After payment you will be redirected automatically. No need to contact us.',
      'zh-CN': '付款成功后会自动跳转，无需联系我们。'
    }
  },

  policyNote: 'Planning intermediary only. Not a medical provider.'
};

window.YiangConfig = YiangConfig;
