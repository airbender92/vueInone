import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  interface State {
    count: number
  }

  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

declare module 'vuex-class-component';