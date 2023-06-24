<script setup>
  const isWorking = ref(false);

  const numberOfParagraphs = ref(5);
  const videoURL = ref(null);
  const postLanguage = ref('ru');

  const createPost = async (url) => {
    const { data, pending, error, refresh } = await useFetch('http://localhost:8000/article/',{
      method: 'POST',
      server: true,
      mode: 'no-cors',
      body: {
        number_of_paragraphs: numberOfParagraphs.value,
        url: videoURL.value,
        lang: postLanguage.value
      }
    })

    console.log(data)
    isWorking.value = true;
  }
</script>

<template>
  <div class="container mx-auto">
    <div :class="{'splash': !isWorking}">
      <h4 class="app-title">{{data?.title || 'Вставьте ссылку на ваше видео'}}</h4>
      <div class="app-container">
        <input type="text" placeholder="https://www.youtube.com/watch?v=CJ1piq6a4HU" class="app-input" v-model="videoURL" />
        <select class="app-select" v-model="postLanguage">
          <option disabled>Язык</option>
          <option selected value="ru">Русский</option>
          <option value="en">Английский</option>
        </select>
        <button class="app-button" @click="createPost">Создать статью по видео</button>
      </div>
      <div class="app-slider">
        <input type="range" min="2" max="15" class="app-range" step="1" v-model="numberOfParagraphs" />
        <div class="w-full flex justify-between text-xs">
          <span v-for="i in 14">{{i+1}}</span>
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