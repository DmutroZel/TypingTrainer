import React, { useState, useEffect } from 'react';

export default function TypingTrainer() {
  const words = [
    'програма', 'компютер', 'клавіатура', 'миша', 'екран', 'файл',
    'папка', 'інтернет', 'сайт', 'браузер', 'код', 'функція',
    'змінна', 'масив', 'об\'єкт', 'метод', 'клас', 'компонент',
    'алгоритм', 'процесор', 'оперативка', 'пам\'ять', 'сервер', 'мережа',
    'вебсайт', 'модем', 'провайдер', 'база', 'дані', 'інтерфейс',
    'логіка', 'система', 'операція', 'протокол', 'редактор', 'компілятор',
    'бібліотека', 'термінал', 'консоль', 'хостинг', 'домен', 'завантаження',
    'прошивка', 'графіка', 'відеокарта', 'проєкт', 'мова', 'структура',
    'аналітика', 'безпека', 'фреймворк', 'індексація', 'пошта', 'вкладка',
    'гіперпосилання', 'шрифт', 'адмін', 'пароль', 'користувач', 'обліковка',
    'платформа', 'мобільний', 'додаток', 'тестування', 'дебаг', 'хеш',
    'запит', 'відповідь', 'сертифікат', 'проксі', 'антивірус', 'файлова',
    'команда', 'виконання', 'клік', 'курсор', 'монітор', 'аккаунт',
    'реєстрація', 'завантажити', 'налаштування', 'сховище', 'дані', 'введення',
    'виведення', 'шифрування', 'оптимізація', 'аналітика', 'робот', 'скрипт',
    'автоматизація', 'потік', 'прогрес', 'сторінка', 'фрейм', 'кодекс'
  ];

  const [currentWord, setCurrentWord] = useState('');
  // Стан для тексту, який ввів користувач
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    // Генерує перше слово
    generateRandomWord();
  }, []); 

  const generateRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setUserInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key.length > 1 && e.key !== 'Backspace') return;

    if (e.key === 'Backspace') {
      // При натисканні Backspace видаляємо останній символ із введення
      setUserInput((prev) => prev.slice(0, -1));
    } else {
      // Додаємо натиснуту клавішу до введення
      const newInput = userInput + e.key;
      setUserInput(newInput);

      // Якщо введене слово співпадає з поточним
      if (newInput === currentWord) {
        setTimeout(() => {
          generateRandomWord();
        }, 500);
      }
    }
  };

  // Функція для рендерингу слова з позначенням правильних/неправильних літер
  const renderWord = () => {
    // Розбиваємо поточне слово на літери
    return currentWord.split('').map((letter, index) => {
      let className = 'letter ';

      if (index < userInput.length) {
        className += userInput[index] === letter ? 'correct' : 'incorrect';
      } else if (index === userInput.length) {
        className += 'current';
      }

      return (
        <span key={index} className={className}>
          {letter}
        </span>
      );
    });
  };

  return (
    <div
      className="typing-trainer"
      tabIndex={0} // Дозволяє фокусуватися на елементі
      onKeyDown={handleKeyDown} 
      style={{ outline: 'none' }} 
    >
      <div className="container">
        <h1>🖥️ Тренажер Друку</h1>
        
        <div className="instructions">
          <p>Натисніть на цю область та почніть друкувати слово:</p>
        </div>

        <div className="word-display">
          {renderWord()}
        </div>

        <div className="input-info">
          <p>Ваш ввід: <span className="user-input">{userInput}</span></p>
          <p>Прогрес: {userInput.length} / {currentWord.length}</p>
        </div>

       
        <div className="stats">
          {userInput === currentWord && (
            <div className="success-message">
              ✅ Відмінно! Генерую нове слово...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}