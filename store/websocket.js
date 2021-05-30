export const state = () => ({
    count: 0,
})

export const getters = {
    count: state => {
        return state.count
    }
}

export const actions = {
    updateCount({commit, state}, date) {
        commit('updateCount', date)
    }
}

export const mutations = {
    updateCount(state, count) {
        state.count = count
    }
}