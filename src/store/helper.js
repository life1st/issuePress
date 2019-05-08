export const loginUserIsAdmin = (state) => (!!state.user.admin.id && state.user.admin.id === state.user.login.id)

/**
 * 
 * @param {object} originLabels 
 * @param {array} needMergeLabels 
 * 
 * @returns {object}
 */
export const mergeLabels = (originLabels, needMergeLabels) => {
  const labels = {...originLabels}
  needMergeLabels.forEach(label => {
    if (!labels[label.id]) {
      labels[label.id] = label
    }
  })

  return labels
}