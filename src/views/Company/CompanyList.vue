<template>
  <div class="min-h-screen bg-gray-50 pb-10">

    <nav class="bg-white border-b shadow-sm sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <router-link :to="{ name:'menu'}" class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition group">
           <span class="font-medium">Ana Sayfa</span>
        </router-link>
        <h1 class="text-xl font-bold text-gray-800 hidden md:block">İşletme Yönetimi</h1>
        <div class="w-8"></div> 
      </div>
    </nav>

    <div class="max-w-4xl mx-auto px-4 mt-8">
      
      <div class="flex items-center justify-between mb-6">
        <div>
           <h2 class="text-2xl font-bold text-gray-900">İşletmelerim</h2>
           <p class="text-sm text-gray-500">Mevcut şubelerini buradan yönetebilirsin.</p>
        </div>
        
        <router-link :to="{ name: 'createCompany' }" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition">
          Yeni Ekle
        </router-link>
      </div>

      <div class="space-y-4">
        
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition group">
          <div class="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div class="flex items-center gap-4">
              <div class="h-14 w-14 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-xl font-bold">
                A
              </div>
              <div>
                <h3 class="text-lg font-bold text-gray-900">Örnek İşletme Adı</h3>
                <p class="text-sm text-gray-500">Örnek Şehir / İlçe</p>
              </div>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto">
              <button class="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition">
                Önizleme
              </button>
              <button class="px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                Düzenle
              </button>
              <button class="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                Yönet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

// Verileri tutacak boş dizi
const companies = ref([]);




// Sayfa yüklendiğinde çalışacak boş iskelet
onMounted(() => {

  axios.get('http://localhost:8080/myCompanies', )
  //get istegi atacak burası

});
</script>