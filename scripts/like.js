/* Этот скрипт реализует анимацию кнопки лайк с использованием SVG изображений с наслаиванием
✦ card__icon-button — для кнопки, оборачивающей иконку
✦ like-icon-container — контейнер для слоев изображений
✦ like_buton — для img элементов с иконкой внутри кнопки
✦ card__like-button — для кнопки Like/Unlike
*/

// Функция для инициализации обработчиков кнопок лайк
function initLikeButtons() {
  const iconButtonArray = document.querySelectorAll('.card__icon-button');
  const likeButtonArray = document.querySelectorAll('.card__like-button');

  // Создаем пары кнопок (icon-button и like-button) для каждой карточки
  iconButtonArray.forEach((iconButton, index) => {
  const likeButton = likeButtonArray[index];
  if (!likeButton) return;

  // Получаем контейнер и слои изображений
  const likeContainer = iconButton.querySelector('.like-icon-container');
  if (!likeContainer) return;
  
  const baseLayer = iconButton.querySelector('.like-layer[data-layer="base"]');
  const overlayLayer = iconButton.querySelector('.like-layer[data-layer="overlay"]');
  const outlineLayer = iconButton.querySelector('.like-layer[data-layer="outline"]');
  
  if (!baseLayer || !overlayLayer || !outlineLayer) return;

  // Флаг состояния лайка
  let flag_button = false;
  
  // Таймеры и переменные состояния
  let hoverTimer = null;
  let mousedownTimer = null;
  let outlineTimer = null;
  let clickAnimationTimers = [];
  let isHovering = false;
  let isMouseDown = false;
  let isAnimating = false;
  let mousedownReachedFinalRed = false; // Флаг, что mousedown достиг стадии like_final_red

  // Функция для наслаивания изображения (показывает overlay слой)
  function overlayImage(src) {
    if (!src) {
      overlayLayer.style.display = 'none';
      overlayLayer.src = '';
      return;
    }
    overlayLayer.src = src;
    overlayLayer.style.display = 'block';
    overlayLayer.style.position = 'absolute';
    overlayLayer.style.top = '0';
    overlayLayer.style.left = '0';
  }

  // Функция для смены базового изображения
  function changeBaseImage(src) {
    baseLayer.src = src;
  }

  // Функция для очистки overlay
  function clearOverlay() {
    overlayLayer.style.display = 'none';
    overlayLayer.src = '';
  }

  // Функция для показа/скрытия обводки
  function showOutline(src) {
    if (!src) {
      outlineLayer.style.display = 'none';
      outlineLayer.src = '';
      return;
    }
    outlineLayer.src = src;
    outlineLayer.style.display = 'block';
    outlineLayer.style.position = 'absolute';
    outlineLayer.style.top = '0';
    outlineLayer.style.left = '0';
  }

  function clearOutline() {
    outlineLayer.style.display = 'none';
    outlineLayer.src = '';
  }

  // Функция для сброса всех таймеров
  function clearAllTimers() {
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      hoverTimer = null;
    }
    if (mousedownTimer) {
      clearTimeout(mousedownTimer);
      mousedownTimer = null;
    }
    if (outlineTimer) {
      clearTimeout(outlineTimer);
      outlineTimer = null;
    }
    clickAnimationTimers.forEach(timer => clearTimeout(timer));
    clickAnimationTimers = [];
  }

  // Функция для обновления текста кнопки
  function updateButtonText() {
    const textElement = likeButton.querySelector('.button__text');
    if (textElement) {
      textElement.textContent = flag_button ? 'Unlike' : 'Like';
    }
  }

  // Функция для запуска анимации клика (когда кнопка не лайкнута)
  function startClickAnimation(startFromFinalRed = false) {
    if (isAnimating || flag_button) return;
    
    isAnimating = true;
    clearAllTimers();
    clearOutline();

    if (startFromFinalRed) {
      // Продолжаем анимацию с like_final_red (после mousedown >200ms)
      // like_final_red уже показан, продолжаем с likeicon_big
      // 0-200ms: likeicon_big.svg (продолжаем с текущего состояния)
      overlayImage('./svg/likeicon_final_red.svg'); // Убеждаемся, что показываем final_red
      clickAnimationTimers.push(setTimeout(() => {
        if (!isAnimating) return;
        overlayImage('./svg/likeicon_big.svg');
      }, 200));

      clickAnimationTimers.push(setTimeout(() => {
        if (!isAnimating) return;
        // 200-400ms: likeicon_bomb.svg
        overlayImage('./svg/likeicon_bomb.svg');
      }, 400));

      clickAnimationTimers.push(setTimeout(() => {
        if (!isAnimating) return;
        // После 400ms: flag_button = true, likeicon_final_red.svg (на базовом слое)
        flag_button = true;
        changeBaseImage('./svg/likeicon_final_red.svg');
        clearOverlay();
        updateButtonText();
        isAnimating = false;
      }, 600));
    } else {
      // Начинаем анимацию с начала
      clearOverlay();
      // Ускоренные тайминги: 0-200ms, 200-400ms, 400-600ms, 600-800ms, после 800ms
      // 0-200ms: cross_red.svg
      overlayImage('./svg/cross_red.svg');
      clickAnimationTimers.push(setTimeout(() => {
        if (!isAnimating) return;
        // 200-400ms: likeicon_final_red.svg
        overlayImage('./svg/likeicon_final_red.svg');
      }, 200));

      clickAnimationTimers.push(setTimeout(() => {
        if (!isAnimating) return;
        // 400-600ms: likeicon_big.svg
        overlayImage('./svg/likeicon_big.svg');
      }, 400));

      clickAnimationTimers.push(setTimeout(() => {
        if (!isAnimating) return;
        // 600-800ms: likeicon_bomb.svg
        overlayImage('./svg/likeicon_bomb.svg');
      }, 600));

      clickAnimationTimers.push(setTimeout(() => {
        if (!isAnimating) return;
        // После 800ms: flag_button = true, likeicon_final_red.svg (на базовом слое)
        flag_button = true;
        changeBaseImage('./svg/likeicon_final_red.svg');
        clearOverlay();
        updateButtonText();
        isAnimating = false;
      }, 800));
    }
  }

  // Функция для обработки hover (только если не лайкнуто)
  function handleHover() {
    if (flag_button || isMouseDown || isAnimating) return;
    
    isHovering = true;
    clearAllTimers();
    clearOverlay();

    // Ускоренный тайминг: 0-200ms
    // 0-200ms: cross_dark.svg
    overlayImage('./svg/cross_dark.svg');

    hoverTimer = setTimeout(() => {
      if (isHovering && !isMouseDown && !isAnimating && !flag_button) {
        // После 200ms: likeicon_final_dark.svg
        overlayImage('./svg/likeicon_final_dark.svg');
      }
    }, 200);
  }

  // Функция для обработки unhover
  function handleUnhover() {
    isHovering = false;
    
    // Если мышь покидает кнопку во время mousedown, сбрасываем состояние
    if (isMouseDown && !flag_button && !isAnimating) {
      isMouseDown = false;
      mousedownReachedFinalRed = false;
      clearAllTimers();
      clearOverlay();
      clearOutline();
      return;
    }
    
    clearAllTimers();
    clearOverlay();
    clearOutline();
  }

  // Функция для обработки mousedown (только если не лайкнуто)
  function handleMouseDown() {
    if (flag_button || isAnimating) return;
    
    isMouseDown = true;
    mousedownReachedFinalRed = false;
    clearAllTimers();
    clearOutline();

    // Ускоренный тайминг: 0-200ms
    // 0-200ms: cross_red.svg
    overlayImage('./svg/cross_red.svg');

    mousedownTimer = setTimeout(() => {
      if (isMouseDown && !isAnimating && !flag_button) {
        // После 200ms: likeicon_final_red.svg
        overlayImage('./svg/likeicon_final_red.svg');
        mousedownReachedFinalRed = true;
        
        // Наслаиваем like_empty поверх like_final_red для обводки
        outlineTimer = setTimeout(() => {
          if (isMouseDown && !isAnimating && !flag_button) {
            // Наслаиваем like_empty поверх
            showOutline('./svg/likeicon_empty.svg');
          }
        }, 50);
      }
    }, 200);
  }

  // Функция для обработки mouseup
  function handleMouseUp() {
    const wasMouseDown = isMouseDown;
    const reachedFinalRed = mousedownReachedFinalRed;
    isMouseDown = false;
    mousedownReachedFinalRed = false;
    
    // Убираем обводку если была
    clearOutline();
    
    if (flag_button || isAnimating) return;
    
    // Если mouseup произошел после долгого mousedown (>200ms) и достигли like_final_red
    // то продолжаем анимацию с этого места, а не начинаем заново
    if (wasMouseDown && reachedFinalRed && !isAnimating) {
      // Продолжаем анимацию с like_final_red
      startClickAnimation(true);
    } else if (wasMouseDown && !isAnimating) {
      // Если mouseup произошел быстро, возвращаемся к empty
      clearAllTimers();
      clearOverlay();
      
      // Если курсор все еще над кнопкой, запускаем hover эффект
      setTimeout(() => {
        if (isHovering && !isMouseDown && !isAnimating && !flag_button) {
          handleHover();
        }
      }, 50);
    } else if (!isAnimating) {
      // Если mouseup произошел быстро, возвращаемся к начальному состоянию
      clearAllTimers();
      if (isHovering) {
        handleHover();
      } else {
        clearOverlay();
      }
    }
  }

  // Функция для обработки клика на иконку
  function handleIconClick(e) {
    e.preventDefault();
    e.stopPropagation();

    // Если уже анимируемся, не обрабатываем клик повторно
    if (isAnimating) {
      return;
    }

    if (flag_button) {
      // Если уже лайкнуто - снимаем лайк
      flag_button = false;
      clearAllTimers();
      isAnimating = false;
      clearOverlay();
      clearOutline();
      changeBaseImage('./svg/likeicon_empty.svg');
      updateButtonText();
    } else {
      // Запускаем анимацию клика
      startClickAnimation(false);
    }
  }

  // Функция для обработки клика на кнопку Like/Unlike
  function handleLikeButtonClick(e) {
    e.preventDefault();
    e.stopPropagation();

    // Если уже анимируемся, не обрабатываем клик повторно
    if (isAnimating) {
      return;
    }

    if (flag_button) {
      // Если уже лайкнуто - снимаем лайк
      flag_button = false;
      clearAllTimers();
      isAnimating = false;
      clearOverlay();
      clearOutline();
      changeBaseImage('./svg/likeicon_empty.svg');
      updateButtonText();
    } else {
      // Запускаем анимацию клика
      startClickAnimation(false);
    }
  }

  // Обработчики событий для иконки
  iconButton.addEventListener('mouseenter', handleHover);
  iconButton.addEventListener('mouseleave', handleUnhover);
  iconButton.addEventListener('mousedown', handleMouseDown);
  iconButton.addEventListener('mouseup', handleMouseUp);
  iconButton.addEventListener('click', handleIconClick);

    // Обработчик события для кнопки Like/Unlike
    likeButton.addEventListener('click', handleLikeButtonClick);
  });
}

// Функция будет вызвана из cards.js после генерации карточек
// Если карточки уже есть в DOM (например, вручную добавлены в HTML),
// можно вызвать initLikeButtons() вручную
