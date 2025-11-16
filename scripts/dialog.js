// Функция для инициализации обработчиков диалога
function initDialog() {
    const dialog = document.getElementById('dialog');
    if (!dialog) return;

    // Обработчик для всех кнопок сохранения (включая динамически созданные)
    function handleSaveButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (dialog) {
            dialog.showModal();
        }
        return false;
    }

    // Обработчик для кнопки закрытия диалога
    function handleDialogButtonClick(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        dialog.close();
        return false;
    }

    // Используем делегирование событий на document для всех кнопок
    document.addEventListener('click', (e) => {
        // Обработка кнопок "Сохранить на память"
        const saveButton = e.target.closest('.card__save-button');
        if (saveButton) {
            handleSaveButtonClick(e);
            return;
        }

        // Обработка кнопки "ОК" в диалоге
        const dialogButton = e.target.closest('.dialog__button');
        if (dialogButton) {
            handleDialogButtonClick(e);
            return;
        }
    }, true); // Используем capture phase для раннего перехвата

    // Также добавляем обработчики напрямую на существующие кнопки
    document.querySelectorAll('.card__save-button').forEach((button) => {
        button.addEventListener('click', handleSaveButtonClick, true);
    });

    const dialogButton = document.querySelector('.dialog__button');
    if (dialogButton) {
        dialogButton.addEventListener('click', handleDialogButtonClick, true);
    }
}

// Инициализируем при загрузке DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDialog);
} else {
    initDialog();
}

