/**
 * Yiang Health — 收款配置（当前以人工核验为准）
 *
 * 不要把密码、Secret Key 或私密凭证写进本文件。
 * 静态页面不能验证实际到账；任何二维码付款都必须由收款方核实后再发放访问码。
 */
const YiangConfig = {
  version: '1.4.0',
  productName: 'Yiang Health',
  positioning: 'Everyday wellness, local culture, food, nature and health information for people in China',

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
   * 收款方式：必须先配置并完成真实交易测试。
   * 当前 Stripe / PayPal 关闭；微信 / 支付宝二维码如启用，均需人工核验到账。
   */
  payments: {
    stripe: {
      enabled: false,
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
      essentialsQr: 'assets/qr/wechat-essentials.jpg',
      fullQr: 'assets/qr/wechat-full.jpg',
      note: { en: 'WeChat Pay — scan with WeChat', 'zh-CN': '微信扫码支付' }
    },
    alipay: {
      enabled: true,
      essentialsQr: 'assets/qr/alipay-essentials.jpg',
      fullQr: 'assets/qr/alipay-full.jpg',
      note: { en: 'Alipay — scan with Alipay', 'zh-CN': '支付宝扫码支付' }
    }
  },

  /**
   * 客户端演示解锁码：公开可见，不可作为安全的付费凭证。
   * 不得将这些公开演示码用于真实收费业务；付费访问需服务端验证。
   */
  accessCodes: {
    essentials: 'YH-ESSENTIALS-2026',
    full: 'YH-FULL-2026',
    master: 'YH-MASTER-DEMO'
  },

  /** 静态说明页；打开此页面不代表支付已成功或已到账 */
  successPage: 'success.html',

  contact: {
    wechatId: '+86 186 0356 7665',
    tel: '+8618603567665',
    note: {
      en: 'After payment, send your receipt screenshot to us. We will issue an access code after manually confirming the payment.',
      'zh-CN': '付款后请将支付凭证截图发送给我们；核实到账后会提供解锁码。'
    }
  },

  policyNote: 'Planning intermediary only. Not a medical provider.'
};

window.YiangConfig = YiangConfig;
