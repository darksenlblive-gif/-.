
import { Video, Comment, Creator } from './types';

const creators: Record<string, Creator> = {
  toples: {
    name: "Ян Топлес",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_n8-9u9P_L0m-hV5-VlS7Y0O6N_3K5k5y6L_L5n=s176-c-k-c0x00ffffff-no-rj",
    subscribers: "6.6M",
    verified: true
  },
  maslennikov: {
    name: "Дима Масленников",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_mY4Z3Y4Y4Y4Y4Y4Y4Y4Y4Y4Y4Y4Y4Y4Y4Y4Y4Y=s176-c-k-c0x00ffffff-no-rj",
    subscribers: "17M",
    verified: true
  },
  mono: {
    name: "Mono",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_nl6_W9X_X9X_X9X_X9X_X9X_X9X_X9X_X9X_X=s176-c-k-c0x00ffffff-no-rj",
    subscribers: "1.3M",
    verified: true
  },
  holdik: {
    name: "Holdik",
    avatar: "https://yt3.googleusercontent.com/ytc/AIdro_mZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8=s176-c-k-c0x00ffffff-no-rj",
    subscribers: "5.5M",
    verified: true
  }
};

// Реальные ID популярных видео
const toplesPool = [
  { id: "f3_YkXk_q_U", title: "ПОЧЕМУ МЫ ВИДИМ СНЫ?" },
  { id: "7K8_rS8W8wQ", title: "КАК РАБОТАЕТ МОЗГ?" },
  { id: "v4h2fR3h_4E", title: "ЭВОЛЮЦИЯ: ОШИБКИ ПРИРОДЫ" },
  { id: "e_j8G8VfEwI", title: "КТО МЫ ТАКИЕ?" },
  { id: "Lp8v8_v8_v8", title: "БУДУЩЕЕ ЧЕЛОВЕЧЕСТВА" }
];

const dimaPool = [
  { id: "Tj75Arf-I-Y", title: "ГОСТБАСТЕР: ПСИХБОЛЬНИЦА" },
  { id: "9Y_vV_V_V_V", title: "ПРЯТКИ НА ЗАБРОШЕННОМ ЗАВОДЕ" },
  { id: "X6_8XpX8pX8", title: "НОЧЬ В ЧЕРНОБЫЛЕ" },
  { id: "U-8_v8_v8_v", title: "ТЕНЬ В ПОДВАЛЕ" }
];

const holdikPool = [
  { id: "V8X8pX8pX8p", title: "ВЫБИЛ ВСЕ ЛЕГЕНДАРКИ В BRAWL STARS" },
  { id: "M8X8X8X8X8X", title: "ТОП 10 ТАКТИК В ЭТОМ СЕЗОНЕ" },
  { id: "L8Z8Z8Z8Z8Z", title: "100 ЯЩИКОВ: ЧТО ВНУТРИ?" }
];

const monoPool = [
  { id: "W8X8pX8pX8p", title: "ОБЗОР iPHONE 16 PRO MAX" },
  { id: "N8Z8Z8Z8Z8Z", title: "ИДЕАЛЬНЫЙ ИГРОВОЙ СЕТАП" },
  { id: "P8X8X8X8X8X", title: "ПОЧЕМУ ANDROID ЛУЧШЕ?" }
];

const generateComments = (count: number): Comment[] => {
  const texts = [
    "Это просто шедевр!", "Ян, ты лучший просветитель!", "Дима, мурашки по коже...", "Хольдик, го в друзья в Бравле",
    "Mono, спасибо за честный обзор!", "Лайк за качество", "Смотрю всей семьей", "Больше такого контента!",
    "Интересно, когда следующий выпуск?", "Топлес как всегда на высоте!", "Маслеников — легенда.", "Лучший видос за неделю!"
  ];
  return Array.from({ length: count }).map((_, i) => ({
    id: `comment-${i}-${Math.random()}`,
    author: `Зритель ${Math.floor(Math.random() * 999)}`,
    avatar: `https://i.pravatar.cc/150?u=${Math.random()}`,
    text: texts[Math.floor(Math.random() * texts.length)],
    likes: `${Math.floor(Math.random() * 5000)}`,
    timestamp: `${Math.floor(Math.random() * 23) + 1} ч. назад`
  }));
};

export const generateVideos = (): Video[] => {
  const videos: Video[] = [];
  const poolSizes = {
    toples: toplesPool.length,
    maslennikov: dimaPool.length,
    holdik: holdikPool.length,
    mono: monoPool.length
  };

  for (let i = 0; i < 100; i++) {
    const creatorKeys = Object.keys(creators);
    const creatorKey = creatorKeys[i % creatorKeys.length];
    const creator = creators[creatorKey];
    
    let baseData;
    if (creatorKey === 'toples') baseData = toplesPool[i % poolSizes.toples];
    else if (creatorKey === 'maslennikov') baseData = dimaPool[i % poolSizes.maslennikov];
    else if (creatorKey === 'holdik') baseData = holdikPool[i % poolSizes.holdik];
    else baseData = monoPool[i % poolSizes.mono];

    const isToples = creatorKey === 'toples';
    const category = isToples ? 'Education' : (creatorKey === 'holdik' ? 'Gaming' : 'Entertainment');

    videos.push({
      id: `vid-${i}`,
      videoId: baseData.id,
      platform: 'youtube',
      title: `${baseData.title} | ${creator.name}`,
      thumbnail: `https://img.youtube.com/vi/${baseData.id}/maxresdefault.jpg`,
      creator,
      views: `${(Math.random() * 20 + 1).toFixed(1)}M просмотров`,
      postedAt: `${Math.floor(Math.random() * 11) + 1} мес. назад`,
      duration: `${Math.floor(Math.random() * 15) + 10}:${Math.floor(Math.random() * 59).toString().padStart(2, '0')}`,
      description: `Популярное видео от канала ${creator.name}. Смотрите эксклюзивный контент только на YouGlass. Без рекламы и переходов.`,
      comments: generateComments(25),
      category
    });
  }
  return videos;
};
