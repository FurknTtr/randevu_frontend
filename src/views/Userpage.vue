<template>
  <nav
    class="bg-white border-b border-gray-200 px-4 py-3 shadow-sm sticky top-0 z-50"
  >
    <div class="container mx-auto flex items-center justify-between">
      <div class="flex items-center gap-8">
        <a
          href="#"
          class="text-2xl font-bold text-blue-600 tracking-tighter hover:opacity-80 transition"
        >
          BerberRandevu
        </a>
      </div>

      <div class="flex items-center gap-4">
        <router-link 
      v-if="userForm.hasCompany" 
      :to="{name:'myCompanies'}"
      class="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      İşletmem
    </router-link>

    <router-link 
      v-else 
      :to="{ name:'myCompanies' }"
      class="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-md transition"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      İşletme Ekle
    </router-link>

        <div class="relative ml-2">
          <div
            @click="toggleDropdown"
            class="flex items-center gap-2 cursor-pointer border-l pl-4 border-gray-200 group select-none"
          >
            <div class="text-right hidden sm:block">
              <p
                class="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition"
              >
                {{ userForm.userName }}
              </p>
              <p class="text-xs text-gray-500">Hesabım</p>
            </div>
            <div
              class="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border border-indigo-200 ring-offset-2 group-hover:ring-2 ring-blue-500 transition"
            >
              {{
                userForm.userName
                  ? userForm.userName.charAt(0).toUpperCase()
                  : "U"
              }}
            </div>
          </div>

          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50 origin-top-right transform transition-all"
          >
            <router-link
              :to="{ name: 'settings' }"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition"
            >
              Hesap Ayarları
            </router-link>
            <router-link
              to="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition"
            >
              Randevularım
            </router-link>
            <div class="border-t border-gray-100 my-1"></div>
            <button
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="container mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800">Popüler Berberler</h2>
      <span class="text-sm text-gray-500" v-if="businesses.length > 0"
        >{{ businesses.length }} işletme mevcut</span
      >
    </div>

    <div
      v-if="businesses.length === 0"
      class="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300"
    >
      <div class="bg-gray-200 p-4 rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900">
        Henüz hiç işletme bulunamadı
      </h3>
      <p class="text-gray-500 text-sm mt-1">Sistemde kayıtlı berber yok.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="business in businesses"
        :key="business.id"
        class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden group cursor-pointer"
      >
        <div
          class="h-48 bg-gray-100 w-full flex items-center justify-center text-gray-400 group-hover:bg-gray-200 transition relative"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div
            class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm flex items-center gap-1 text-xs font-bold text-gray-800"
          >
            <span class="text-yellow-500">★</span>
            <span>4.8</span>
          </div>
        </div>

        <div class="p-5">
          <h3
            class="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition"
          >
            {{ business.name }}
          </h3>
          <p class="text-sm text-gray-500 mb-4 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {{ business.district }} / {{ business.city }}
          </p>
          <button
            class="w-full bg-gray-50 text-blue-600 border border-blue-100 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition"
          >
            Randevu Al
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const userForm = ref({
  hasCompany: false,
  userName: "",
  location: {
    //burası da şimdilik boş kalacak da user'ın işi iyice büyüyor
    city: "",
    district: "",
  },
});

onMounted(() => {
  axios.get('http://localhost:8080/member/me', {
    headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
  })
  .then((response)=>{
    userForm.value.hasCompany = response.data.hasCompany;
    userForm.value.userName = response.data.userName;

    /*
    id;
    userName;
    email;
    phone;
    isActive;
    hasCompany;
    */
    localStorage.setItem("userData", JSON.stringify(response.data));
  })
});

// --- DROPDOWN İÇİN YENİ DEĞİŞKEN ---
const isDropdownOpen = ref(false);

// Dropdown aç/kapa fonksiyonu
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Çıkış yapma (Basitçe login'e atar şimdilik)
const handleLogout = () => {
  // Burada ileride token silme vs. yapılacak

  router.push({ name: "login" });
};

// --- İŞLETME LİSTESİ ---
const businesses = ref([
  { id: 1, name: "Makas Altın Eller", city: "İstanbul", district: "Kadıköy" },
  { id: 2, name: "Berberim Ahmet", city: "Ankara", district: "Çankaya" },
  { id: 3, name: "Stil Erkek Kuaförü", city: "İzmir", district: "Karşıyaka" },
  { id: 4, name: "Cool Cuts", city: "İstanbul", district: "Beşiktaş" },
]);
</script>
