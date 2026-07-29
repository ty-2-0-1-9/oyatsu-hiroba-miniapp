window.MINI_APP_DATA = {
  stats: [
    { label: "今日の参加", value: "18,420" },
    { label: "本日の発行ハート", value: "128k" },
    { label: "人気タイプ", value: "ひと息" }
  ],
  products: [
    {
      id: "chocoStick",
      name: "チョコスティック",
      category: "チョコレート",
      image: "./assets/products/choco-stick.svg",
      fans: "8,240"
    },
    {
      id: "saltedStick",
      name: "ソルティスティック",
      category: "スナック",
      image: "./assets/products/salted-stick.svg",
      fans: "5,910"
    },
    {
      id: "creamBiscuit",
      name: "クリームサンド",
      category: "ビスケット",
      image: "./assets/products/cream-biscuit.svg",
      fans: "6,420"
    },
    {
      id: "fluffyCone",
      name: "ふんわりコーン",
      category: "チョコレート",
      image: "./assets/products/fluffy-cone.svg",
      fans: "4,880"
    },
    {
      id: "lightCookie",
      name: "ライトクッキー",
      category: "アイス・菓子",
      image: "./assets/products/light-cookie.svg",
      fans: "3,760"
    }
  ],
  quizQuestions: [
    {
      id: "mood",
      title: "今日の気分は？",
      options: [
        { id: "relax", label: "ひと息つきたい", scores: { chocoStick: 3, lightCookie: 2, creamBiscuit: 1 } },
        { id: "talk", label: "誰かと話したい", scores: { saltedStick: 3, chocoStick: 2, fluffyCone: 1 } },
        { id: "cheer", label: "元気を出したい", scores: { fluffyCone: 3, creamBiscuit: 2, chocoStick: 1 } },
        { id: "light", label: "軽やかに過ごしたい", scores: { lightCookie: 3, saltedStick: 1, chocoStick: 1 } }
      ]
    },
    {
      id: "scene",
      title: "食べるならどんな時間？",
      options: [
        { id: "work", label: "仕事や勉強の休憩", scores: { chocoStick: 3, lightCookie: 1, saltedStick: 1 } },
        { id: "family", label: "家族とゆっくり", scores: { creamBiscuit: 3, fluffyCone: 2, chocoStick: 1 } },
        { id: "share", label: "友だちとシェア", scores: { saltedStick: 3, chocoStick: 2, fluffyCone: 1 } },
        { id: "me", label: "自分へのごほうび", scores: { fluffyCone: 3, lightCookie: 2, chocoStick: 1 } }
      ]
    },
    {
      id: "texture",
      title: "今ほしい食感は？",
      options: [
        { id: "crisp", label: "ポキッと軽い", scores: { chocoStick: 3, saltedStick: 2 } },
        { id: "gentle", label: "やさしくほろっと", scores: { creamBiscuit: 3, lightCookie: 1 } },
        { id: "fun", label: "ふわっと楽しい", scores: { fluffyCone: 3, chocoStick: 1 } },
        { id: "clean", label: "すっきり軽め", scores: { lightCookie: 3, saltedStick: 1 } }
      ]
    }
  ],
  resultTypes: {
    chocoStick: {
      id: "chocoStick",
      title: "ひと息チョコスティックタイプ",
      productId: "chocoStick",
      catch: "少し立ち止まって、気持ちを整えるのが上手な日。",
      suggestion: "短い休憩時間に、好きな飲み物と一緒に楽しむのがおすすめ。",
      ratio: 32
    },
    saltedStick: {
      id: "saltedStick",
      title: "わいわいソルティスティックタイプ",
      productId: "saltedStick",
      catch: "誰かと分け合うことで、会話が弾みやすい日。",
      suggestion: "今日の小さなできごとを話しながら、シェアして楽しんで。",
      ratio: 24
    },
    creamBiscuit: {
      id: "creamBiscuit",
      title: "やさしさクリームサンドタイプ",
      productId: "creamBiscuit",
      catch: "ほっとする時間を大切にしたい日。",
      suggestion: "家族や身近な人とのおやつ時間にぴったりです。",
      ratio: 18
    },
    fluffyCone: {
      id: "fluffyCone",
      title: "ごほうびふんわりコーンタイプ",
      productId: "fluffyCone",
      catch: "いつもより少し楽しい気分を足したい日。",
      suggestion: "がんばった後のごほうびとして、気分をふわっと上げて。",
      ratio: 15
    },
    lightCookie: {
      id: "lightCookie",
      title: "すっきりライトクッキータイプ",
      productId: "lightCookie",
      catch: "軽やかに、自分のペースで過ごしたい日。",
      suggestion: "甘さも気分も軽めに整えたい時におすすめです。",
      ratio: 11
    }
  },
  dailyVote: {
    title: "今日のおやつ時間、どっち派？",
    body: "選ぶだけで、みんなの気分が見えてきます。投票するとハートも貯まります。",
    options: [
      { id: "solo", label: "ひとりでゆっくり", count: 2840 },
      { id: "share", label: "誰かとシェア", count: 2190 },
      { id: "family", label: "家族と楽しむ", count: 1760 },
      { id: "work", label: "休憩中にさっと", count: 1510 }
    ]
  },
  oneWords: [
    { name: "さき", productId: "chocoStick", text: "今日はコーヒーと一緒にひと息つきたい。" },
    { name: "ハル", productId: "creamBiscuit", text: "家族とゆっくり楽しみたい気分です。" },
    { name: "Nao", productId: "saltedStick", text: "作業の合間に気軽につまみたい。" }
  ],
  cards: [
    { id: "card-facility-checkin", icon: "施設", title: "施設チェックインカード", rarity: "体験記録", hint: "施設を訪れ、LINEタッチでチェックインした記録です。" },
    { id: "card-factory-checkin", icon: "工場", title: "工場見学チェックインカード", rarity: "見学記念", hint: "工場見学へ参加し、ものづくりに触れた記録です。" },
    { id: "card-popup-checkin", icon: "POP", title: "ポップアップイベントカード", rarity: "期間限定", hint: "ポップアップイベントへ参加した記録です。" },
    { id: "card-survey-complete", icon: "回答", title: "今日のアンケート回答カード", rarity: "参加記録", hint: "今日の体験についてアンケートへ回答した記録です。" }
  ],
  heartRules: [
    { id: "quiz", label: "診断完了", hearts: 10, frequency: "1日1回" },
    { id: "vote", label: "投票参加", hearts: 3, frequency: "1日1回" },
    { id: "oneword", label: "ひとこと投稿", hearts: 5, frequency: "1日1回" },
    { id: "experience-facility", label: "施設チェックイン", hearts: 10, frequency: "会場ごと" },
    { id: "experience-factory", label: "工場見学チェックイン", hearts: 20, frequency: "会場ごと" },
    { id: "experience-popup", label: "ポップアップイベントチェックイン", hearts: 15, frequency: "会場ごと" },
    { id: "experience-survey", label: "今日のアンケート回答", hearts: 5, frequency: "1日1回" }
  ],
  eventCampaign: {
    title: "LINEタッチで体験を記録",
    body: "施設やイベント会場でチェックインすると、体験の記録カードとハートが受け取れます。",
    venue: "施設 / 工場見学 / ポップアップイベント",
    missions: [
      { id: "facility", actionId: "experience-facility", title: "施設チェックイン", description: "対象施設のLINEタッチからチェックインします。", hearts: 10, cardId: "card-facility-checkin", buttonLabel: "チェックイン" },
      { id: "factory", actionId: "experience-factory", title: "工場見学チェックイン", description: "工場見学の会場で参加記録を残します。", hearts: 20, cardId: "card-factory-checkin", buttonLabel: "チェックイン" },
      { id: "popup", actionId: "experience-popup", title: "ポップアップイベントチェックイン", description: "期間限定イベントの会場で参加記録を残します。", hearts: 15, cardId: "card-popup-checkin", buttonLabel: "チェックイン" },
      { id: "survey", actionId: "experience-survey", title: "今日のアンケート回答", description: "今日のおやつ体験について回答します。", hearts: 5, cardId: "card-survey-complete", buttonLabel: "回答する" }
    ],
    voteOptions: [
      { id: "process", label: "新しい発見があった", count: 920 },
      { id: "smell", label: "おいしさを感じた", count: 680 },
      { id: "history", label: "誰かに話したくなった", count: 540 },
      { id: "gift", label: "また参加したい", count: 730 }
    ]
  },
  parkBenefits: [
    "貯めたハートをWebコミュニティ側の体験に引き継ぐ",
    "診断結果やカードを保存できる",
    "みんなのコメントに参加できる",
    "限定記事やキャンペーンに出会える"
  ]
};




