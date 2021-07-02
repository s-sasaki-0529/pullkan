import Repository from '@/models/repository'
import { inject, provide, reactive } from 'vue'

export const key = Symbol()

export const provideSetting = () => {
  return provide(key, createSetting())
}

export const useSetting = () => {
  return inject(key) as Store
}

export type Setting = {
  repositories: Repository[]
  showWIP: boolean
  showDraft: boolean
}

export type Store = {
  state: Setting
  save: () => void
  load: () => void
}

export const createSetting = () => {
  const state = reactive<Setting>({
    repositories: [],
    showDraft: false,
    showWIP: false
  })

  const save = () => {
    localStorage.setItem('setting', JSON.stringify(state))
    console.log(localStorage.getItem('setting'))
  }

  const load = () => {
    const rawSetting = localStorage.getItem('setting')
    if (rawSetting) {
      const parsedSetting = JSON.parse(rawSetting) as Setting
      state.repositories = parsedSetting.repositories.map(r => new Repository(r.id, r.ownerId, r.name))
      state.showDraft = !!parsedSetting.showDraft
      state.showWIP = !!parsedSetting.showWIP
    }
  }

  return { state, save, load }
}
