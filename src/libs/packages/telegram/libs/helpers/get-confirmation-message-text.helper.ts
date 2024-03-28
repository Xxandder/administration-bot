type Parameters = {
    fullName: string;
    phoneNumber: string;
}

const getConfirmationMessageText = ({fullName, phoneNumber}: Parameters) : string =>{
    const messageText = `*Ваші дані:* \nІм\'я: ${fullName}\nНомер телефону: ${phoneNumber}`;
    return messageText;
}

export { getConfirmationMessageText };