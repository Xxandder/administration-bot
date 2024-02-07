type Parameters = {
    fullName: string;
    phoneNumber: string;
}

const getConfirmationMessageText = ({fullName, phoneNumber}: Parameters) : string =>{
    const messageText = `Ваші дані: \n Ім\'я - ${fullName} 
    \n Номер телефону - ${phoneNumber}`;
    return messageText;
}

export { getConfirmationMessageText };