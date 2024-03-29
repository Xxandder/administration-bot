const RegistrationStage = {
    SENDING_PHONE_NUMBER: 'sendingPhoneNumber',
    TYPING_FULL_NAME: 'typingFullName',
    CONFIRMATION: 'confirmation',
    REGISTERED: 'registered'
} as const;

export { RegistrationStage };