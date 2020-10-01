import { inject, provide, reactive } from 'vue'

export const key = Symbol()

export type Setting = {
  ignoreWipPRs: Boolean
}

export type Store = {
  state: Setting
  save: (setting: Setting) => void
  load: () => void
}

export const createSetting = () => {
  const state = reactive({
    ignoreWipPRs: true
  } as Setting)

  const save = (setting: Setting) => {
    state.ignoreWipPRs = setting.ignoreWipPRs
    localStorage.setItem('setting', JSON.stringify(setting))
  }

  const load = () => {
    const rawSetting = localStorage.getItem('setting')
    if (rawSetting) {
      const parsedSetting = JSON.parse(rawSetting) as Setting
      state.ignoreWipPRs = parsedSetting.ignoreWipPRs
    }
  }

  return { state, save, load }
}

export const provideSetting = () => {
  return provide(key, createSetting())
}

export const useSetting = () => {
  return inject(key) as Store
}
