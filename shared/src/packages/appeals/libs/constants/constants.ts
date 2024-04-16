const MIN_DESCRIPTION_LENGTH = 10;
const MAX_DESCRIPTION_LENGTH = 255;
const MAX_NUMBER_OF_PHOTOS = 3;
const MAX_ADDRESS_LENGTH = 255;
const MIN_ADDRESS_LENGTH = 5

const Categories = [
    'Аварійне видалення дерев/гілля',
    'Не очищено від снігу',
    'Не покошена трава',
    'Не посипані доріжки',
    'Не прибране сміття',
    'Не прибране опале листя',
    'Відкритий люк',
    'Порив трубопроводу',
    'Відсутнє водопостачання',
    'Відсутнє освітлення',
    'Амброзія', 
    'Обрив проводів електромережі',
    'Загроза опаду бурульок',
    'Інше',
] as const;

export { MIN_DESCRIPTION_LENGTH,
    MAX_DESCRIPTION_LENGTH,
    MAX_NUMBER_OF_PHOTOS,
    MAX_ADDRESS_LENGTH,
    MIN_ADDRESS_LENGTH,
    Categories
}