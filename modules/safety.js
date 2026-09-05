/**
 * YIANG HEALTH - Safety Layer
 * Safety Filter MUST run BEFORE any planning / AI logic.
 * Future: this remains the first gate even when real AI API is connected.
 */

const SafetyLayer = (function () {
  // Emergency keywords (English + common multilingual equivalents)
  const EMERGENCY_KEYWORDS = [
    // English
    'chest pain', 'difficulty breathing', 'shortness of breath', 'cannot breathe',
    'stroke', 'severe bleeding', 'heavy bleeding', 'loss of consciousness',
    'unconscious', 'severe allergic reaction', 'anaphylaxis', 'heart attack',
    'cardiac arrest', 'seizure', 'convulsion', 'suicide', 'kill myself',
    'overdose', 'poisoning', 'choking', 'severe trauma', 'broken bone open',
    'ambulance', 'emergency room now', 'dying', 'about to die',
    // Chinese
    '胸痛', '呼吸困难', '喘不过气', '中风', '脑卒中', '大出血', '严重出血',
    '昏迷', '失去意识', '严重过敏', '过敏性休克', '心脏病发作', '心脏骤停',
    '癫痫', '抽搐', '自杀', '想死', '急救', '救护车',
    // Japanese
    '胸の痛み', '呼吸困難', '息ができない', '脳卒中', '大出血', '意識不明',
    // Korean
    '가슴 통증', '호흡 곤란', '뇌졸중', '대량 출혈', '의식 소실',
    // Spanish
    'dolor de pecho', 'dificultad para respirar', 'accidente cerebrovascular',
    'sangrado severo', 'pérdida de conciencia',
    // French
    'douleur thoracique', 'difficulté à respirer', 'avc', 'saignement grave',
    // German
    'brustschmerzen', 'atemnot', 'schlaganfall', 'starke blutung',
    // Arabic
    'ألم في الصدر', 'صعوبة في التنفس', 'سكتة دماغية', 'نزيف حاد',
    // Russian
    'боль в груди', 'затрудненное дыхание', 'инсульт', 'сильное кровотечение'
  ];

  // Sensitive personal data patterns (remind user not to input)
  const SENSITIVE_PATTERNS = [
    /\b\d{15,19}\b/,           // possible card / long ID
    /\b[A-Z0-9]{6,9}\b.*passport/i,
    /passport\s*(number|no|#)/i,
    /身份证|護照|护照号码|银行卡|信用卡|密码|password|ssn|social security/i
  ];

  /**
   * Safety Filter - MUST be called before any journey generation
   * @param {string} text - User free-text input
   * @returns {{ safe: boolean, isEmergency: boolean, hasSensitive: boolean, message: string|null }}
   */
  function safetyFilter(text) {
    if (!text || typeof text !== 'string') {
      return { safe: true, isEmergency: false, hasSensitive: false, message: null };
    }

    const lower = text.toLowerCase().trim();

    // Emergency check
    for (const kw of EMERGENCY_KEYWORDS) {
      if (lower.includes(kw.toLowerCase())) {
        return {
          safe: false,
          isEmergency: true,
          hasSensitive: false,
          message: 'EMERGENCY_GATE'
        };
      }
    }

    // Sensitive data warning (soft - still allow but warn)
    let hasSensitive = false;
    for (const pat of SENSITIVE_PATTERNS) {
      if (pat.test(text)) {
        hasSensitive = true;
        break;
      }
    }

    return {
      safe: true,
      isEmergency: false,
      hasSensitive,
      message: hasSensitive ? 'SENSITIVE_WARNING' : null
    };
  }

  /**
   * Generate emergency gate HTML / content
   */
  function getEmergencyContent(lang) {
    // Will be localized via i18n in UI
    return {
      title: 'This is not an emergency medical service',
      body: 'If you may be experiencing a medical emergency, please contact your local emergency services or seek immediate medical attention immediately. Do not rely on this website for emergency care.',
      action: 'Return to Home'
    };
  }

  /**
   * Future: expand keyword lists from remote config
   */
  function updateEmergencyKeywords(list) {
    if (Array.isArray(list)) {
      EMERGENCY_KEYWORDS.push(...list);
    }
  }

  return {
    safetyFilter,
    getEmergencyContent,
    updateEmergencyKeywords,
    // Explicit future hook
    runBeforeAI: safetyFilter
  };
})();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SafetyLayer;
}
window.SafetyLayer = SafetyLayer;
