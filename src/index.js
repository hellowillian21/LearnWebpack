import './index.scss'
import '@/test-alias.js'

class Animal {
  constructor(name) {
    this.name = name
  }

  getName() {
    return this.name
  }
}

const dog = new Animal('dog')
console.log(dog.getName())



const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('promise')
  }, 1000)
})

promise.then((res) => {
  console.log(res)
})

// 按需加载: import() 语法，需要 @babel/plugin-syntax-dynamic-import 的插件支持
// 但是因为当前 @babel/preset-env 预设中已经包含了 @babel/plugin-syntax-dynamic-import
document.getElementById('btn').onclick = function () {
  import('./handle').then(({ res }) => {
    console.log(res)
  })
}

if (module && module.hot) {
  module.hot.accept()
}
