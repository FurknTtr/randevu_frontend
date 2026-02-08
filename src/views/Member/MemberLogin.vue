
<template>
  <div class="min-h-screen w-full flex bg-white">
    
    <div class="hidden lg:block w-1/2 relative">
      <img 
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" 
        alt="Login Visual" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/20"></div>
      
      <div class="absolute bottom-10 left-10 text-white z-10">
        <h2 class="text-4xl font-bold mb-2">Randevu Sistemi</h2>
        <p class="text-lg text-gray-200">Berberinize ulaşmanın en şık yolu.</p>
      </div>
    </div>

    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
      <div class="w-full max-w-md space-y-8">
        
        <div class="text-center lg:text-left">
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Hoş Geldiniz</h1>
          <p class="mt-2 text-gray-500">Hesabınıza giriş yapın ve randevunuzu alın.</p>
        </div>

        <form @submit.prevent="handleLogin" class="mt-8 space-y-6">
          
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email Adresi</label>
              <input 
                v-model="loginForm.email"
                id="email" 
                name="email" 
                type="email" 
                required 
                class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                placeholder="ornek@mail.com"
              > <!-- id etiketi html için(yönlendirme yapıyor for'a), name etiketi tarayıcı(chrome, opera...) için, type butonun tipi için butonun davranışını ayarlar etiketin behaviour u-->
            </div>

            <div>
              <div class="flex items-center justify-between">
                <label for="password" class="block text-sm font-medium text-gray-700">Şifre</label>
                <a href="#" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Şifremi unuttum?</a>
              </div>
              <input 
                v-model="loginForm.password"
                id="password" 
                name="password" 
                type="password" 
                required 
                class="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition"
                placeholder="••••••••"
              >
            </div>
          </div>

          <button 
            type="submit" 
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Giriş Yap
          </button>
        </form>


          <div class="text-center mt-4">
            <p class="text-sm text-gray-600"> 
              Hesabınız yok mu? 
              <router-link class="font-medium text-indigo-600 hover:text-indigo-500" :to="{ name: 'register'}">Hemen kayıt olun</router-link >
            </p>
          </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const loginForm = ref({
  email: '',
  password: ''
})

const handleLogin = () => {

  axios.post('http://localhost:8080/member/login', 
    {
      email: loginForm.value.email,
      password: loginForm.value.password
    }
  )
  .then((cevap) => {
    localStorage.setItem('userData', JSON.stringify(cevap.data));
    router.push({name: 'menu'});
  })
  .catch((hata)=>{
    console.log("Hatali Giriş");
  })
}

</script>