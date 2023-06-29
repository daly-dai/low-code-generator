/**
 * 生成一个用不重复的ID
 */
export function genNonDuplicateID(randomLength = 8) {
  return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36)
}