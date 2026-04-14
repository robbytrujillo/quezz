let questions = [];
let editIndex = -1;

/* ======================
   SIMPAN SOAL
====================== */
function saveQuestion() {
  let question = document.getElementById("question").value;
  let A = document.getElementById("optionA").value;
  let B = document.getElementById("optionB").value;
  let C = document.getElementById("optionC").value;
  let D = document.getElementById("optionD").value;
  let answer = document.getElementById("answerKey").value;

  if (!question || !A || !B || !C || !D) {
    alert("Semua field wajib diisi!");
    return;
  }

  let data = {
    question,
    options: { A, B, C, D },
    answer,
  };

  if (editIndex === -1) {
    questions.push(data);
  } else {
    questions[editIndex] = data;
    editIndex = -1;
    document.getElementById("formTitle").innerText = "Tambah Soal";
  }

  clearForm();
  renderQuestions();
  renderQuiz();
}

/* ======================
   CLEAR FORM
====================== */
function clearForm() {
  document.getElementById("question").value = "";
  document.getElementById("optionA").value = "";
  document.getElementById("optionB").value = "";
  document.getElementById("optionC").value = "";
  document.getElementById("optionD").value = "";
}

/* ======================
   RENDER LIST SOAL
====================== */
function renderQuestions() {
  let list = document.getElementById("questionList");
  list.innerHTML = "";

  questions.forEach((q, index) => {
    list.innerHTML += `
            <div class="question-item">
                <h4>${index + 1}. ${q.question}</h4>
                <div class="option-list">
                    <div>A. ${q.options.A}</div>
                    <div>B. ${q.options.B}</div>
                    <div>C. ${q.options.C}</div>
                    <div>D. ${q.options.D}</div>
                    <div><strong>Kunci Jawaban: ${q.answer}</strong></div>
                </div>
                <button class="btn-warning" onclick="editQuestion(${index})">Edit</button>
                <button class="btn-danger" onclick="deleteQuestion(${index})">Hapus</button>
            </div>
        `;
  });
}

/* ======================
   EDIT SOAL
====================== */
function editQuestion(index) {
  let q = questions[index];

  document.getElementById("question").value = q.question;
  document.getElementById("optionA").value = q.options.A;
  document.getElementById("optionB").value = q.options.B;
  document.getElementById("optionC").value = q.options.C;
  document.getElementById("optionD").value = q.options.D;
  document.getElementById("answerKey").value = q.answer;

  editIndex = index;
  document.getElementById("formTitle").innerText = "Edit Soal";
}

/* ======================
   HAPUS SOAL
====================== */
function deleteQuestion(index) {
  if (confirm("Yakin ingin menghapus soal ini?")) {
    questions.splice(index, 1);
    renderQuestions();
    renderQuiz();
  }
}

/* ======================
   RENDER QUIZ
====================== */
function renderQuiz() {
  let form = document.getElementById("quizForm");
  form.innerHTML = "";

  questions.forEach((q, index) => {
    form.innerHTML += `
            <div class="quiz-question">
                <h4>${index + 1}. ${q.question}</h4>
                <div class="quiz-options">
                    <label><input type="radio" name="q${index}" value="A"> A. ${q.options.A}</label>
                    <label><input type="radio" name="q${index}" value="B"> B. ${q.options.B}</label>
                    <label><input type="radio" name="q${index}" value="C"> C. ${q.options.C}</label>
                    <label><input type="radio" name="q${index}" value="D"> D. ${q.options.D}</label>
                </div>
            </div>
        `;
  });
}

/* ======================
   SUBMIT QUIZ
====================== */
function submitQuiz() {
  let score = 0;

  questions.forEach((q, index) => {
    let selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  document.getElementById("result").innerHTML =
    `Skor Anda: ${score} / ${questions.length}`;
}

/* ======================
   DATA AWAL CONTOH
====================== */
questions.push({
  question: "Siapa wakil presiden republik indonesia sekarang?",
  options: {
    A: "Bahlil",
    B: "Roy Suryo",
    C: "Gibran Rankabuming",
    D: "Raffi Ahmad",
  },
  answer: "C",
});

renderQuestions();
renderQuiz();
