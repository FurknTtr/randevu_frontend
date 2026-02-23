<template>
  <div class="min-h-screen bg-gray-50">
    
    <nav class="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div class="container mx-auto flex items-center gap-2">
        
        <div 
          @click="goBackToMenu" 
          class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition font-medium text-sm cursor-pointer select-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
          </svg>
          Ana Sayfaya Dön
        </div>

      </div>
    </nav>

    <div class="container mx-auto px-4 py-8 max-w-4xl">
      
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Hesap Ayarları</h1>
        <p class="text-gray-500 mt-1">Kişisel bilgilerinizi ve güvenlik ayarlarınızı buradan yönetebilirsiniz.</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
           <div class="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl font-bold">
              {{ userForm.userName ? userForm.userName.charAt(0).toUpperCase() : 'U' }}
           </div>
           <div>
             <h2 class="text-lg font-bold text-gray-800">Profil Bilgileri</h2>
             <p class="text-sm text-gray-500">Hesap bilgilerinizi güncelleyin.</p>
           </div>
        </div>

        <form @submit.prevent="updateProfile" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Kullanıcı Adı</label>
                  <input 
                    v-model="userForm.userName" 
                    type="text" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">E-Posta Adresi</label>
                  <input 
                    v-model="userForm.email" 
                    type="email" 
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Telefon Numarası</label>
                  <input 
                    v-model="userForm.phone" 
                    type="tel" 
                    placeholder="05XX XXX XX XX"
                    class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  >
                </div>
            </div>

            <div class="flex justify-end">
              <button type="submit" class="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">
                Değişiklikleri Kaydet
              </button>
            </div>
        </form>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
         <h2 class="text-lg font-bold text-gray-800 mb-1">Şifre Değiştir</h2>
         <p class="text-sm text-gray-500 mb-6">Hesap güvenliğiniz için güçlü bir şifre kullanın.</p>

         <form @submit.prevent="updatePassword" class="space-y-4 max-w-lg">
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Mevcut Şifre</label>
              <input 
                v-model="passwordData.current" 
                type="password" 
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder="••••••••"
              >
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre</label>
                <input 
                  v-model="passwordData.new" 
                  type="password" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="••••••••"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Yeni Şifre (Tekrar)</label>
                <input 
                  v-model="passwordData.confirm" 
                  type="password" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  placeholder="••••••••"
                >
              </div>
            </div>

            <div class="pt-2">
              <button type="submit" class="bg-gray-800 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-gray-900 transition shadow-sm">
                Şifreyi Güncelle
              </button>
            </div>

         </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userForm = ref({
  userName: '',
  email: '',
  phone: ''
});

const passwordData = ref({
  current: '',
  new: '',
  confirm: ''
});


onMounted(() =>{
  const userDataPackage = localStorage.getItem('userData');
  if(userDataPackage){
    const userData = JSON.parse(userDataPackage);
    userForm.value.userName = userData.userName;
    userForm.value.email = userData.email;
    userForm.value.phone = userData.phone;
  }
})

const updateProfile = () => {
  axios.put(`http://localhost:8080/member/update`,
    {
      userName: userForm.value.userName,
      email: userForm.value.email,
      phone: userForm.value.phone
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
   )
   .then((response)=>{
    console.log("Profiliniz şu şekilde güncellendi:", userForm.value);
    
    const oldStorage = JSON.parse(localStorage.getItem('userData')) || {};
    const newStorage = { 
        ...oldStorage, 
        userName: userForm.value.userName, 
        email: userForm.value.email, 
        phone: userForm.value.phone, 
    };
    localStorage.setItem('userData', JSON.stringify(newStorage));

   })
   .catch((error)=>{
    console.log("güncelleme işleminde hata oluştu! daha sonra tekrar deneyiniz.")
   })
};


const updatePassword = () => {
  if (passwordData.value.new !== passwordData.value.confirm) {
    alert("Yeni şifreler uyuşmuyor!");
    return;
  }

  axios.put(`http://localhost:8080/member/password`,
    {
      oldPassword: passwordData.value.current,
      newPassword: passwordData.value.new
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  )
  .then(response=>{
    console.log("Şifreniz başarıyla güncellendi.")
  })
  .catch(error=>{
    console.log("Hata oluştu!")
  })
  
  passwordData.value = { current: '', new: '', confirm: '' };
};

const goBackToMenu = () => {
    router.push({name: 'menu'});
};

</script>