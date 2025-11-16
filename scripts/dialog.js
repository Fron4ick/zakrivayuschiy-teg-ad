// Флаг для отслеживания инициализации
let dialogInitialized = false;

// Функция для инициализации обработчиков диалога
function initDialog() {
    const dialog = document.getElementById('dialog');
    if (!dialog || dialogInitialized) return;

    dialogInitialized = true;

    // Используем делегирование событий для всех кнопок сохранения
    document.addEventListener('click', (e) => {
        // Обработка кнопок "Сохранить на память"
        if (e.target.closest('.card__save-button')) {
            e.preventDefault();
            e.stopPropagation();
            dialog.showModal();
            return false;
        }

        // Обработка кнопки "ОК" в диалоге
        if (e.target.closest('.dialog__button')) {
            e.preventDefault();
            e.stopPropagation();
            dialog.close();
            return false;
        }
    });
}

// Инициализируем при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDialog);
} else {
    initDialog();
}

