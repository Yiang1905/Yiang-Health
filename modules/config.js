/**
 * Yiang Health — 收款配置（PayPal + 微信 + 支付宝）
 *
 * 填好后部署即可。不要把任何密码、Secret Key 写进本文件。
 */
const YiangConfig = {
  version: '1.3.1',
  productName: 'Yiang Health',
  positioning: 'China TCM · Wellness · Culture journey planning for global visitors',

  /** 展示用价格（可同时写美元与人民币说明） */
  pricing: {
    essentials: {
      id: 'essentials',
      priceUsd: 9.9,
      priceCny: 68,
      label: { en: 'Essentials', 'zh-CN': '基础解锁' }
    },
    full: {
      id: 'full-journey',
      priceUsd: 29,
      priceCny: 198,
      label: { en: 'Full Journey Pack', 'zh-CN': '完整旅程包' }
    }
  },

  /**
   * 三种收款方式
   * - paypalUrl: PayPal.me 或付款链接（海外客户点按钮跳转）
   * - wechatQr: 微信收款码图片路径
   * - alipayQr: 支付宝收款码图片路径
   */
  payments: {
    paypal: {
      enabled: true,
      // 例: 'https://paypal.me/YourName/9.90' 或商品链接
      essentialsUrl: '',
      fullUrl: '',
      // 若只有一个通用 PayPal.me，可只填 meUrl，金额让客户选
      meUrl: ''
    },
    wechat: {
      enabled: true,
      essentialsQr: 'assets/qr/wechat-essentials.png',
      fullQr: 'assets/qr/wechat-full.png',
      // 若两个档位共用一个码，都指向同一张图即可
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
   * 付款成功后你发给客户的解锁码（务必改成自己的）
   * master 仅自己测试，上线后改掉或删除
   */
  accessCodes: {
    essentials: 'YH-ESSENTIALS-2026',
    full: 'YH-FULL-2026',
    master: 'YH-MASTER-DEMO'
  },

  /** 客户付款后如何联系你（可选，显示在支付区） */
  contact: {
    email: '',
    wechatId: '',  // 你的微信号，方便客户付款后联系要解锁码
    note: {
      en: 'After payment, send a screenshot to us and we will reply with your access code.',
      'zh-CN': '付款后请把转账截图发给我们，我们回复解锁码。'
    }
  },

  policyNote: 'Planning intermediary only. Not a medical provider.'
};

window.YiangConfig = YiangConfig;
