
<template>
  <ion-modal :is-open="isOpen" @onDidDismiss="modalClose(false)">
    <ion-page>
      <ion-header>
        <ion-toolbar>
          <ion-title>Note Modal</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item>
          <ion-label>Title</ion-label>
          <ion-input v-model="formInfo.title"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Body</ion-label>
          <ion-textarea v-model="formInfo.body" rows="5"></ion-textarea>
        </ion-item>
        <ion-button @click="modalClose(true)">SAVE DATA</ion-button>
        <ion-button @click="modalClose(false)" color="danger"
          >CANCEL</ion-button
        >
      </ion-content>
    </ion-page>
  </ion-modal>
</template>


<script lang="ts">
import {
  IonModal,
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonTextarea,
  IonInput,
  IonButton,
} from "@ionic/vue";
import { defineComponent, ref, SetupContext, watch } from "vue";

export type SimpleForm = {
  title?: string;
  body?: string;
};
export type SimpleModalResponse = {
  success: boolean;
  formData: SimpleForm | null;
};

const SimpleModal = defineComponent({
  name: "SimpleModal",
  props: {
    isOpen: {
      default: false,
      required: true,
    },
    initialData: {
      default: null,
      required: true,
    },
  },
  components: {
    IonModal,
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonTextarea,
    IonInput,
    IonButton,
  },
  setup(props: any, ctx: SetupContext) {
    const formInfo = ref<SimpleForm>({
      title: "",
      body: "",
    });

    // if form is open, get the input properties
    // to update form with values
    watch(
      () => props.isOpen,
      (newVal: any) => {
        if (newVal) {
          formInfo.value.title = props.initialData?.title;
          formInfo.value.body = props.initialData?.body;
        }
      }
    );

    /**
     *
     */
    const modalClose = (saveFormData: boolean) => {

      // handle @onDidDismiss
      // this is here because if you close dialog by NOT
      // clicking the cancel, still have logic to execute -
      if ( !props.isOpen ) return;

      const formResponse: SimpleModalResponse = {
        success: saveFormData,
        formData: saveFormData ? { ...formInfo.value } : props.initialData,
      };
      // clear form
      formInfo.value = { title: "", body: "" };

      // emit event with response
      ctx.emit("close", formResponse);
    };

    return {
      formInfo,
      modalClose,
    };
  },
});
export default SimpleModal;
</script>
<style></style>
