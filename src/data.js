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
    { name: "さき", text: "今日はコーヒーと一緒にチョコスティック気分。" },
    { name: "ハル", text: "家族で分けるならクリームサンドがちょうどいい。" },
    { name: "Nao", text: "ソルティスティックは作業中でも食べやすい。" }
  ],
  cards: [
    { id: "card-chocoStick-break", productId: "chocoStick", title: "チョコスティック休憩カード", rarity: "今日の一枚", hint: "休憩上手な人に届くカード" },
    { id: "card-saltedStick-talk", productId: "saltedStick", title: "ソルティスティックおしゃべりカード", rarity: "今日の一枚", hint: "会話が生まれるカード" },
    { id: "card-creamBiscuit-care", productId: "creamBiscuit", title: "クリームサンドやさしさカード", rarity: "今日の一枚", hint: "ほっとする時間のカード" },
    { id: "card-fluffyCone-treat", productId: "fluffyCone", title: "ふんわりコーンごほうびカード", rarity: "レア", hint: "楽しい気分を足すカード" },
    { id: "card-lightCookie-light", productId: "lightCookie", title: "ライトクッキーすっきりカード", rarity: "レア", hint: "軽やかな日のカード" },
    { id: "card-park-heart", productId: "chocoStick", title: "コミュニティ連動カード", rarity: "コミュニティ連動", hint: "続きはWebコミュニティで" },
    { id: "card-factory-tour", productId: "chocoStick", title: "工場見学チェックインカード", rarity: "会場限定", hint: "工場見学の思い出を持ち帰るカード" },
    { id: "card-event-live", productId: "saltedStick", title: "イベント参加カード", rarity: "会場限定", hint: "イベント参加で解放されるカード" }
  ],
  heartRules: [
    { id: "quiz", label: "診断完了", hearts: 10, frequency: "1日1回" },
    { id: "vote", label: "投票参加", hearts: 3, frequency: "1日1回" },
    { id: "oneword", label: "ひとこと投稿", hearts: 5, frequency: "1日1回" },
    { id: "card", label: "カード獲得", hearts: 8, frequency: "1日1回" },
    { id: "event-checkin", label: "会場チェックイン", hearts: 20, frequency: "会場ごと" },
    { id: "event-quiz", label: "会場クイズ", hearts: 5, frequency: "会場ごと" },
    { id: "event-vote", label: "会場投票", hearts: 5, frequency: "会場ごと" },
    { id: "event-card", label: "限定カード", hearts: 15, frequency: "会場ごと" }
  ],
  eventCampaign: {
    title: "工場見学・イベント限定ミッション",
    body: "会場のLINEタッチから入ると、その場だけのハートとカードが受け取れます。体験後はWebコミュニティで続きを楽しめます。",
    venue: "工場見学会場 / イベント会場",
    missions: [
      { id: "checkin", actionId: "event-checkin", title: "会場チェックイン", description: "受付や入口のLINEタッチから参加。来場記念ハートを受け取れます。", hearts: 20 },
      { id: "quiz", actionId: "event-quiz", title: "工場なるほどクイズ", description: "見学中に見つけたポイントに答えるミッションです。", hearts: 5 },
      { id: "vote", actionId: "event-vote", title: "今日の印象投票", description: "印象に残った体験を選ぶと、みんなの結果が見られます。", hearts: 5 },
      { id: "card", actionId: "event-card", title: "会場限定カード", description: "現地でしか受け取れないカードをコレクションに追加します。", hearts: 15, cardId: "card-factory-tour" }
    ],
    voteOptions: [
      { id: "process", label: "作る工程", count: 920 },
      { id: "smell", label: "甘い香り", count: 680 },
      { id: "history", label: "お菓子づくりの歴史", count: 540 },
      { id: "gift", label: "おみやげ", count: 730 }
    ]
  },
  parkBenefits: [
    "貯めたハートをWebコミュニティ側の体験に引き継ぐ",
    "診断結果やカードを保存できる",
    "みんなのコメントに参加できる",
    "限定記事やキャンペーンに出会える"
  ]
};




