import Card from './Card';
import { useState } from 'react';
import QuickNote from './QuickNote';
const projects = [
  { title: "Proiect 1", description: "Pagina personala" },
  { title: "Proiect 2", description: "Calculator buget" },
  { title: "Proiect 3", description: "Dashboard React" },
];

function App() {
  const [count, setCount] = useState(0);
  return (

    <div>
      <h1>Dashboard</h1>
      {projects.map(function (item, index) {
        return <Card key={index} title={item.title} description={item.description} />;
      }
      )}
      <br></br>
       <p>Contor: {count}</p>
       <button style={{ margin: '5px' }} onClick={() => setCount(count + 1)}>+1</button>
       <button style={{ margin: '5px' }} onClick={() => setCount(count - 1)}>-1</button>
       <button style={{ margin: '5px' }} onClick={() => setCount(0)}>Reset</button>

       <QuickNote />
    </div>
  );
}
export default App;