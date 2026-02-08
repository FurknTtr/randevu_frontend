<template>
  <div class="min-h-screen w-full flex bg-white">
    <div class="hidden lg:block w-1/2 relative">
      <img 
        src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop" 
        alt="Register Visual" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/30"></div>
      
      <div class="absolute bottom-10 left-10 text-white z-10">
        <h2 class="text-4xl font-bold mb-2">Aramıza Katılın</h2>
        <p class="text-lg text-gray-200">En iyi berberlerden sıra beklemeden randevu alın.</p>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 overflow-y-auto">
      <div class="w-full max-w-md space-y-8">
        
        <div class="text-center lg:text-left">
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Hesap Oluştur</h1>
          <p class="mt-2 text-gray-500">Kişisel bilgilerinizi girerek kayıt işlemini tamamlayın.</p>
        </div>

        <form @submit.prevent="handleRegister" class="mt-8 space-y-5">
          
          <div class="grid grid-cols-1 gap-5">
            <div>
              <label class="block text-sm font-medium text-gray-700">Kullanıcı Adı</label>
              <input 
                v-model="registerForm.userName"
                type="text" 
                required 
                class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition"
                placeholder="johndoe"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">E-Posta</label>
              <input 
                v-model="registerForm.email"
                type="email" 
                required 
                class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition"
                placeholder="ornek@mail.com"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Telefon Numarası</label>
              <input 
                v-model="registerForm.phone"
                type="tel" 
                required 
                class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition"
                placeholder="05XX XXX XX XX"
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Şifre</label>
                <input 
                  v-model="registerForm.password"
                  type="password" 
                  required 
                  class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition"
                  placeholder="••••••••"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Şifre Tekrar</label>
                <input 
                  v-model="registerForm.confirmPassword"
                  type="password" 
                  required 
                  class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none transition"
                  placeholder="••••••••"
                >
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Kayıt Ol
          </button>
        </form>

        <div class="text-center mt-4">
            <p class="text-sm text-gray-600">
              Zaten hesabınız var mı? 
              <router-link :to="{ name: 'login' }" class="font-medium text-blue-600 hover:text-blue-500">Giriş Yap</router-link>
            </p>
          </div>

      </div>
    </div>
  </div>

<div v-if="showSuccessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
  
  <div class="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center transform transition-all scale-100">
    
    <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
      <svg class="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
    </div>

    <h3 class="text-lg leading-6 font-medium text-gray-900">Kayıt İşlemi Başarılı!</h3>
    <div class="mt-2">
      <p class="text-sm text-gray-500">
        Şimdi giriş yapabilirsiniz.
      </p>
    </div>

    <div class="mt-6">
      <button 
        @click="goToLogin"
        type="button" 
        class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
      >
        Giriş Yap
      </button>
    </div>

    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

//Pencerenin görünme koşulu
const showSuccessModal = ref(false);

const registerForm = ref({
  userName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
});


const goToLogin = () => {
  showSuccessModal.value = false;
  router.push({ name: 'login' }); 
};

const handleRegister = () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert("Şifreler uyuşmuyor!");
    return;
  }else{
    axios.post('http://localhost:8080/member/register', 
      {
        userName: registerForm.value.userName,
        email: registerForm.value.email,
        phone: registerForm.value.phone,
        password: registerForm.value.password,
      }
    )
    .then(cevap=>{
      //buraya ise verification koyacagım vakit ekleme yapıcam
        showSuccessModal.value = true;
    })
    .catch(hata=>{
        console.log("Hata Kodu: ", hata.code)
    })
    .finally(()=>{
      //satırı şimdilik koydum başarılı ekranını görebilmek için.
        showSuccessModal.value = true;
    })
    
  }
  
};
</script>