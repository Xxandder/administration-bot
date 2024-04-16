const AppealStatus = {
    WAITING: 'Очікує відповіді',
    IN_WORK: 'В роботі',
    FINISHED: 'Завершено',
    CANCELED: 'Скасовано'
} as const;

export { AppealStatus };