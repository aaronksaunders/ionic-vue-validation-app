<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>LOGIN PAGE</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-button @click="router.replace({ path: '/home' })">LOGIN</ion-button>
      <simple-modal
        :is-open="modalInfo.show"
        :initial-data="modalInfo.data"
        @close="onModalClose"
      />
      <ion-button @click="openModal()">Open Modal</ion-button>
      <ion-button @click="openModal2">Open Modal 2</ion-button>

      <pre>{{ modalInfo.data }}</pre>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  modalController,
} from "@ionic/vue";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";
import SimpleModal, { SimpleModalResponse } from "./SimpleModal.vue";
import Modal from "./Modal.vue";

export default defineComponent({
  name: "Login",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    SimpleModal,
  },
  setup() {
    const modalInfo = reactive<{ show: boolean; data: any }>({
      show: false,
      data: null,
    });

    const openModal = () => {
      modalInfo.show = true;
    };

    const openModal2 = async () => {
      const modal = await modalController.create({
        component: Modal,
        cssClass: "my-custom-class",
        componentProps: {
          data: {
            content: "New Content TEST",
          },
          propsData: {
            title: "New title Test",
            title2: "New title Testsds",
          },
        },
      });
      return modal.present();
    };

    const onModalClose = (e: SimpleModalResponse) => {
      modalInfo.show = false;
      if (e.success) {
        modalInfo.data = { ...e.formData };
      } else {
        console.log("user cancelled");
      }
    };

    return {
      router: useRouter(),
      openModal,
      openModal2,
      modalInfo,
      onModalClose,
    };
  },
});
</script>

<style scoped>
</style>