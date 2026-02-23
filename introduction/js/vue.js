const { createApp, ref, reactive } = Vue;
createApp({
  setup() {
    const formData = reactive({
      name: '',
      email: '',
      message: ''
    });

    const selectedSticker = ref(null);

    const stickerAssets = [
      'img/star.png',
      'img/thinking.png',
      'img/surprised.png',
      'img/lol.png',
      'img/in-love.png',
      'img/dizzy.png'
    ];

    const submitForm = () => {
      if (!formData.name) return alert("Please enter your name!");
      console.log("Saving Guestbook Entry:", { ...formData, sticker: selectedSticker.value });
      alert("Thanks for signing! Your sticker is saved.");
    };

    return { formData, selectedSticker, stickerAssets, submitForm };
  }

}).mount('#app');
