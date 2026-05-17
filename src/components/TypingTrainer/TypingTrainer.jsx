import React, { useState, useEffect } from 'react';

export default function TypingTrainer() {
  const wordLists = {
    english: [
      'program', 'computer', 'keyboard', 'mouse', 'screen', 'file',
      'folder', 'internet', 'website', 'browser', 'code', 'function',
      'variable', 'array', 'object', 'method', 'class', 'component',
      'algorithm', 'processor', 'memory', 'server', 'network', 'database',
      'data', 'interface', 'logic', 'system', 'operation', 'protocol',
      'editor', 'compiler', 'library', 'terminal', 'console', 'hosting',
      'domain', 'download', 'firmware', 'graphics', 'video', 'project',
      'language', 'structure', 'analytics', 'security', 'framework', 'indexing',
      'email', 'tab', 'hyperlink', 'font', 'admin', 'password',
      'user', 'account', 'platform', 'mobile', 'application', 'testing',
      'debug', 'hash', 'request', 'response', 'certificate', 'proxy',
      'antivirus', 'command', 'execution', 'click', 'cursor', 'monitor',
      'registration', 'settings', 'storage', 'input', 'output', 'encryption',
      'optimization', 'robot', 'script', 'automation', 'stream', 'progress',
      'page', 'frame', 'code', 'api', 'cloud', 'backup'
    ],
    spanish: [
      'programa', 'computadora', 'teclado', 'ratón', 'pantalla', 'archivo',
      'carpeta', 'internet', 'sitio web', 'navegador', 'código', 'función',
      'variable', 'matriz', 'objeto', 'método', 'clase', 'componente',
      'algoritmo', 'procesador', 'memoria', 'servidor', 'red', 'base',
      'datos', 'interfaz', 'lógica', 'sistema', 'operación', 'protocolo',
      'editor', 'compilador', 'biblioteca', 'terminal', 'consola', 'alojamiento',
      'dominio', 'descarga', 'firmware', 'gráficos', 'video', 'proyecto',
      'idioma', 'estructura', 'analítica', 'seguridad', 'marco', 'indexación',
      'correo', 'pestaña', 'hipervínculo', 'fuente', 'administrador', 'contraseña',
      'usuario', 'cuenta', 'plataforma', 'móvil', 'aplicación', 'prueba',
      'depuración', 'hash', 'solicitud', 'respuesta', 'certificado', 'proxy',
      'antivirus', 'comando', 'ejecución', 'clic', 'cursor', 'monitor',
      'registro', 'configuración', 'almacenamiento', 'entrada', 'salida', 'encriptación',
      'optimización', 'robot', 'script', 'automatización', 'corriente', 'progreso',
      'página', 'fotograma', 'código', 'api', 'nube', 'respaldo'
    ]
  };

  const translations = {
    english: {
      title: '🖥️ Typing Trainer',
      instructions: 'Click on this area and start typing the word:',
      yourInput: 'Your input:',
      progress: 'Progress:',
      successMessage: '✅ Excellent! Generating new word...',
      selectLanguage: '🌍 Select Language',
      english: 'English',
      spanish: 'Español'
    },
    spanish: {
      title: '🖥️ Entrenador de Mecanografía',
      instructions: 'Haz clic en esta área y comienza a escribir la palabra:',
      yourInput: 'Tu entrada:',
      progress: 'Progreso:',
      successMessage: '✅ ¡Excelente! Generando nueva palabra...',
      selectLanguage: '🌍 Seleccionar idioma',
      english: 'English',
      spanish: 'Español'
    }
  };

  const [language, setLanguage] = useState('english');
  const [isLanguageSelected, setIsLanguageSelected] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (isLanguageSelected) {
      generateRandomWord();
    }
  }, [isLanguageSelected, language]);

  const generateRandomWord = () => {
    const words = wordLists[language];
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    setUserInput('');
  };

  const handleLanguageSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setIsLanguageSelected(true);
  };

  const handleKeyDown = (e) => {
    if (e.key.length > 1 && e.key !== 'Backspace') return;

    if (e.key === 'Backspace') {
      setUserInput((prev) => prev.slice(0, -1));
    } else {
      const newInput = userInput + e.key;
      setUserInput(newInput);

      if (newInput === currentWord) {
        setTimeout(() => {
          generateRandomWord();
        }, 500);
      }
    }
  };


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
      tabIndex={0}
      onKeyDown={isLanguageSelected ? handleKeyDown : undefined}
      style={{ outline: 'none' }}
    >
      {!isLanguageSelected ? (
        <div className="container">
          <h1>{translations[language].selectLanguage}</h1>
          <div className="language-selection">
            <button
              className="language-button"
              onClick={() => handleLanguageSelect('english')}
            >
              🇬🇧 {translations.english.english}
            </button>
            <button
              className="language-button"
              onClick={() => handleLanguageSelect('spanish')}
            >
              🇪🇸 {translations.spanish.spanish}
            </button>
          </div>
        </div>
      ) : (
        <div className="container">
          <h1>{translations[language].title}</h1>

          <div className="instructions">
            <p>{translations[language].instructions}</p>
          </div>

          <div className="word-display">
            {renderWord()}
          </div>

          <div className="input-info">
            <p>{translations[language].yourInput} <span className="user-input">{userInput}</span></p>
            <p>{translations[language].progress} {userInput.length} / {currentWord.length}</p>
          </div>

          <div className="stats">
            {userInput === currentWord && (
              <div className="success-message">
                {translations[language].successMessage}
              </div>
            )}
          </div>

          <button className="change-language-btn" onClick={() => setIsLanguageSelected(false)}>
            🌍 {translations[language].selectLanguage}
          </button>
        </div>
      )}
    </div>
  );
}