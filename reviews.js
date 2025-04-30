// Ваши данные Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBbfB3LneyMe06--61hDrtLEYV7foxLG38",
  authDomain: "minecraft-reviews-74933.firebaseapp.com",
  projectId: "minecraft-reviews-74933",
  storageBucket: "minecraft-reviews-74933.appspot.com",
  messagingSenderId: "600714681174",
  appId: "1:600714681174:web:03323ee1b918861f46d4f7",
  measurementId: "G-XNTX42X9VK"
};

// Инициализация Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Загружаем отзывы
async function loadReviews() {
  const list = document.getElementById("reviews-list");
  list.innerHTML = ""; // Очищаем список перед добавлением новых отзывов
  const querySnapshot = await db.collection("reviews").get();
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const el = document.createElement("div");
    el.classList.add("review");
    el.innerHTML = `
      <p class="review-text">${data.text}</p>
      <p class="review-author">Автор: ${data.author}</p>
      <button onclick="deleteReview('${doc.id}')">Удалить</button>
    `;
    list.appendChild(el);
  });
}

// Удаляем отзыв
async function deleteReview(id) {
  await db.collection("reviews").doc(id).delete();
  loadReviews(); // Перезагружаем отзывы
}

// Отправляем новый отзыв
document.getElementById("review-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = document.getElementById("text").value.trim();
  if (text) {
    // Отправляем отзыв с автором "Аноним"
    await db.collection("reviews").add({ author: "Аноним", text });
    document.getElementById("review-form").reset(); // Очищаем форму после отправки
    loadReviews(); // Перезагружаем отзывы
  }
});

window.onload = loadReviews; // Загружаем отзывы при загрузке страницы
window.deleteReview = deleteReview; // Делаем функцию удаления доступной в HTML
