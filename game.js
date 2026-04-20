'use strict';

// game state
const state = {
  totalRounds: 5,
  questionsPerRound: 3,
  voteSeconds: 60,
  players: [],
  nextPlayerId: 1,
  currentRound: 0,
  currentQuestion: 0,
  questionPool: [],
  questionIdx: 0,
  timerInterval: null
};

// utility
const $ = (id) => document.getElementById(id);

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function livingPlayers()       { return state.players.filter(p => p.alive); }
function livingConspirators()  { return state.players.filter(p => p.alive && p.isConspirator); }
function livingSenators()      { return state.players.filter(p => p.alive && !p.isConspirator); }

// setup screen
function renderPlayerList() {
  const list = $('player-list');
  list.innerHTML = '';
  if (state.players.length === 0) {
    const li = document.createElement('li');
    li.style.opacity = '0.6';
    li.style.justifyContent = 'center';
    li.textContent = 'No players yet. Add some above.';
    list.appendChild(li);
    return;
  }
  state.players.forEach(p => {
    const li = document.createElement('li');
    if (p.isConspirator) li.classList.add('conspirator');
    li.innerHTML = `
      <span>${escapeHtml(p.name)}</span>
      <span style="display:flex;gap:8px;align-items:center;">
        ${p.isConspirator ? '<span class="tag">CONSPIRATOR</span>' : '<span class="tag">SENATOR</span>'}
        <button data-id="${p.id}" class="remove-player">X</button>
      </span>
    `;
    list.appendChild(li);
  });
  list.querySelectorAll('.remove-player').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      state.players = state.players.filter(p => p.id !== id);
      renderPlayerList();
    });
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function addPlayerFromInputs() {
  const nameEl = $('new-player-name');
  const conspEl = $('new-player-conspirator');
  const name = nameEl.value.trim();
  if (!name) return;
  if (state.players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
    alert('That name is already taken.');
    return;
  }
  state.players.push({
    id: state.nextPlayerId++,
    name,
    isConspirator: conspEl.checked,
    alive: true
  });
  nameEl.value = '';
  conspEl.checked = false;
  nameEl.focus();
  renderPlayerList();
}

function startGame() {
  state.totalRounds = Math.max(1, Number($('setting-rounds').value) || 5);
  state.questionsPerRound = Math.max(1, Number($('setting-qpr').value) || 3);
  state.voteSeconds = Math.max(5, Number($('setting-timer').value) || 60);

  if (state.players.length < 3) {
    alert('Add at least 3 players to start.');
    return;
  }
  if (livingConspirators().length === 0) {
    alert('Mark at least one player as a conspirator before starting.');
    return;
  }
  if (livingConspirators().length >= livingSenators().length) {
    alert('Conspirators must be fewer than senators at the start of the game.');
    return;
  }

  state.questionPool = shuffle(QUESTIONS);
  state.questionIdx = 0;
  state.currentRound = 0;

  nextRound();
}

// round intro
function nextRound() {
  state.currentRound += 1;
  state.currentQuestion = 0;

  $('round-title').textContent = `ROUND ${state.currentRound}`;
  const roster = $('round-players');
  roster.innerHTML = '';
  state.players.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p.name;
    if (!p.alive) li.classList.add('exiled');
    roster.appendChild(li);
  });
  showScreen('round-screen');
}

// question
function nextQuestion() {
  state.currentQuestion += 1;
  if (state.currentQuestion > state.questionsPerRound) {
    startVoteTimer();
    return;
  }

  if (state.questionIdx >= state.questionPool.length) {
    state.questionPool = shuffle(QUESTIONS);
    state.questionIdx = 0;
  }
  const q = state.questionPool[state.questionIdx++];

  $('question-number').textContent =
    `ROUND ${state.currentRound} / QUESTION ${state.currentQuestion} OF ${state.questionsPerRound}`;
  $('question-text').textContent = q.text;

  const answersEl = $('answers');
  answersEl.innerHTML = '';
  const letters = ['A', 'B', 'C', 'D'];
  q.choices.forEach((choice, idx) => {
    const btn = document.createElement('button');
    btn.className = 'answer';
    btn.innerHTML = `<span class="letter">${letters[idx]}.</span>${escapeHtml(choice)}`;
    btn.addEventListener('click', () => answerClicked(btn, idx, q.correct));
    answersEl.appendChild(btn);
  });

  $('feedback').textContent = '';
  $('feedback').className = 'feedback';
  $('next-question-btn').classList.add('hidden');

  // pick random slam image or show placeholder
  const img = $('slam-image');
  const placeholder = $('slam-placeholder');
  if (typeof IMAGE_POOL !== 'undefined' && IMAGE_POOL.length > 0) {
    const src = IMAGE_POOL[Math.floor(Math.random() * IMAGE_POOL.length)];
    img.src = src;
    img.alt = '';
    placeholder.style.display = 'none';
  } else {
    img.removeAttribute('src');
    placeholder.style.display = '';
  }
  // restart slam animation
  [img, placeholder].forEach(el => {
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = '';
  });

  showScreen('question-screen');
}

function answerClicked(btn, chosenIdx, correctIdx) {
  const answerButtons = document.querySelectorAll('.answer');
  answerButtons.forEach(b => (b.disabled = true));
  answerButtons.forEach((b, i) => {
    if (i === correctIdx) b.classList.add('correct');
    else if (b === btn) b.classList.add('wrong');
    else b.classList.add('dim');
  });

  const fb = $('feedback');
  if (chosenIdx === correctIdx) {
    fb.textContent = 'RECTE! CORRECT';
    fb.classList.add('correct');
  } else {
    fb.textContent = 'FALSUM! WRONG';
    fb.classList.add('wrong');
  }
  $('next-question-btn').classList.remove('hidden');
}

// vote timer
function startVoteTimer() {
  const display = $('timer-display');
  let remaining = state.voteSeconds;
  display.textContent = remaining;
  display.classList.remove('urgent');

  showScreen('timer-screen');

  clearInterval(state.timerInterval);
  state.timerInterval = setInterval(() => {
    remaining -= 1;
    display.textContent = Math.max(remaining, 0);
    if (remaining <= 10) display.classList.add('urgent');
    if (remaining <= 0) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
      goToVote();
    }
  }, 1000);
}

function skipTimer() {
  clearInterval(state.timerInterval);
  state.timerInterval = null;
  goToVote();
}

// vote
function goToVote() {
  const list = $('vote-players');
  list.innerHTML = '';
  livingPlayers().forEach(p => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = p.name;
    btn.addEventListener('click', () => exilePlayer(p.id));
    li.appendChild(btn);
    list.appendChild(li);
  });
  showScreen('vote-screen');
}

// exile
function exilePlayer(id) {
  const p = state.players.find(x => x.id === id);
  if (!p || !p.alive) return;

  p.alive = false;

  $('exile-title').textContent = `${p.name.toUpperCase()} EXILED`;
  const msg = $('exile-message');
  msg.className = 'exile-msg';
  msg.textContent = `${p.name} has been casted out. Their allegiance remains unknown.`;

  // next step after continue
  $('continue-btn').onclick = () => {
    const verdict = checkWinCondition();
    if (verdict) {
      endGame(verdict);
    } else if (state.currentRound >= state.totalRounds) {
      // out of rounds resolve by survivors
      endGame(livingConspirators().length === 0 ? 'senators' : 'conspirators');
    } else {
      nextRound();
    }
  };

  showScreen('exile-screen');
}

function checkWinCondition() {
  const conspirators = livingConspirators().length;
  const senators = livingSenators().length;
  if (conspirators === 0) return 'senators';
  if (conspirators >= senators) return 'conspirators';
  return null;
}

// game over
function endGame(winner) {
  const title = $('gameover-title');
  const msg = $('gameover-message');
  if (winner === 'senators') {
    title.textContent = 'SENATE VICTORIOUS';
    msg.className = 'exile-msg senator';
    msg.textContent = 'Every conspirator has been unmasked and exiled. Rome endures!';
  } else {
    title.textContent = 'CONSPIRATORS WIN';
    msg.className = 'exile-msg conspirator';
    msg.textContent = 'The conspirators outnumber the senate. Rome falls into shadow.';
  }

  const reveal = $('gameover-reveal');
  reveal.innerHTML = '';
  state.players.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.name}: ${p.isConspirator ? 'CONSPIRATOR' : 'SENATOR'}${p.alive ? '' : ' (exiled)'}`;
    li.classList.add(p.isConspirator ? 'reveal-conspirator' : 'reveal-senator');
    if (!p.alive) li.classList.add('exiled');
    reveal.appendChild(li);
  });

  showScreen('gameover-screen');
}

function resetForNewGame() {
  // revive players and clear round state
  state.players.forEach(p => (p.alive = true));
  state.currentRound = 0;
  state.currentQuestion = 0;
  state.questionIdx = 0;
  renderPlayerList();
  showScreen('setup-screen');
}

// wire up events
document.addEventListener('DOMContentLoaded', () => {
  renderPlayerList();

  $('add-player-btn').addEventListener('click', addPlayerFromInputs);
  $('new-player-name').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addPlayerFromInputs(); }
  });

  $('start-game-btn').addEventListener('click', startGame);
  $('begin-round-btn').addEventListener('click', () => { state.currentQuestion = 0; nextQuestion(); });
  $('next-question-btn').addEventListener('click', nextQuestion);
  $('skip-timer-btn').addEventListener('click', skipTimer);
  $('play-again-btn').addEventListener('click', resetForNewGame);
});
