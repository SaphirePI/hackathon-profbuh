<script setup lang="ts">

</script>

<template>
  <header class="container mx-auto py-10 flex justify-between">
    <div class="logo text-4xl font-black">Видео в текст</div>
    <nav>
      <ul class="flex gap-x-3">
        <li>
          <button class="btn btn-primary">FAQ</button>
        </li>
        <li>
          <button class="btn btn-primary">Войти</button>
        </li>
      </ul>
    </nav>
  </header>
  <slot />
</template>

<style scoped>
</style>