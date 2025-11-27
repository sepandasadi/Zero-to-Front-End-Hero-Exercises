// chapter1_exercise_solutions.js

const exerciseSolutions = {
  react: `
import { useState } from "react";

function Greeting({ name }) {
  return <h2>Hello, {name}!</h2>;
}

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}

function App() {
  return (
    <div>
      <Greeting name="Lillian" />
      <Counter />
    </div>
  );
}

export default App;
`,

  angular: `
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <h1>Hello, {{ name }}!</h1>
    <button (click)="increment()">Clicked {{ count }} times</button>
  \`
})
export class AppComponent {
  name = 'Angular';
  count = 0;

  increment() {
    this.count++;
  }
}
`,

  vue: `
<!-- index.html -->
<div id="app">
  <h1>{{ message }}</h1>
  <button @click="increment">Clicked {{ count }} times</button>
</div>

<script>
  const app = Vue.createApp({
    data() {
      return {
        message: "Hello, Vue!",
        count: 0
      };
    },
    methods: {
      increment() {
        this.count++;
      }
    }
  });

  app.mount('#app');
</script>
`
};

console.log("React Solution:");
console.log(exerciseSolutions.react);
console.log("Angular Solution:");
console.log(exerciseSolutions.angular);
console.log("Vue Solution:");
console.log(exerciseSolutions.vue);

export default exerciseSolutions;
