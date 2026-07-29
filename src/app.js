(function () {
  const config = window.MINI_APP_CONFIG;
  const data = window.MINI_APP_DATA;
  const root = document.getElementById("app-root");

  const state = {
    activeView: "quiz",
    quizStep: 0,
    answers: {},
    quizResult: readJson(config.storageKeys.quizResult, null),
    vote: readJson(config.storageKeys.vote, null),
    cards: readJson(config.storageKeys.cards, []),
    oneWords: readJson(config.storageKeys.oneWords, []),
    hearts: readJson(config.storageKeys.hearts, 0),
    heartLedger: readJson(config.storageKeys.heartLedger, []),
    eventMissions: readJson(config.storageKeys.eventMissions, [])
  };

  const productById = new Map(data.products.map((product) => [product.id, product]));
  const resultEntries = Object.values(data.resultTypes);

  function todayKey() {
    const now = new Date();
    return [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("-");
  }

  function readJson(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  function getHeartRule(actionId) {
    return data.heartRules.find((rule) => rule.id === actionId);
  }

  function awardHearts(actionId) {
    const rule = getHeartRule(actionId);
    if (!rule) return 0;
    const key = `${actionId}-${todayKey()}`;
    if (state.heartLedger.includes(key)) return 0;
    state.hearts += rule.hearts;
    state.heartLedger.unshift(key);
    writeJson(config.storageKeys.hearts, state.hearts);
    writeJson(config.storageKeys.heartLedger, state.heartLedger);
    return rule.hearts;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function productName(productId) {
    return productById.get(productId)?.name || "おやつ商品";
  }

  function productImage(productId) {
    return productById.get(productId)?.image || data.products[0].image;
  }

  function renderProductShelf() {
    return `
      <div class="product-shelf" aria-label="おやつ商品">
        ${data.products.map((product) => `
          <article class="product-tile product-tile--${escapeHtml(product.id)}">
            <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
            <div>
              <strong>${escapeHtml(product.name)}</strong>
              <span>${escapeHtml(product.category)}</span>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  function gachaStorageKey() {
    return config.storageKeys.gachaPrefix + todayKey();
  }

  function getTodayCard() {
    return readJson(gachaStorageKey(), null);
  }

  function addCard(card) {
    if (!card || state.cards.some((item) => item.id === card.id)) return;
    state.cards.unshift(card);
    writeJson(config.storageKeys.cards, state.cards);
  }

  function setTodayCard(card) {
    writeJson(gachaStorageKey(), card);
    addCard(card);
  }

  function isEventMissionDone(missionId) {
    return state.eventMissions.includes(`${missionId}-${todayKey()}`);
  }

  function completeEventMission(missionId) {
    const mission = data.eventCampaign.missions.find((item) => item.id === missionId);
    if (!mission || isEventMissionDone(missionId)) return;
    state.eventMissions.unshift(`${missionId}-${todayKey()}`);
    writeJson(config.storageKeys.eventMissions, state.eventMissions);
    if (mission.cardId) {
      addCard(data.cards.find((card) => card.id === mission.cardId));
    }
    awardHearts(mission.actionId);
    render();
  }

  function render() {
    root.className = "app-shell";
    root.innerHTML = `
      <div class="app-frame">
        ${renderLineChrome()}
        ${renderTopbar()}
        <section class="view ${state.activeView === "quiz" ? "is-active" : ""}" data-view="quiz">${renderQuiz()}</section>
        <section class="view ${state.activeView === "voice" ? "is-active" : ""}" data-view="voice">${renderVoice()}</section>
        <section class="view ${state.activeView === "collection" ? "is-active" : ""}" data-view="collection">${renderCollection()}</section>
        <section class="view ${state.activeView === "event" ? "is-active" : ""}" data-view="event">${renderEvent()}</section>
        ${renderBottomNav()}
      </div>
    `;
    bindEvents();
  }

  function renderLineChrome() {
    return `
      <header class="line-chrome" aria-label="LINEアプリの上部バー">
        <button class="chrome-button" type="button" aria-label="戻る">‹</button>
        <div class="chrome-title">
          <strong>LINE</strong>
          <span>${escapeHtml(config.brandLabel)}</span>
        </div>
        <button class="chrome-button" type="button" aria-label="閉じる">×</button>
      </header>
    `;
  }

  function renderTopbar() {
    return `
      <header class="topbar">
        <div class="brand">
          <p class="brand__eyebrow">${escapeHtml(config.lineChannelLabel)}</p>
          <h1 class="brand__title">${escapeHtml(config.brandLabel)}</h1>
        </div>
        <button class="heart-button" type="button" data-view-button="collection" aria-label="ハート残高を見る"><span>♡</span><strong>${state.hearts}</strong></button>
      </header>
    `;
  }

  function renderResultCard(result, origin) {
    const product = productById.get(result.productId);
    return `
      <section class="section result-panel result-panel--${escapeHtml(product.id)}">
        <div class="result-product">
          <span>${escapeHtml(product.category)}</span>
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}">
        </div>
        <div class="result-copy">
          <span class="hero-label hero-label--red">あなたの今日のタイプ</span>
          <h2>${escapeHtml(result.title)}</h2>
          <p>${escapeHtml(result.catch)}</p>
          <p>${escapeHtml(result.suggestion)}</p>
          <div class="ratio-bar" aria-label="同じタイプの人 ${result.ratio}%">
            <span style="width:${result.ratio}%"></span>
          </div>
          <small>今日、同じタイプの人は ${escapeHtml(result.ratio)}%</small>
          <div class="result-actions">
            <button class="btn btn--primary" type="button" data-view-button="voice">みんなの声を見る</button>
            <button class="btn" type="button" data-run-gacha>${getTodayCard() ? "今日のカードを見る" : "カードを引く +8ハート"}</button>
          </div>
        </div>
      </section>
    `;
  }

  function renderQuiz() {
    if (state.quizResult) {
      return `
        ${renderResultCard(data.resultTypes[state.quizResult.id], "quiz")}
        <section class="section">
          <button class="btn btn--block" type="button" data-reset-quiz>診断をやり直す</button>
        </section>
      `;
    }

    const question = data.quizQuestions[state.quizStep];
    const progress = Math.round(((state.quizStep + 1) / data.quizQuestions.length) * 100);
    return `
      <section class="section quiz-intro">
        <div class="quiz-intro__copy">
          <span class="hero-label hero-label--red">Snack mood finder</span>
          <h2>今日の気分に合うおやつを見つけよう</h2>
          <p>3つの質問に答えるだけ。診断結果、みんなの投票、カード集めでハートが貯まります。</p>
        </div>
        ${renderProductShelf()}
        <div class="heart-teaser">
          <span>♡</span>
          <strong>診断完了で +10ハート</strong>
          <small>貯めたハートはWebコミュニティへ</small>
        </div>
      </section>
      <section class="section quiz-panel">
        <div class="progress-line"><span style="width:${progress}%"></span></div>
        <span class="section__meta">${state.quizStep + 1} / ${data.quizQuestions.length}</span>
        <h2>${escapeHtml(question.title)}</h2>
        <div class="answer-list">
          ${question.options.map((option) => `
            <button class="answer-button" type="button" data-answer="${escapeHtml(option.id)}">
              ${escapeHtml(option.label)}
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderVoice() {
    const total = data.dailyVote.options.reduce((sum, item) => sum + item.count + (state.vote === item.id ? 1 : 0), 0);
    const comments = [...state.oneWords, ...data.oneWords];
    return `
      <section class="section vote-panel">
        <span class="hero-label hero-label--red">みんなの気分</span>
        <h2>${escapeHtml(data.dailyVote.title)}</h2>
        <p>${escapeHtml(data.dailyVote.body)}</p>
        <div class="vote-options">
          ${data.dailyVote.options.map((option) => {
            const count = option.count + (state.vote === option.id ? 1 : 0);
            const pct = Math.round((count / total) * 100);
            return `
              <button class="vote-option ${state.vote === option.id ? "is-selected" : ""}" type="button" data-vote="${escapeHtml(option.id)}">
                <span>${escapeHtml(option.label)}</span>
                <strong>${pct}%</strong>
                <i style="width:${pct}%"></i>
              </button>
            `;
          }).join("")}
        </div>
      </section>
      <section class="section word-panel">
        <div class="section__head">
          <h2 class="section__title">みんなのひとこと</h2>
          <span class="section__meta">20文字くらいで気軽に</span>
        </div>
        <form class="oneword-form" data-oneword-form>
          <input type="text" name="text" maxlength="28" placeholder="例: 今日はチョコスティック気分" aria-label="ひとことを入力">
          <button class="btn btn--primary" type="submit">送る</button>
        </form>
        <div class="word-list">
          ${comments.slice(0, 6).map((item) => `
            <article>
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(item.text)}</span>
            </article>
          `).join("")}
        </div>
      </section>
      <section class="section park-panel compact">
        <h2>もっと会話に参加する</h2>
        <p>コメントや限定企画はWebコミュニティで広がります。</p><div class="park-heart-line"><strong>${state.hearts}</strong><span>ハートを保持中</span></div><button class="btn btn--primary btn--block" type="button" data-park-link>${escapeHtml(config.parkLink.label)}</button>
      </section>
    `;
  }

  function renderCollection() {
    const todayCard = getTodayCard();
    const ownedIds = new Set(state.cards.map((card) => card.id));
    return `
      <section class="section collection-hero">
        <span class="hero-label hero-label--red">コレクション</span>
        <h2>${state.hearts} ハート / カード ${state.cards.length}枚</h2><p>毎日1枚ずつ。カードとハートを集めるほど、Webコミュニティへ進む理由が増えていきます。</p>
        ${renderProductShelf()}
        <button class="btn btn--primary btn--block" type="button" data-run-gacha>${todayCard ? "今日のカードを見る" : "今日のカードを引く +8ハート"}</button>
      </section>
      <section class="section card-grid">
        ${data.cards.map((card) => {
          const owned = ownedIds.has(card.id);
          return `
            <article class="collect-card ${owned ? "is-owned" : "is-locked"}">
              <img src="${escapeHtml(productImage(card.productId))}" alt="${escapeHtml(productName(card.productId))}">
              <div>
                <span>${escapeHtml(card.rarity)}</span>
                <h3>${owned ? escapeHtml(card.title) : "未開放カード"}</h3>
                <p>${escapeHtml(card.hint)}</p>
              </div>
            </article>
          `;
        }).join("")}
      </section>
      <section class="section park-panel">
        <h2>${escapeHtml(config.copy.parkTitle)}</h2><div class="park-heart-line"><strong>${state.hearts}</strong><span>ハートを保持中</span></div><div class="benefit-list">
          ${data.parkBenefits.map((benefit) => `<span>${escapeHtml(benefit)}</span>`).join("")}
        </div>
        <button class="btn btn--primary btn--block" type="button" data-park-link>${escapeHtml(config.parkLink.label)}</button>
      </section>
    `;
  }

  function renderEvent() {
    const completedCount = data.eventCampaign.missions.filter((mission) => isEventMissionDone(mission.id)).length;
    const totalHearts = data.eventCampaign.missions.reduce((sum, mission) => sum + mission.hearts, 0);
    const voteTotal = data.eventCampaign.voteOptions.reduce((sum, option) => sum + option.count + (isEventMissionDone("vote") && option.id === "process" ? 1 : 0), 0);
    return `
      <section class="section event-hero">
        <div class="event-hero__copy">
          <span class="hero-label hero-label--red">LINEタッチ入口</span>
          <h2>${escapeHtml(data.eventCampaign.title)}</h2>
          <p>${escapeHtml(data.eventCampaign.body)}</p>
        </div>
        <div class="event-ticket" aria-label="LINEタッチ会場チケット">
          <span>LINE<br>TOUCH</span>
          <i></i><i></i><i></i><i></i>
        </div>
        <div class="event-summary">
          <span>${escapeHtml(data.eventCampaign.venue)}</span>
          <strong>${completedCount} / ${data.eventCampaign.missions.length} 完了</strong>
          <strong>最大 +${totalHearts}ハート</strong>
        </div>
      </section>
      <section class="section mission-list">
        ${data.eventCampaign.missions.map((mission) => {
          const done = isEventMissionDone(mission.id);
          return `
            <article class="mission-card ${done ? "is-done" : ""}">
              <div>
                <span>${done ? "完了" : `+${mission.hearts}ハート`}</span>
                <h3>${escapeHtml(mission.title)}</h3>
                <p>${escapeHtml(mission.description)}</p>
              </div>
              <button class="btn ${done ? "" : "btn--primary"}" type="button" data-event-mission="${escapeHtml(mission.id)}" ${done ? "disabled" : ""}>
                ${done ? "受取済み" : "受け取る"}
              </button>
            </article>
          `;
        }).join("")}
      </section>
      <section class="section event-vote-panel">
        <div class="section__head">
          <h2 class="section__title">会場のみんなの印象</h2>
          <span class="section__meta">投票後に結果を表示</span>
        </div>
        <div class="event-vote-list">
          ${data.eventCampaign.voteOptions.map((option) => {
            const count = option.count + (isEventMissionDone("vote") && option.id === "process" ? 1 : 0);
            const pct = Math.round((count / voteTotal) * 100);
            return `
              <div>
                <span>${escapeHtml(option.label)}</span>
                <strong>${pct}%</strong>
                <i style="width:${pct}%"></i>
              </div>
            `;
          }).join("")}
        </div>
      </section>
      <section class="section park-panel">
        <h2>会場の続きはWebコミュニティへ</h2>
        <p>来場で受け取ったハートと限定カードをきっかけに、帰宅後もWebコミュニティで続きを楽しめます。</p>
        <div class="park-heart-line"><strong>${state.hearts}</strong><span>ハートを保持中</span></div>
        <button class="btn btn--primary btn--block" type="button" data-park-link>${escapeHtml(config.parkLink.label)}</button>
      </section>
    `;
  }
  function renderBottomNav() {
    return `
      <nav class="bottom-nav" aria-label="メイン">
        <ul class="bottom-nav__list">
          ${config.navigation.map((item) => `
            <li>
              <button class="nav-button ${state.activeView === item.id ? "is-active" : ""}" type="button" data-view-button="${escapeHtml(item.id)}">
                <span aria-hidden="true">${escapeHtml(item.icon)}</span>
                <span>${escapeHtml(item.label)}</span>
              </button>
            </li>
          `).join("")}
        </ul>
      </nav>
    `;
  }

  function selectAnswer(optionId) {
    const question = data.quizQuestions[state.quizStep];
    const option = question.options.find((item) => item.id === optionId);
    state.answers[question.id] = option;
    if (state.quizStep < data.quizQuestions.length - 1) {
      state.quizStep += 1;
      render();
      return;
    }
    const scores = {};
    Object.values(state.answers).forEach((answer) => {
      Object.entries(answer.scores).forEach(([id, score]) => {
        scores[id] = (scores[id] || 0) + score;
      });
    });
    const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "chocoStick";
    state.quizResult = { id: winner, completedAt: new Date().toISOString() };
    writeJson(config.storageKeys.quizResult, state.quizResult);
    awardHearts("quiz");
    render();
  }

  function drawCard() {
    const existing = getTodayCard();
    if (existing) {
      state.activeView = "collection";
      render();
      return;
    }
    const resultId = state.quizResult?.id;
    const preferred = data.cards.find((card) => card.productId === resultId && !state.cards.some((owned) => owned.id === card.id));
    const fallback = data.cards.find((card) => !state.cards.some((owned) => owned.id === card.id)) || data.cards[Math.floor(Math.random() * data.cards.length)];
    setTodayCard(preferred || fallback);
    awardHearts("card");
    state.activeView = "collection";
    render();
  }

  function bindEvents() {
    document.querySelectorAll("[data-view-button]").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeView = button.dataset.viewButton;
        render();
      });
    });

    document.querySelectorAll("[data-start-quiz]").forEach((button) => {
      button.addEventListener("click", () => {
        state.quizStep = 0;
        state.answers = {};
        state.quizResult = null;
        window.localStorage.removeItem(config.storageKeys.quizResult);
        state.activeView = "quiz";
        render();
      });
    });

    document.querySelectorAll("[data-answer]").forEach((button) => {
      button.addEventListener("click", () => selectAnswer(button.dataset.answer));
    });

    document.querySelectorAll("[data-reset-quiz]").forEach((button) => {
      button.addEventListener("click", () => {
        state.quizStep = 0;
        state.answers = {};
        state.quizResult = null;
        window.localStorage.removeItem(config.storageKeys.quizResult);
        render();
      });
    });

    document.querySelectorAll("[data-vote]").forEach((button) => {
      button.addEventListener("click", () => {
        state.vote = button.dataset.vote;
        writeJson(config.storageKeys.vote, state.vote);
        awardHearts("vote");
        render();
      });
    });

    document.querySelectorAll("[data-run-gacha]").forEach((button) => {
      button.addEventListener("click", drawCard);
    });

    document.querySelectorAll("[data-event-mission]").forEach((button) => {
      button.addEventListener("click", () => completeEventMission(button.dataset.eventMission));
    });

    document.querySelectorAll("[data-park-link]").forEach((button) => {
      button.addEventListener("click", () => {
        if (!config.parkLink.url) {
          window.alert(config.parkLink.unavailableMessage);
          return;
        }
        window.open(config.parkLink.url, "_blank", "noopener");
      });
    });

    const form = document.querySelector("[data-oneword-form]");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const text = String(formData.get("text") || "").trim();
        if (!text) return;
        state.oneWords.unshift({ name: config.user.displayName, text });
        writeJson(config.storageKeys.oneWords, state.oneWords);
        awardHearts("oneword");
        render();
      });
    }
  }

  render();
})();











