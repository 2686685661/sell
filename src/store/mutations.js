export const mutations = {
  changeLoanIconStatu(state, param){
      state.loanIcons[param.name] = param.val;
  },
   uploadCreditStatu(state, param){
      console.log('this is mutations');
       state.creditStatus[param.name] = param.val;
   },
   uploadCreditData(state, param){
       console.log('this is mutations');
      state.creditDatas[param.name] = param.val;
   },
    uploadApplys(state, param){
       state[param.name] = param.val;
    }
}
