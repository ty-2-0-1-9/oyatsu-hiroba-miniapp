window.MINI_APP_CONFIG = {
  appName: "今日のおやつひろば",
  brandLabel: "今日のおやつひろば",
  lineChannelLabel: "おやつ体験コミュニティ",
  user: {
    displayName: "ゲストさん",
    memberRank: "おやつビギナー",
    initials: "OY"
  },
  copy: {
    heroTitle: "今日の気分から、ぴったりのおやつ時間を見つけよう",
    heroBody: "診断、みんなの投票、ひとこと投稿を楽しむほどハートが貯まります。貯まったハートはWebコミュニティで活用できます。",
    primaryCta: "診断をはじめる",
    voteTitle: "今日のみんな投票",
    voteBody: "投票すると、みんなの選び方が見られてハートも貯まります。",
    eventTitle: "体験チェックイン",
    eventBody: "施設やイベント会場のLINEタッチから入ると、体験カードとハートが受け取れます。",
    parkTitle: "貯まったハートをWebコミュニティで使う",
    parkBody: "ミニアプリで貯めたハートは、Webコミュニティで結果保存、コメント参加、限定コンテンツにつながります。"
  },
  navigation: [
    { id: "quiz", label: "診断", icon: "◇" },
    { id: "voice", label: "みんな", icon: "□" },
    { id: "collection", label: "カード", icon: "◎" },
    { id: "event", label: "体験", icon: "●" }
  ],
  liff: {
    enabled: false,
    liffId: "",
    endpointHint: "https://example.com/line-miniapp/"
  },
  storageKeys: {
    quizResult: "oyatsu-hiroba-v2-quiz-result",
    vote: "oyatsu-hiroba-v2-vote",
    cards: "oyatsu-hiroba-v2-cards",
    oneWords: "oyatsu-hiroba-v2-one-words",
    hearts: "oyatsu-hiroba-v2-hearts",
    heartLedger: "oyatsu-hiroba-v2-heart-ledger",
    eventMissions: "oyatsu-hiroba-v2-event-missions"
  },
  parkLink: {
    label: "Webコミュニティを見る",
    url: "",
    unavailableMessage: "Webコミュニティとの接続先は準備中です。"
  }
};
