<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-title>Using Vuelidate</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="router.replace({ path: '/login' })"
            >LOGOUT</ion-button
          >
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <h3>Code Using Vuelidate</h3>
      <form @submit.prevent="onSubmit" novalidate>
        <div>
          <ion-item>
            <ion-label>Title</ion-label>
            <ion-input type="text" name="title" v-model="vv.title.$model" />
          </ion-item>
          <p>{{ vv?.title?.$errors[0]?.$message }}</p>
        </div>

        <div>
          <ion-item>
            <ion-label>Email</ion-label>
            <ion-input
              type="email"
              name="emailAddress"
              v-model="vv.emailAddress.$model"
            />
          </ion-item>
          <p>{{ vv?.emailAddress?.$errors[0]?.$message }}</p>
        </div>

        <div>
          <ion-item>
            <ion-label>Body</ion-label>
            <ion-textarea rows="5" name="body" v-model="vv.body.$model" />
          </ion-item>
          <p>{{ vv?.body?.$errors[0]?.$message }}</p>
        </div>
        <div>
          <ion-item>
            <ion-label>SAVE IT</ion-label>
            <ion-toggle name="save" v-model="vv.save.$model"> </ion-toggle>
          </ion-item>
        </div>
        <ion-item>
          <ion-label>Gender</ion-label>
          <ion-select name="gender" v-model="vv.gender.$model">
            <ion-select-option>MALE</ion-select-option>
            <ion-select-option>FEMALE</ion-select-option>
          </ion-select>
        </ion-item>
        <div>
          <ion-button v-if="!vv.$invalid" type="submit">SUBMIT</ion-button>
          <ion-button v-if="vv.$invalid" type="submit" disabled
            >SUBMIT</ion-button
          >
        </div>
      </form>
      <pre>{{ vv }}</pre>
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
  IonItem,
  IonLabel,
  IonTextarea,
  IonInput,
  IonButtons,
  IonButton,
  IonBackButton,
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/vue";
import { reactive, toRef } from "vue";
import { useRouter } from "vue-router";

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

export default {
  name: "HomePage2",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonTextarea,
    IonInput,
    IonButtons,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonBackButton,
  },
  setup() {
    // set some initial values
    const fform = reactive({
      title: "",
      body: "",
      emailAddress: "",
      gender: "MALE",
      save: true,
    });

    const rules = {
      title: { required },
      body: { required },
      emailAddress: { required, email },
      gender: {},
      save: {},
    };
    const vv = useVuelidate(rules, {
      title: toRef(fform, "title"),
      body: toRef(fform, "body"),
      emailAddress: toRef(fform, "emailAddress"),
      gender: toRef(fform, "gender"),
      save: toRef(fform, "save"),
    });

    // handle the submit of the form, only called
    // if the form is valid
    const onSubmit = () => {
      vv.value.$touch();

      if (vv.value.$invalid) return;

      console.log(vv);
      alert("Form has been submitted! " + JSON.stringify(fform, null, 2));
      console.log(fform);
    };

    return {
      router: useRouter(),
      onSubmit,
      vv,
    };
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-size: smaller;
  font-style: italic;
  font-weight: 500;
  margin-top: 4px;
}

ion-item {
  --padding-start: 0px;
}
</style>