<script setup>
const isWorking = ref(false);

const numberOfParagraphs = ref(5);
const videoURL = ref(null);
const postLanguage = ref('ru');
const force = ref(false);

const article = ref(null);
const isPending = ref(false);
const _error = ref(null);

const createPost = async (url) => {
  isPending.value = true;
  isWorking.value = true;

  const { data, pending, error, refresh } = await useFetch('http://localhost:1337/api/articles/createBetterArticle', {
    method: 'GET',
    query: {
      link: videoURL.value,
      pages: numberOfParagraphs.value,
      force: force.value
    }
  })
  isPending.value = false;

  article.value = data.value;
  _error.value = error.value
  

  console.log(data)
}
</script>

<template>
  <div class="container mx-auto">
    <div :class="{ 'splash': !isWorking }">
      <h4 class="app-title">{{ isPending ? 'Работа над видео в процессе..' : 'Вставьте ссылку на ваше видео' }}</h4>
      <div class="app-container">
        <input type="text" placeholder="https://www.youtube.com/watch?v=CJ1piq6a4HU" class="app-input"
          v-model="videoURL" />
        <select class="app-select" v-model="force">
          <option disabled>Вариант сбора звука</option>
          <option selected value="false">Предпочитать субтитры</option>
          <option value="true">Форсировать Whisper AI</option>
        </select>
        <button class="app-button" @click="createPost">Создать статью по видео</button>
      </div>
      <div class="app-slider">
        <input type="range" min="2" max="15" class="app-range" step="1" v-model="numberOfParagraphs" />
        <div class="w-full flex justify-between text-xs">
          <span v-for="i in 14">{{ i + 1 }}</span>
        </div>
      </div>
      <div class="loader mt-12 h-96 w-full grid place-content-center bg-gray-200 border-2 border-primary/20 rounded-3xl"
        v-if="isPending">
        <span class="loading loading-bars loading-lg"></span>
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
              <p class="text-xl mt-4" v-html="topic.paragraphs.replaceAll('\n', '<br>')"></p>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
                <img v-for="image in topic.images" :src="'data:image/png;base64,' + image" class="object-cover mt-4" style="width: 500px;">
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
    @apply join w-full mt-2;
  }
  .splash .app-container {
    @apply mt-4;
  }

  .app-input {
    @apply input input-bordered input-primary w-full focus:outline-0 join-item rounded-r-none;
  }
  .splash .app-input {
    @apply input-lg;
  }

  .app-button {
    @apply btn btn-primary join-item focus:outline-0 rounded-l-none;
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


  .app-slider {
    @apply mt-2;
  }

  .splash .app-slider {
    @apply mt-4;
  }

  .app-range {
    @apply range range-xs;
  }

  .splash .app-range {
    @apply range-md;
  }
  </style>