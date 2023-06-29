import generateStore from '@/plugins/valtio-persister';

interface formStoreType {
  dropCardList: any[]
}




const formStore = generateStore<formStoreType>({
  key: "formStore",
  state: {
    dropCardList: []
  },
  actions: {
    setDropCardList: (data, state) => {
      state.dropCardList = data;
    },
  },
  persist: [
    {
      paths: ['dropCardList']
    }
  ]
});


export default formStore