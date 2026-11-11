// 問題データ
const questions = [
  {
    question: '日本で一番面積が大きい都道府県はどこ？',
    choices: ['北海道', '岩手県', '長野県', '福島県'],
    answer: 0,
    explanation: '北海道は日本の面積の約5分の1を占めています。'
  },
  {
    question: '水が氷になる温度は、1気圧のもとで何℃？',
    choices: ['-10℃', '0℃', '4℃', '10℃'],
    answer: 1,
    explanation: '水は1気圧のもとで0℃で凍ります。'
  },
  {
    question: '1年のうち、昼の長さが最も長い日は？',
    choices: ['春分の日', '夏至', '秋分の日', '冬至'],
    answer: 1,
    explanation: '北半球では夏至に昼の長さが最も長くなります。'
  },
  {
    question: '「吾輩は猫である」を書いた作家は？',
    choices: ['芥川龍之介', '太宰治', '夏目漱石', '森鷗外'],
    answer: 2,
    explanation: '「吾輩は猫である」は夏目漱石のデビュー作です。'
  },
  {
    question: '世界で最も人口の多い大陸はどこ？',
    choices: ['アフリカ', 'ヨーロッパ', '北アメリカ', 'アジア'],
    answer: 3,
    explanation: 'アジアは世界人口の約6割が暮らす大陸です。'
  },
  {
    question: '光合成で植物が吸収する気体はどれ？',
    choices: ['酸素', '二酸化炭素', '窒素', '水素'],
    answer: 1,
    explanation: '植物は二酸化炭素と水から、光のエネルギーで養分を作り、酸素を出します。'
  },
  {
    question: '日本の国会で、衆議院の議員の任期は何年？',
    choices: ['3年', '4年', '5年', '6年'],
    answer: 1,
    explanation: '衆議院議員の任期は4年で、解散があるとその時点で終わります。'
  },
  {
    question: 'サッカーで、1チームがピッチに出られる選手は何人？',
    choices: ['9人', '10人', '11人', '12人'],
    answer: 2,
    explanation: 'サッカーは1チーム11人（ゴールキーパー含む）で行います。'
  },
  {
    question: '1キロメートルは何メートル？',
    choices: ['10メートル', '100メートル', '1000メートル', '10000メートル'],
    answer: 2,
    explanation: '「キロ」は1000倍を表すので、1キロメートルは1000メートルです。'
  },
  {
    question: '太陽系で最も大きい惑星はどれ？',
    choices: ['地球', '土星', '火星', '木星'],
    answer: 3,
    explanation: '木星は太陽系最大の惑星で、地球の約11倍の直径があります。'
  }
];

let currentIndex = 0;
let score = 0;

const quizEl = document.getElementById('quiz');
const resultEl = document.getElementById('result');
const progressEl = document.getElementById('progress');
const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next');
const scoreEl = document.getElementById('score');
const commentEl = document.getElementById('comment');
const retryBtn = document.getElementById('retry');

// 問題を表示する
const showQuestion = () => {
  const q = questions[currentIndex];
  progressEl.textContent = `第${currentIndex + 1}問 / 全${questions.length}問`;
  questionEl.textContent = q.question;
  feedbackEl.textContent = '';
  feedbackEl.className = 'feedback';
  nextBtn.hidden = true;
  choicesEl.innerHTML = '';

  q.choices.forEach((choice, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'choice-btn';
    btn.textContent = choice;
    btn.addEventListener('click', () => selectChoice(i));
    li.appendChild(btn);
    choicesEl.appendChild(li);
  });
};

// 選択肢が選ばれたときの処理
const selectChoice = (selected) => {
  const q = questions[currentIndex];
  const buttons = choicesEl.querySelectorAll('.choice-btn');
  buttons.forEach((btn) => { btn.disabled = true; });
  buttons[q.answer].classList.add('correct');

  if (selected === q.answer) {
    score++;
    feedbackEl.textContent = `⭕ 正解！ ${q.explanation}`;
    feedbackEl.classList.add('correct');
  } else {
    buttons[selected].classList.add('wrong');
    feedbackEl.textContent = `❌ 不正解… 正解は「${q.choices[q.answer]}」。${q.explanation}`;
    feedbackEl.classList.add('wrong');
  }

  nextBtn.textContent = currentIndex === questions.length - 1 ? '結果を見る' : '次へ';
  nextBtn.hidden = false;
};

// 結果を表示する
const showResult = () => {
  quizEl.hidden = true;
  resultEl.hidden = false;
  scoreEl.textContent = `${questions.length}問中${score}問正解`;
  if (score === questions.length) {
    commentEl.textContent = '全問正解！素晴らしい！';
  } else if (score >= questions.length * 0.6) {
    commentEl.textContent = 'よくできました！';
  } else {
    commentEl.textContent = 'もう少し頑張ろう！';
  }
};

nextBtn.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

retryBtn.addEventListener('click', () => {
  currentIndex = 0;
  score = 0;
  resultEl.hidden = true;
  quizEl.hidden = false;
  showQuestion();
});

showQuestion();
