<script setup>
const isWorking = ref(true);

const numberOfParagraphs = ref(3);
const numberOfPhotos = ref(3);

const videoURL = ref(null);
const force = ref(false);
const imageBehavior = ref('uniform');
const imageFormat = ref('imgur')

const article = ref(null);
const isPending = ref(false);
const _error = ref(null);

const fromTime = ref(null);
const toTime = ref(null);
const timer = ref(0);

let counter = null;

const createPost = async (url) => {
  isPending.value = true;
  isWorking.value = true;

  counter = setInterval(() => {
      timer.value++;
  }, 1000)

  const { data, pending, error, refresh } = await useFetch('http://localhost:1337/api/articles/createBetterArticle', {
    method: 'GET',
    query: {
      link: videoURL.value,
      pages: numberOfParagraphs.value,
      force: force.value,
      from: fromTime.value,
      to: toTime.value,
      images: numberOfPhotos.value,
      images_alg: imageBehavior.value
    }
  })
  isPending.value = false;

  article.value = data.value;
  _error.value = error.value

  timer.value = 0;
  clearInterval(counter);
}
</script>

<template>
  <div class="container mx-auto">
    <div :class="{ 'splash': !isWorking }">
      <h4 class="app-title">{{ isPending ? 'Работа над видео в процессе..' : 'Вставьте ссылку на ваше видео' }}</h4>
      <div class="join mt-2">
        <div class="join-item">
          <div class="app-container rubik">
            <input type="text" placeholder="https://www.youtube.com/watch?v=CJ1piq6a4HU" class="app-input"
                   v-model="videoURL" />
            <select class="app-select !w-60" v-model="imageFormat">
              <option disabled>Вариант сохранения картинок</option>
              <option selected value="imgur">Облако Imgur</option>
              <option value="base64">Кодировать Base64</option>
            </select>
            <select class="app-select !w-60" v-model="force">
              <option disabled>Вариант сбора звука</option>
              <option selected value="false">Субтитры</option>
              <option value="true">Whisper AI</option>
            </select>
            <select class="app-select !w-60" v-model="imageBehavior">
              <option disabled>Вариант сбора фото</option>
              <option selected value="uniform">Универсальный</option>
              <option value="similarity">Длительный показ темы</option>
              <option value="circle_rectangle">Содержательность</option>
            </select>
          </div>
          <div class="second-container join w-full -mt-1">
            <input type="text" class="input input-bordered input-primary focus:outline-0 w-2/6 text-center" readonly value="Начало видео">
            <input type="text" name="from" placeholder="00:00:00" class="app-input" v-model="fromTime">
            <input type="text" class="input input-bordered input-primary focus:outline-0 w-2/6 text-center" readonly value="Конец видео">
            <input type="text" name="to" placeholder="00:12:30" class="app-input" v-model="toTime">
          </div>
        </div>
        <div class="join-item">
          <button class="app-button !h-full w-72" @click="createPost">Создать статью по видео</button>
        </div>
      </div>



      <div class="sliders mt-5 flex gap-x-16 w-full">
        <div class="app-slider w-full">
          <span class="text-2xl font-normal">Количество параграфов</span>
          <input type="range" min="2" max="15" class="app-range mt-2" step="1" v-model="numberOfParagraphs" />
          <div class="w-full flex justify-between text-xs mb-2">
            <span v-for="i in 14">{{ i + 1 }}</span>
          </div>
          <Transition>
            <small class="text-warning rubik" v-if="numberOfParagraphs > 4">Большое количество параграфов может испортить ответ.<br>Придерживайтесь 1 параграфа на 5 минут видео.</small>
          </Transition>
        </div>

        <div class="app-slider w-full">
          <span class="text-2xl font-normal">Количество фото на параграф</span>
          <input type="range" min="1" max="10" class="app-range mt-2" step="1" v-model="numberOfPhotos" />
          <div class="w-full flex justify-between text-xs">
            <span v-for="i in 10">{{ i }}</span>
          </div>
          <Transition>
            <small class="text-warning rubik" v-if="numberOfPhotos > 5">Каждое фото добавляет немного времени к загрузке ответа.</small>
          </Transition>
        </div>
      </div>
      <div class="loader mt-12 h-96 w-full grid place-content-center bg-gray-200 border-2 border-primary/20 rounded-3xl"
        v-if="isPending">
        <div class="flex flex-col items-center">
          <span class="loading loading-bars loading-lg"></span>
          <span class="mt-2 text-xl rubik">Статья создается...</span>
          <span class="mt-2 text-xl rubik">{{timer > 60 ? `${Math.floor(timer / 60)} минут ${timer - (Math.floor(timer / 60)) * 60} сек` : `${timer} сек.`}}</span>
        </div>
      </div>
      <div class="result mt-12" v-if="!isPending && (article || _error)">
        <div v-if="!_error && article.title">
          <h1 class="text-5xl">{{ article.title }}</h1>
          <div class="topics">
            <div class="topic mt-12" v-for="topic in article.topics">
              <div class="flex items-center justify-between">
                <h2 class="text-3xl">{{ topic.title }}</h2><small class="text-md badge badge-primary py-4">{{
                  topic.start }} -> {{ topic.end }}</small>
              </div>
              <p class="text-xl mt-4" v-html="topic?.paragraphs ? topic.paragraphs.replaceAll('\n', '<br>') : ':<'"></p>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                <img v-for="image in topic.images" :src="image" class="object-cover mt-4" style="width: 500px;">
              </div>
            </div>
          </div>
        </div>
        <div class="error" v-else>
          <div class="alert alert-warning" v-if="_error || !article.title">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{{ _error || article.message || article?.detail?.map(x => x?.msg).join(" И ") || article }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
 .splash {
    @apply flex flex-col justify-center;
    height: calc(100vh - 240px);
  }

  .app-title {
    @apply text-3xl font-bold;
  }
  .splash .app-title {
    @apply text-7xl;
  }

  .app-container {
    @apply join w-full;
  }
  .splash .app-container {
  }

  .app-input {
    @apply input input-bordered input-primary w-full focus:outline-0 join-item rounded-r-none;
  }
  .splash .app-input {
    @apply input-lg;
  }

  .app-button {
    @apply btn btn-primary focus:outline-0 rounded-l-none;
  }
  .splash .app-button {
    @apply btn-lg
  }

  .app-select {
    @apply select select-primary select-bordered rounded-none w-full max-w-xs join-item focus:outline-0;
  }
  .splash .app-select {
    @apply select-lg;
  }

  .app-range {
    @apply range range-xs;
  }

  .splash .app-range {
    @apply range-md;
  }

 /* we will explain what these classes do next! */
 .v-enter-active,
 .v-leave-active {
   transition: 0.5s ease;
 }

 .v-enter-from,
 .v-leave-to {
   transform: translateX(20px);
   opacity: 0;
 }
  </style>