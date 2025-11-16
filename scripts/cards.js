const cardsData = [
  [
    'Фритрек и нулевой спринт: Подготовка к работе',
    false, // status_like - начальное состояние лайка
    'Это было самое начало пути. На этом этапе важно было проникнуться основами и настроиться на учёбу. И, возможно, подумать, как новые знания могут повлиять на ваше будущее.',
    'Место для ваших воспоминаний о начале обучения.',
    { image: './images/car.svg', label: '&lt;/HTML&gt;' }
  ],
  [
    '1 спринт: Я — чистый лист',
    false, // status_like - начальное состояние лайка
    'На первых этапах мы работали со страхами и сомнениями, которые часто испытывают новички. Один из них — страх перед чистым листом. Это, конечно же, намного сложнее, чем боязнь куска бумаги. Часто за этим ощущением скрываются более глубокие вопросы: с чего начать? а вдруг будет слишком сложно? что, если я не справлюсь?',
    'Место для ваших воспоминаний о начале первого спринта.',
    { image: './images/car.svg', label: '&lt;/HTML&gt;' }
  ],
  [
    '1 спринт: А если не получится?',
    false, // status_like - начальное состояние лайка
    'Первый проект — позади! Но это всё ещё самое начало пути. Радость могла быстро померкнуть и смениться ожиданием провала. Или вы, наоборот, могли вдохновиться успехами и поверить в себя.',
    'Место для ваших воспоминаний об окончании первого спринта.',
    { image: './images/car.svg', label: '&lt;CSS&gt;' }
  ],
  [
    '2 спринт: Погоня за идеалом',
    false, // status_like - начальное состояние лайка
    'На этом этапе вы уже достаточно разбирались в основах вёрстки, чтобы понять, как много ещё впереди. Вы могли попытаться погнаться за идеалом и понять, что он недостижим. А, может, вы вовсе и не подвержены перфекционизму и вместо того, чтобы сделать идеально, старались просто сделать.',
    'Место для ваших воспоминаний о начале второго спринта.',
    { image: './images/car.svg', label: '&lt;desigions&gt;' }
  ],
  [
    '2 спринт: О тех, кто рядом',
    false, // status_like - начальное состояние лайка
    'Всё это время вы были не одиноки (хотя, возможно, иногда и чувствовали, что одни против целого мира). Вас окружали одногруппники, команда сопровождения и просто близкие люди, которым можно пожаловаться, если очередной макет просто так не поддавался. Осваивать что-то новое легче, когда рядом есть единомышленники, не правда ли?',
    'Место для ваших воспоминаний об окончании второго спринта.',
    { image: './images/car.svg', label: 'care' }
  ],
  [
    '3 спринт: Обходные стратегии',
    false, // status_like - начальное состояние лайка
    'На этом курсе вы постоянно решали разные задачи. В какой-то момент вам могло показаться, что решения просто иссякли. Значит, пришло время посмотреть на задачу под другим углом.',
    'Место для ваших воспоминаний о начале третьего спринта.',
    { image: './images/car.svg', label: 'support' }
  ],
  [
    '3 спринт: Когда опускаются руки',
    false, // status_like - начальное состояние лайка
    'Во время учёбы часто возникает чувство, когда не знаешь, за что хвататься. Вроде и проектную пора сдавать, и задачи хочется порешать, и в теории получше разобраться, и жизнь не забыть пожить. В такие моменты очень нужна концентрация. Вспомните, откуда вы её черпали.',
    'Место для ваших воспоминаний об окончании третьего спринта.',
    { image: './images/car.svg', label: '&lt;lifes-style: none&gt;' }
  ],
  [
    '«Сейчас я здесь»',
    false, // status_like - начальное состояние лайка
    'Сейчас вы уже очень много знаете о вёрстке. Но это только начало. ㅤВо-первых, впереди ещё много материала про «красотищу». Во-вторых, с окончанием курса учёба не заканчивается. Вёрстка — это целый мир. И этот мир постоянно меняется. Познать его полностью не получится, но это тот случай, когда важен сам процесс познания. Ведь часто путь — и есть результат.',
    'Место, чтобы остановиться, подумать и написать, что вы чувствуете в этой точке пути.',
    { image: './images/car.svg', label: '&lt;experience&gt;' }
  ],
];

// Функция для создания HTML карточки
function createCard(data) {
  const [title, statusLike, firstParagraph, secondParagraph, filters] = data;
  const { image, label } = filters;

  const likeButtonText = statusLike ? 'Unlike' : 'Like';
  const likeIconSrc = statusLike ? './svg/likeicon_final_red.svg' : './svg/likeicon_empty.svg';

  return `
    <article class="card">
      <h2 class="card__title">${escapeHtml(title)}</h2>
      <div class="image_group">
        <img src="${escapeHtml(image)}" alt="Картинка" class="card__image" />
        <p class="card__label">${label}</p>
      </div>
      <div class="card__content">
        <p class="card__text">${escapeHtml(firstParagraph)}</p>
        <p class="card__text">${escapeHtml(secondParagraph)}</p>

        <div class="card_like_buttons">
          <button class="card__icon-button" type="button">
            <div class="like-icon-container">
              <img src="${likeIconSrc}" alt="like" class="like_buton like-layer" data-layer="base" />
              <img src="" alt="" class="like_buton like-layer" data-layer="overlay" style="display: none;" />
              <img src="" alt="" class="like_buton like-layer" data-layer="outline" style="display: none;" />
            </div>
          </button>
          <button class="card__like-button" type="button">
            <span class="button__text">${likeButtonText}</span>
          </button>
        </div>
      </div>
    </article>
  `;
}

// Функция для экранирования HTML (защита от XSS)
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Функция для генерации всех карточек
function renderCards() {
  const cardsContainer = document.querySelector('.cards');
  if (!cardsContainer) {
    console.error('Контейнер .cards не найден');
    return;
  }

  // Очищаем контейнер
  cardsContainer.innerHTML = '';

  // Генерируем карточки из массива данных
  cardsData.forEach((cardData) => {
    const cardHTML = createCard(cardData);
    cardsContainer.insertAdjacentHTML('beforeend', cardHTML);
  });

  // После генерации карточек инициализируем обработчики лайков
  // Используем setTimeout для гарантии, что DOM обновлен
  setTimeout(() => {
    if (typeof initLikeButtons === 'function') {
      initLikeButtons();
    }
  }, 0);
}

// Генерируем карточки при загрузке DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderCards);
} else {
  renderCards();
}

