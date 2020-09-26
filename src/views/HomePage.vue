<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Using Vee-Validate</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="router.replace({path:'/login'})">LOGOUT</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <h3>Code Using Vee-Validate</h3>
      <p><ion-button routerLink="/home-page-2">Using Vuelidate</ion-button></p>
      <v-form v-slot="{ values }" @submit="onSubmit" :initialValues="formData">
        <div>
          <ion-item>
            <ion-label>Title</ion-label>
            <v-field name="title" v-slot="{ field }" :rules="isRequired">
              <ion-input v-bind="field" type="text" name="title" />
            </v-field>
          </ion-item>
          <v-error-message as="div" name="title" v-slot="{ message }" class="error">
            <div v-if="message">{{`Error: "Title" ${message}` }}</div>
          </v-error-message>
        </div>

        <div>
          <ion-item>
            <ion-label>Email</ion-label>
            <v-field name="email" v-slot="{ field }" :rules="email">
              <ion-input v-bind="field" type="email" name="email" />
            </v-field>
          </ion-item>
          <v-error-message as="div" name="email" v-slot="{ message }" class="error">
            <div v-if="message">{{`Error: "Email" ${message}` }}</div>
          </v-error-message>
        </div>

        <div>
          <ion-item>
            <ion-label>Body</ion-label>
            <v-field name="body" v-slot="{ field }" :rules="isRequired">
              <ion-textarea v-bind="field" rows="5" name="body" />
            </v-field>
          </ion-item>
          <v-error-message as="div" name="body" v-slot="{ message }" class="error">
            <div v-if="message">{{`Error: "Body" ${message}` }}</div>
          </v-error-message>
        </div>
        <div>
          <ion-item>
            <ion-label>SAVE IT</ion-label>
            <v-field name="save" v-slot="{ field }">
              <ion-toggle v-bind="field" name="save" :checked="field.value"></ion-toggle>
            </v-field>
          </ion-item>
        </div>
        <ion-item>
          <ion-label>Gender</ion-label>
          <v-field name="gender" v-slot="{ field }" :rules="isRequired">
            <ion-select v-bind="field" name="gender">
              <ion-select-option>MALE</ion-select-option>
              <ion-select-option>FEMALE</ion-select-option>
            </ion-select>
          </v-field>
        </ion-item>
        <v-error-message name="gender" />
        <div>
          <ion-button type="submit">SUBMIT</ion-button>
        </div>
        <pre>{{ values }}</pre>
      </v-form>
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
  IonSelect,
  IonSelectOption,
  IonToggle,
} from "@ionic/vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

import * as V from "vee-validate/dist/vee-validate";
import { defineRule } from "vee-validate/dist/vee-validate";
import { email } from "@vee-validate/rules";

type FormDataType = {
  title?: string | null;
  body?: string | null;
  gender?: string | null;
  email?: string | null;
  save?: boolean;
};

export default {
  name: "Home",
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
    VField: V.Field,
    VForm: V.Form,
    VErrorMessage: V.ErrorMessage,
  },
  setup() {
    // set some initial values
    const formData = ref<FormDataType>({
      title: "Aaron",
      body: null,
      gender: "MALE",
      save: false,
    });

    // validator from @vee-validate/rules
    defineRule("email", email);

    // custom validator
    const isRequired = (value: any) => {
      console.log("isRequired", value);
      if (!value) {
        return "is a required field";
      }

      return true;
    };

    // handle the submit of the form, only called
    // if the form is valid
    const onSubmit = (a: FormDataType) => {
      debugger;
      alert("Form has been submitted!");
      console.log(a);
    };

    return {
      router: useRouter(),
      formData,
      onSubmit,

      // validators
      isRequired,
      email,
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