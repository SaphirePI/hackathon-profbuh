# Панель для редакторов

В этой панели вам предоставляется интерфейс для взаимодействия с административным сервером, который в свою очередь позаботится о том, чтоб передать ваш запрос в конвертер, но он не может вам этого пообещать :)

# Предпросмотр

## Внешний вид панели
<img width="1226" alt="image" src="https://github.com/SaphirePI/hackathon-profbuh/assets/40152105/a1387eed-2104-4fdc-8142-cce127b3d721">


## Фильтры
Можно попросить сайт не использовать субтитры, а подключить medium openai whisper модель для **идеального захвата голоса**. 

### Сбор картинок 📸

**Универсальный** - сделать фото по длине всего параграфа

**Длительный показ темы** - сделать фото, если на видео демонстрируют слайд, excel, настройки и что угодно.

**Содержательность** - займет чуть больше времени, однако найдет на видео красные прямоугольники, стрелки, круги и все что может нарисовать автор чтоб тыкнуть на какой-то элемент!


### Загрузка картинок ⬆️

**Закинуть в виде base64 в бд**. - Глупо, не надо пожалуйста, база данных не оценит и API просто помрет, как мы выяснили позже.

**Загрузить на imgur, а затем сохранить ссылку.** - Бесплатно, оптимально, можно поднять свой cdn и отправлять картинки туда, но в рамках хакатона мы этого делать не стали.

<img width="337" alt="image" src="https://github.com/SaphirePI/hackathon-profbuh/assets/40152105/f593fd84-f5bb-4a58-958f-3d4ca7c0f4e9">
<img width="302" alt="image" src="https://github.com/SaphirePI/hackathon-profbuh/assets/40152105/735285a4-b7a6-4a9d-898b-b4e85fbd4920">
<img width="344" alt="image" src="https://github.com/SaphirePI/hackathon-profbuh/assets/40152105/4fadf7bf-b030-4c30-9d73-2a7054d87806">



## Предупреждения
Интерфейс заранее **предупредит вас** о том, что большое количество параграфов не всегда хорошо. 

Вы сможете пересказать видео длиною в 3 минуты на 7 параграфов?

<img width="588" alt="image" src="https://github.com/SaphirePI/hackathon-profbuh/assets/40152105/bdfbb812-3f4b-442f-82bf-76e99f862923">
<img width="591" alt="image" src="https://github.com/SaphirePI/hackathon-profbuh/assets/40152105/4f9bed4d-f599-4bf9-a237-ae5c1ca4215f">

## В процессе
**Модный, красивый, современный, понятный лоадер с секундомером!** 

Можно каждый раз считать, как же долго оно пытается сделать пост с вашего видео!

![chrome_X77CsTVUzL](https://github.com/SaphirePI/hackathon-profbuh/assets/40152105/7dff1424-3cba-4d8a-8da0-8878fcfc6111)

## Результат 🎉
**Результат у нас**. Теперь можно опубликовать и подправить его в административной панели Strapi!

**Результат не только у нас...?** Теперь после публикации он есть у всех на сайте потребителей (ака БЛОГ)!!!!

https://github.com/SaphirePI/hackathon-profbuh/assets/40152105/7bb4ef0b-0cde-42ca-80b5-6ee4c70d0a8b



## Установка

Убедитесь что скачали модули:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Для разработки

Запускает сайт на `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Билдит приложение для продакшена:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Предпросмотр продакшена после билда:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```
