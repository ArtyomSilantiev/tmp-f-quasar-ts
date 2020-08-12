<template>
  <q-page class="q-pa-md q-gutter-md">
    <std-breadcrumbs-component :x-breadcrumbs="[
      { name: 'Главная', to: { path: '/' } },
      { name: 'Базовая страница!' }
    ]" />

    <q-card>
      <q-card-section>
        {{ upperName }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, PropOptions, PropType, SetupContext, onMounted, watch } from '@vue/composition-api';
import StdBreadcrumbsComponent from "@/components/StdBreadcrumbsComponent.vue";

// Лучшии практики тут! (Best practices is this!)
// export interface Props extends PropOptions {}
export interface Props extends PropOptions {
  argName: string;
}

export default defineComponent({
  name: 'BasePage',

  components: {
    StdBreadcrumbsComponent
  },

  props: {
    argName: {
      type: String as PropType<string>,
      default: 'Base Page!',
      required: false
    }
  },

  meta () {
    return {
      title: 'Базовая страница!'
    };
  },

  setup (props: Props, ctx: SetupContext) {
    const base = useBase(props, ctx);
    const upperName = useUpperCaseName(base);
    return {
      ...base,
      ...upperName
    };
  }
})

function useBase (props: Props, ctx: SetupContext) {
  const name = ref('');
  onMounted(() => {
    name.value = props.argName;
  });
  return { name };
}

function useUpperCaseName (base: ReturnType<typeof useBase>) {
  const upperName = ref('');
  watch(() => base.name.value, () => {
    upperName.value = base.name.value.toUpperCase();
    console.log(upperName.value);
  });
  return { upperName };
}
</script>
