// Функция для инициализации обработчиков диалога
function initDialog() {
    const dialog = document.getElementById('dialog');
    const saveButtons = document.querySelectorAll('.card__save-button');
    const dialogButton = document.querySelector('.dialog__button');

    if (!dialog) return;

    // Удаляем старые обработчики, если они были
    saveButtons.forEach((button) => {
        // Клонируем кнопку, чтобы удалить все обработчики
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });

    // Добавляем обработчики на все кнопки сохранения
    document.querySelectorAll('.card__save-button').forEach((button) => {
        button.addEventListener('click', () => {
            if (dialog) {
                dialog.showModal();
            }
        });
    });

    // Обработчик для кнопки закрытия диалога
    if (dialogButton) {
        dialogButton.addEventListener('click', () => {
            dialog.close();
        });
    }
}

// Инициализируем при загрузке, если карточки уже есть
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Если карточки генерируются динамически, initDialog будет вызван из cards.js
        // Иначе инициализируем здесь
        setTimeout(() => {
            if (document.querySelectorAll('.card__save-button').length > 0) {
                initDialog();
            }
        }, 100);
    });
}

