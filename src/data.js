import { getRandomInteger, getRandomCommentsIds, getRandomBoolean } from './utils.js';

const mockPosters = ['made-for-each-other.png', 'popeye-meets-sinbad.png', 'sagebrush-trail.jpg', 'santa-claus-conquers-the-martians.jpg', 'the-dance-of-life.jpg', 'the-great-flamarion.jpg', 'the-man-with-the-golden-arm.jpg'];

const mockSmiles = ['smile', 'sleeping', 'puke', 'angry'];

const mockComments = [
  {
    id: '1',
    author: 'Ilya O\'Reilly',
    comment: 'A film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
    date: '2019-05-11T16:12:32.554Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '2',
    author: 'Sincere Reader',
    comment: 'The plot was a bit slow, but the acting was top-notch. Highly recommend for a quiet evening.',
    date: '2021-02-15T10:10:32.123Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '3',
    author: 'Movie Buff 99',
    comment: 'I didn\'t expect that ending! It kept me on the edge of my seat the whole time.',
    date: '2022-11-01T21:00:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '4',
    author: 'Angry Critic',
    comment: 'Total waste of time. The script makes no sense and the music is annoying.',
    date: '2023-01-20T08:30:15.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '5',
    author: 'Cinema Lover',
    comment: 'Beautiful cinematography. Every frame looks like a painting.',
    date: '2020-06-12T14:45:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '6',
    author: 'John Doe',
    comment: 'Not my cup of tea, but I can see why people like it.',
    date: '2021-08-05T12:00:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '7',
    author: 'Jane Smith',
    comment: 'The lead actor was incredible. Best performance of the year!',
    date: '2022-03-10T19:20:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '8',
    author: 'Horror Fan',
    comment: 'Way too scary for me, I had to close my eyes during the climax.',
    date: '2019-12-25T23:59:59.999Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '9',
    author: 'Casual Viewer',
    comment: 'A solid 7/10. Good entertainment for the family.',
    date: '2023-05-14T15:10:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '10',
    author: 'Mystery Solver',
    comment: 'I guessed the killer in the first 20 minutes. Too predictable.',
    date: '2022-07-22T11:40:22.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '11',
    author: 'Emotion Master',
    comment: 'I cried like a baby at the end. What a beautiful story.',
    date: '2020-01-15T09:05:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '12',
    author: 'Sci-Fi Geek',
    comment: 'The physics in this movie are completely wrong. Ruined the immersion.',
    date: '2021-10-30T17:15:45.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '13',
    author: 'Music Fanatic',
    comment: 'The soundtrack is legendary. I\'ve been listening to it on repeat.',
    date: '2022-02-14T14:14:14.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '14',
    author: 'Bored Teen',
    comment: 'Meh. Nothing special. Seen it all before.',
    date: '2023-04-01T20:30:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '15',
    author: 'Old Schooler',
    comment: 'They don\'t make movies like this anymore. A classic feel.',
    date: '2018-09-18T10:00:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '16',
    author: 'Action Junkie',
    comment: 'Non-stop action from start to finish. My heart is still racing!',
    date: '2021-04-12T22:10:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '17',
    author: 'Philosopher',
    comment: 'It makes you think about life and our place in the universe.',
    date: '2022-08-30T13:00:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '18',
    author: 'Comedy King',
    comment: 'I haven\'t laughed this hard in years. The dialogue is hilarious.',
    date: '2023-02-28T18:40:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '19',
    author: 'Minimalist',
    comment: 'Simple, effective, and powerful.',
    date: '2020-11-11T11:11:11.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '20',
    author: 'CGI Hater',
    comment: 'The special effects look so fake. Practical effects would have been better.',
    date: '2019-07-07T07:07:07.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '21',
    author: 'History Teacher',
    comment: 'Very historically accurate. I will show this to my class.',
    date: '2022-09-01T09:00:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '22',
    author: 'Noisy Neighbor',
    comment: 'The sound design was way too loud. My ears are ringing.',
    date: '2021-12-12T12:12:12.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '23',
    author: 'Dreamer',
    comment: 'I wish I could live in the world shown in this movie.',
    date: '2023-06-01T22:00:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '24',
    author: 'Night Owl',
    comment: 'Perfect movie to watch at 3 AM.',
    date: '2020-03-20T03:00:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  },
  {
    id: '25',
    author: 'Bookworm',
    comment: 'The book was better, but this is a decent adaptation.',
    date: '2022-05-05T16:00:00.000Z',
    emotion: mockSmiles[getRandomInteger(0, 3)]
  }
];

console.log('mockComments: ', mockComments);

const getInfoFilm = () => {
  const mockFilms = [
    {
      id: 0,
      title: 'Тайна Коко',
      alternativeTitle: 'Coco',
      totalRating: 8.7,
      ageRating: '6+',
      director: 'Ли Анкрич',
      writers: ['Адриан Молина', 'Мэттью Олдрич'],
      actors: ['Энтони Гонсалес', 'Гаэль Гарсиа Берналь', 'Бенджамин Брэтт'],
      release: {
        date: '2017-10-20',
        releaseCountry: 'Мексика'
      },
      runtime: 105,
      genre: ['Мультфильм', 'Фэнтези', 'Приключения'],
      description: 'Юный Мигель мечтает стать музыкантом и попадает в красочный Мир предков.'
    },
    {
      id: 1,
      title: 'Зеленая миля',
      alternativeTitle: 'The Green Mile',
      totalRating: 9.1,
      ageRating: '16+',
      director: 'Фрэнк Дарабонт',
      writers: ['Стивен Кинг', 'Фрэнк Дарабонт'],
      actors: ['Том Хэнкс', 'Дэвид Морс', 'Майкл Кларк Дункан'],
      release: {
        date: '1999-12-06',
        releaseCountry: 'США'
      },
      runtime: 189,
      genre: ['Драма', 'Фэнтези', 'Криминал'],
      description: 'Надзиратель сталкивается с заключенным, обладающим божественным даром исцеления.'
    },
    {
      id: 2,
      title: 'Начало',
      alternativeTitle: 'Inception',
      totalRating: 8.8,
      ageRating: '12+',
      director: 'Кристофер Нолан',
      writers: ['Кристофер Нолан'],
      actors: ['Леонардо Ди Каприо', 'Джозеф Гордон-Левитт', 'Том Харди'],
      release: {
        date: '2010-07-08',
        releaseCountry: 'США'
      },
      runtime: 148,
      genre: ['Фантастика', 'Боевик', 'Триллер'],
      description: 'Вор извлекает секреты из снов, но теперь ему нужно внедрить идею в чужой разум.'
    },
    {
      id: 3,
      title: 'Интерстеллар',
      alternativeTitle: 'Interstellar',
      totalRating: 8.6,
      ageRating: '12+',
      director: 'Кристофер Нолан',
      writers: ['Джонатан Нолан', 'Кристофер Нолан'],
      actors: ['Мэттью Макконахи', 'Энн Хэтэуэй', 'Джессика Честейн'],
      release: {
        date: '2014-10-26',
        releaseCountry: 'США'
      },
      runtime: 169,
      genre: ['Фантастика', 'Драма', 'Приключения'],
      description: 'Группа исследователей отправляется через червоточину в поисках нового дома для людей.'
    },
    {
      id: 4,
      title: 'Паразиты',
      alternativeTitle: 'Gisaengchung',
      totalRating: 8.5,
      ageRating: '18+',
      director: 'Пон Джун-хо',
      writers: ['Пон Джун-хо', 'Хан Джин-вон'],
      actors: ['Сон Кан-хо', 'Ли Сон-гюн', 'Чо Ё-джон'],
      release: {
        date: '2019-05-21',
        releaseCountry: 'Южная Корея'
      },
      runtime: 132,
      genre: ['Триллер', 'Драма', 'Комедия'],
      description: 'Бедная семья хитростью внедряется в жизнь богачей, что приводит к трагедии.'
    },
    {
      id: 5,
      title: 'Гладиатор',
      alternativeTitle: 'Gladiator',
      totalRating: 8.6,
      ageRating: '16+',
      director: 'Ридли Скотт',
      writers: ['Дэвид Францони', 'Джон Логан'],
      actors: ['Рассел Кроу', 'Хоакин Феникс', 'Конни Нильсен'],
      release: {
        date: '2000-05-01',
        releaseCountry: 'США'
      },
      runtime: 155,
      genre: ['Боевик', 'Драма', 'Приключения'],
      description: 'Преданный полководец становится рабом и сражается на арене ради мести тирану.'
    },
    {
      id: 6,
      title: 'Амели',
      alternativeTitle: 'Le Fabuleux Destin d\'Amélie Poulain',
      totalRating: 8.0,
      ageRating: '16+',
      director: 'Жан-Пьер Жёне',
      writers: ['Гийом Лоран', 'Жан-Пьер Жёне'],
      actors: ['Одри Тоту', 'Матьё Кассовиц', 'Жамель Деббуз'],
      release: {
        date: '2001-04-25',
        releaseCountry: 'Франция'
      },
      runtime: 122,
      genre: ['Мелодрама', 'Комедия'],
      description: 'Застенчивая девушка меняет жизни окружающих к лучшему с помощью добрых чудес.'
    },
    {
      id: 7,
      title: 'Одержимость',
      alternativeTitle: 'Whiplash',
      totalRating: 8.4,
      ageRating: '16+',
      director: 'Дэмьен Шазелл',
      writers: ['Дэмьен Шазелл'],
      actors: ['Майлз Теллер', 'Дж.К. Симмонс', 'Пол Райзер'],
      release: {
        date: '2014-01-16',
        releaseCountry: 'США'
      },
      runtime: 106,
      genre: ['Драма', 'Музыка'],
      description: 'Талантливый барабанщик идет к мечте через изнурительные тренировки тирана-дирижера.'
    },
    {
      id: 8,
      title: 'Большой куш',
      alternativeTitle: 'Snatch',
      totalRating: 8.5,
      ageRating: '18+',
      director: 'Гай Ричи',
      writers: ['Гай Ричи'],
      actors: ['Джейсон Стэйтем', 'Брэд Питт', 'Бенисио Дель Торо'],
      release: {
        date: '2000-08-23',
        releaseCountry: 'Великобритания'
      },
      runtime: 104,
      genre: ['Криминал', 'Комедия', 'Боевик'],
      description: 'Криминальный мир Лондона закручивается в безумную карусель из-за похищенного алмаза.'
    },
    {
      id: 9,
      title: 'Ла-Ла Ленд',
      alternativeTitle: 'La La Land',
      totalRating: 7.9,
      ageRating: '16+',
      director: 'Дэмьен Шазелл',
      writers: ['Дэмьен Шазелл'],
      actors: ['Райан Гослинг', 'Эмма Стоун', 'Джон Ледженд'],
      release: {
        date: '2016-08-31',
        releaseCountry: 'США'
      },
      runtime: 128,
      genre: ['Мюзикл', 'Драма', 'Мелодрама'],
      description: 'Красочная история любви актрисы и джазового музыканта в погоне за славой.'
    }
  ];

  const randomIndex = getRandomInteger(0, mockFilms.length - 1);

  return mockFilms[randomIndex];
};

const getFilm = () => {
  const infoFilm = getInfoFilm();
  const { id, title, alternativeTitle, totalRating, ageRating, director, writers, actors, release,
    runtime, genre, description
  } = infoFilm;

  const filmData = {
    id: id,
    comments: getRandomCommentsIds(),
    info: {
      title: title,
      alternativeTitle: alternativeTitle,
      totalRating: totalRating,
      poster: mockPosters[getRandomInteger(0, 6)],
      ageRating: ageRating,
      director: director,
      writers: writers,
      actors: actors,
      release: release,
      runtime: runtime,
      genre: genre,
      description: description,
    },
    userDetails: {
      watchlist: getRandomBoolean(),
      alreadyWatched: getRandomBoolean(),
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: getRandomBoolean()
    }
  };

  return filmData;
};

export { getFilm };
