<template>
  <div class="max-w-3xl mx-auto p-6 pb-20">
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900">Yeni İşletme Kur</h1>
      <p class="text-gray-500 mt-2">İşletme bilgilerini gir.</p>
    </div>

    <form @submit.prevent="submitForm" class="bg-white rounded-2xl shadow-xl border border-gray-100">
      
      <div class="p-8 border-b border-gray-100">
        <div class="flex flex-col md:flex-row gap-6 items-start">
          <div class="w-full md:w-1/3 flex flex-col items-center">
             <div class="relative w-full aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition">
                <div class="text-center p-4">
                  <span class="text-gray-400 text-2xl">+</span>
                  <p class="text-xs text-gray-500 mt-2">Logo Yükle</p>
                </div>
             </div>
          </div>

          <div class="w-full md:w-2/3">
            <label class="block text-sm font-bold text-gray-700 mb-2">İşletme Adı</label>
            <input required
              v-model="companyForm.companyName" 
              placeholder="Örn: Altın Makas"
              type="text" 
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div class="p-8 bg-gray-50/50">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">Şehir</label>
            <select required @change="getDistricts()"
              v-model="companyForm.cityId" 
              class="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:border-blue-500"
            >
            <option value="">Şehir seçiniz</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1">İlçe / Semt</label>
            <select required
              v-model="companyForm.districtId" 
              class="w-full border rounded-lg px-4 py-3 text-base focus:outline-none focus:border-blue-500"
            >
            <option v-if="canSelect"  value="">İlçe Seçiniz</option>
            <option v-for="district in districts" :key="district.id" :value="district.id">
              {{ district.name }}
            </option>
            </select>
          </div>

          <div class="md:col-span-2">
             <label class="block text-sm font-semibold text-gray-700 mb-1">İşletme Telefonu</label>
             <input required
               v-model="companyForm.companyPhone" 
               placeholder="0212 123 4567" 
               type="text" 
               class="w-full border rounded-lg px-4 py-2" 
             />
          </div>
        </div>
      </div>

      <div class="bg-gray-50 px-8 py-6 border-t flex justify-end gap-4">
         <router-link :to="{ name:'myCompanies'}" class="text-gray-600 font-medium py-3">Vazgeç</router-link>
         
         <button type="submit" class="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition">
            Oluştur
         </button>
      </div>

    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();

// Sadece form verilerini tutacak değişkenler (İçi boş)
const companyForm = reactive({
  companyName: '',
  companyPhone: '',
  cityId:'',
  districtId:''
});


const cities = ref([]);
const districts = ref([]);
const canSelect = ref(false);

onMounted(()=>{
  const userData = JSON.parse(localStorage.getItem('userData')) || {}

  axios.get("http://localhost:8080/location/cities",)
  .then((cevap)=>{
      cities.value = cevap.data;
  })
  .catch(error=>{
    console.log(error);
  })
})

const getDistricts = ()=>{
  canSelect.value = true;
  axios.get("http://localhost:8080/location/districts", {
    params:{ id: companyForm.cityId }
  })
  .then(cevap => {
    districts.value = cevap.data;
  })
  .catch(error=>{
    console.log(error);
  })
}

// Fonksiyon iskeleti (İçi boş)
const submitForm = () => {

  const kutuluStorage = JSON.parse(localStorage.getItem('userData')) || {}


  axios.post("http://localhost:8080/myCompanies", {
    ownerId: kutuluStorage.id,
    name: companyForm.companyName,
    phone: companyForm.companyPhone,
    cityId: companyForm.cityId,
    districtId: companyForm.districtId
  })
  .then((cevap)=>{
    kutuluStorage.hasCompany = true;
    localStorage.setItem('userData', JSON.stringify(kutuluStorage));
  })
  .then((gelen)=>{
    alert("İşlem Başarılı, Ana Sayfaya yönlendirileceksiniz.");
    setTimeout( ()=>{ router.push({name:'menu'}) } , 2000);
  })
  .catch(error=>{
    alert("İşlem Başarısız")
  })

};
</script>